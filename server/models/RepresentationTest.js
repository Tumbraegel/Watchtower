const mongoose = require('mongoose');

const RepresentationTestSchema = new mongoose.Schema({
    title: String,
    questions: Array
});

module.exports = mongoose.model('RepresentationTest', RepresentationTestSchema);