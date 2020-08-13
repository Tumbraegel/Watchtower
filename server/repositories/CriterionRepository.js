const Criterion = require('../models/Criterion')
const User = require('../models/User')

class CriterionRepository {
    constructor(model) {
        this.model = model
    }

    findById(id) {
        return this.model.findById(id)
    }

    async addCriterion(data) {
        const criterion = {
            criterion: data.criterion,
            test: data.test,
            questions: data.questions
        }

        let newCriterion = new this.model(criterion)
        await newCriterion.save().then(function() {
            console.log("Criterion was successfully stored in database.")
        }).catch((error) => console.log(error)) 
    }
}

module.exports = new CriterionRepository(Criterion)