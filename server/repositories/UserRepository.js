const User = require('../models/User');

class UserRepository {
    constructor(model) {
        this.model = model;
    }
    
    create(userInfo) {
        const newUser = { 
            username: userInfo.username, 
            email: userInfo.email,
            hash: userInfo.hash };

        const user = new this.model(newUser);
    
        return user.save();
    }

    findUser(userInfo) {
        return this.model.findOne({email: userInfo.email});
    }
}

module.exports = new UserRepository(User);