const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {type: String, unique: true, required: [true, "can't be blank"], match: [/^[A-Za-z0-9_.-]*$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password: {type: String, required: true},
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
}, {timestamps: true});

// export model user with UserSchema
module.exports = mongoose.model("User", UserSchema);
