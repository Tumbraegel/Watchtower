const User = require('../models/User')

class UserRepository {
  constructor(model) {
    this.model = model
  }

  findAll() {
    return this.model.find()
  }

  findById(id) {
    return this.model.findById(id)
  }

  create(newUser) {
    const user = new this.model(newUser)
    return user.save()
  }

  findByUsername(username) {
    return this.model.findOne({ username: username })
  }

  findByEmail(email) {
    return this.model.findOne({ email: email })
  }

  async checkAdminStatus(id) {
    const user = await this.model.findById(id)
    if(user.role == 'admin') return true
    else return false
  }

  async addAdminUser(username) {
    try {
      await this.findByUsername(username).then(user => {
        user.role = 'admin'
        user.save()
        return Promise.resolve(user.data)
      })
    }
    catch (error ){
      console.log("Error in adding admin user.")
      return Promise.reject(error)
    }
  }

  deleteUser(email) {
    return this.model.deleteOne({ email: email })
  }
}

module.exports = new UserRepository(User)
