// Tutorial: https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i
// https://express-validator.github.io/docs/index.html

const express = require('express')
const router = express.Router()
const auth = require('../config/auth_config')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userRepo = require('../repositories/UserRepository')
const criterionRepo = require('../repositories/CriterionRepository')
const filmAPI = require('../imdb_data/film_api')

// create new user
router.post('/register', [check('username', 'Please enter a valid username.').not().isEmpty(), 
    check('email', 'Please enter a valid email.').isEmail(), 
    check('password', 'enter valid password').isLength({ min: 8 })],

    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const { username, email, password } = req.body

        try {
            let user = await userRepo.findByEmail(email)
            if (user) {
                return res.status(400).json({
                    message: 'User already exists.'
                })
            }
            user = { username, email, password }

            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
            user.role = 'user'

            await userRepo.create(user)
            res.status(200).json({ message: 'Registration successful' })

      } catch (error) {
     console.log(error.message)
            res.status(500).send('Error in saving.')
      }
})

// login user
router.post(
    '/login',[check('email', 'Please enter a valid email.').isEmail(), 
    check('password', 'Please enter a valid password.').isLength({ min: 8})],
    async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        })
      }
      
      const { email, password } = req.body

      try {
        let user = await userRepo.findByEmail(email)
        if (!user)
          return res.status(400).json({
            message: 'User does not exist.'
          })
  
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
          return res.status(400).json({
            message: 'The email or password was incorrect!'
          })
  
        const payload = {
          user: {
            id: user.id
          }
        }
  
        jwt.sign(
          payload,
          'secretKey',
          { expiresIn: '6h' },
          (error, token) => {
            if (error) throw error
            res.status(200).json({
              token: token,
              role: user.role,
              username: user.username,
              id: user._id,
              email: user.email
            })
          }
        )
      } catch (e) {
        console.error(e)
        res.status(500).json({
          message: 'Server Error'
        })
      }
    }
  )
  
// retrieve user information for profile page - require authentication
router.get('/me', auth, async (req, res) => {
  try {
    const user = await userRepo.findById(req.user.id).populate(
      {
        path: 'reviews',
        populate: {
          path: 'film',
          model: 'Film'
        }
      }
    )
    res.json(user)
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Error in fetching user.')
  }
})

// remove user from database
router.delete("/delete-user/:email", async (req, res) => {
  const email = req.params.email
  userRepo.deleteUser(email).then(() => {
      console.log('User was deleted successfully.')
      res.json(req.body)
    }).catch(error => {
      console.log(error.message)
      res.status(500).send('Error in deleting user.')
    })
})

// assign admin rights OR add review criterion OR add new film entry
// - require authentication and admin status
router.post('/admin/data', auth, async (req, res) => {
  userRepo.checkAdminStatus(req.user.id).then(async () => {
    try {
      if(req.body.hasOwnProperty('username')) {
        userRepo.addAdminUser(req.body.username).then(() => {
          res.send('This user is now an admin user.')
        })
      }
      if (req.body.hasOwnProperty('criterion')) {
        await criterionRepo.addCriterion(req.body).then(() => {
          res.send('The new review criterion has been added.')
        })
      } else {
          filmAPI.requestFilmDataFor(req.body.imdbID).then(() => {
            res.send('The new film has been added.')
          })
        }
      } catch(error ) {
      console.log(error)
      res.status(401).send('Action not allowed, missing authentication!')
    }   
  })
})

module.exports = router