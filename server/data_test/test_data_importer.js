const criterionRepo = require('../repositories/CriterionRepository')
const reviewRepo = require('../repositories/ReviewRepository')
const filmRepo = require('../repositories/FilmRepository')
const userRepo = require('../repositories/UserRepository')
const testDataFilms = require('../data_test/test_data_films.json')
const testDataCriteria = require('../data_test/test_data_criteria.json')
const testDataUsers = require('../data_test/test_data_users.json')

class TestDataImporter {
    importData() {
        this.createCriteriaData()
        this.createFilmData()
    }

    createCriteriaData() {       
        for(const entry of testDataCriteria) {
            criterionRepo.addCriterion(entry)
        }
    }

    async createFilmData() {
        const users = []
        for(const entry of testDataUsers) {
            const user = await userRepo.create(entry)
            users.push(user) 
        }

        const allRatings = [1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10]
        const allReviewCriteria = await criterionRepo.getAllReviewCriteria()

        for(const item of testDataFilms) {
            await filmRepo.createEntry(item).then(async () => {
                const film = await filmRepo.findByImdbID(item.imdbID)
                for(const entry of users) {
                    const randomReviewCriteria = []
                    for(const criterion of allReviewCriteria) {
                        const randomCriterionRating = allRatings[Math.floor(Math.random() * allRatings.length)]
                        const randomTestResult = {}
        
                        for(let i=0; i<3; i++) {
                            randomTestResult[i] = Math.random() >= 0.3
                        }
        
                        if(randomTestResult[0] == true && randomTestResult[1] == true && randomTestResult[2] == true) randomTestResult.testPassed = true
                        else randomTestResult.testPassed = false
        
                        randomReviewCriteria.push({
                            name: criterion,
                            result: randomCriterionRating,
                            testResult: randomTestResult
                        })

                    const randomRating = allRatings[Math.floor(Math.random() * allRatings.length)]
                    await reviewRepo.createReview(
                        film,
                        { rating: randomRating, 
                          reviewCriteria: randomReviewCriteria
                        },
                        {id: entry._id}
                    )
                    }

                }
            })
        }
    }
}

module.exports = new TestDataImporter()