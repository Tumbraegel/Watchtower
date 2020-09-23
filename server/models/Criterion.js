const mongoose = require('mongoose')

const CriterionSchema = new mongoose.Schema({
  criterion: String,
  test: String,
  questions: Array,
})

module.exports = mongoose.model('Criterion', CriterionSchema)
