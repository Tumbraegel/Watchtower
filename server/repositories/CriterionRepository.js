const Criterion = require('../models/Criterion')

class CriterionRepository {
    constructor(model) {
        this.model = model
    }

    findById(id) {
        return this.model.findById(id)
    }

    findAll() {
        return this.model.find()
    }

    async getAllReviewCriteria() {
        const listOfReviewCriteria = []
        await this.findAll().then(response => {
            for(const entry of response) listOfReviewCriteria.push(entry.criterion)
        })
        return listOfReviewCriteria
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

    async getTestBasedOnCriterion(criterion) {
        let test = ''
        await this.model.findOne({ criterion: criterion }).then(result => {
            test = result.test
        })
        return test
    }
}

module.exports = new CriterionRepository(Criterion)