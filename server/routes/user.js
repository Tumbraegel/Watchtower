// Tutorial: https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i
// https://express-validator.github.io/docs/index.html

const express = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const userRepo = require('../repositories/UserRepository')
const criterionRepo = require('../repositories/CriterionRepository')
const auth = require('../config/auth_config')

// POST new user
router.post('/register', [check('username', 'enter valid username').not().isEmpty(), 
    check('email', 'enter valid email').isEmail(), 
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
                    msg: 'User already exists.'
                })
            }
            
            user = { username, email, password }

            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
            user.role = 'user'

            await userRepo.create(user)

            const payload = {
                user: { id: user.id }
            }
            console.log(payload)

            jwt.sign(payload, 'randomString', { expiresIn: 10000 }, (err, token) => {
                if (err) throw err
                res.status(200).json({ token })
            }
            )
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Error in saving.')
        }
    }
)

// POST user login
router.post(
    '/login',[check('email', 'enter valid email').isEmail(), 
    check('password', 'enter valid password').isLength({ min: 8})],
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
            message: 'Incorrect password!'
          })
  
        const payload = {
          user: {
            id: user.id
          }
        }
  
        jwt.sign(
          payload,
          'randomString',
          { expiresIn: '6h' },
          (err, token) => {
            if (err) throw err
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
  
// GET user - require authentication
router.get('/me', auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
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
  } catch (e) {
    res.send({ message: 'Error in fetching user' })
  }
})

router.post('/add-criterion', auth, async (req, res) => {
  const user = await userRepo.findById(req.user.id)
  if(user.role == 'admin') {
      criterionRepo.addCriterion(req.body).then(criterion => {
        res.json(criterion)
    }).catch((error) => console.log(error))
  }
  else { 
    res.status(401).json({
      message: 'Action not allowed, missing authentication!'
    })}
})

router.post('/add-admin', auth, async (req, res) => {
  await userRepo.addAdminUser(req.body.username).then(response => {
    res.json(response)
  }).catch(error => console.log(error))
})

router.delete("/delete-user/:email", async (req, res) => {
  const email = req.params.email
  userRepo.deleteUser(email).then(() => {
      console.log('User was deleted successfully.')
      res.json(req.body)
    }).catch((error) => {
      console.log(error.message)
      res.status(500).send("Error in deleting user.")
    })
})

module.exports = router