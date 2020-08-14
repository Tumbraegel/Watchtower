const User = require('../models/User');

class UserRepository {
    constructor(model) {
        this.model = model;
    }
    
    create(userInfo) {
        const newUser = { 
            username: userInfo.username, 
            email: userInfo.email,
            password: userInfo.password };

        const user = new this.model(newUser);
    
        return user.save();
    }

    findById(id) {
        return this.model.findById(id);
    }

    findByUsername(username) {
        return this.model.findOne({username: username});
    }

    findUser(userInfo) {
        return this.model.findOne({email: userInfo.email});
    }
}

module.exports = new UserRepository(User);