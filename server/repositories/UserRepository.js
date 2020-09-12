const User = require('../models/User')

class UserRepository {
    constructor(model) {
        this.model = model
    }
    
    create(newUser) {
        const user = new this.model(newUser)
        return user.save()
    }

    findByEmail(email) {
        return this.model.findOne({email: email})
    }

    deleteUser(email) {
        return this.model.deleteOne({email: email})
    }
}

module.exports = new UserRepository(User)