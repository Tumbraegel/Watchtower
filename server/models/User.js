const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password: {type: String, required: true},
    reviews: Array,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
}, {timestamps: true});

// export model user with UserSchema
module.exports = mongoose.model("User", UserSchema);
