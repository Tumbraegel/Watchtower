const User = require('../models/User')

class UserRepository {
  constructor(model) {
    this.model = model
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

  async addAdminUser(user) {
    const existingUser = await this.findByUsername(user)
    if(existingUser != null) {
        existingUser.role = 'admin'
        existingUser.save()
    }
    return existingUser
  }

  deleteUser(email) {
    return this.model.deleteOne({ email: email })
  }
}

module.exports = new UserRepository(User)
