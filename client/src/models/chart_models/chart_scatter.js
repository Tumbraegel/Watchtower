class ScatterPlot {
    async fetchData(data, reviewCriteria) {
       const collectedCriteriaAndTheirValues = []
       for(const criterion of reviewCriteria) {
        collectedCriteriaAndTheirValues.push({name: criterion, results: []})
       }

       for(const entry of data) {
        for(const list of entry.criteria) {
            for(const value of list) {
                for(const criterion of collectedCriteriaAndTheirValues) {
                    if (value.name == criterion.name)
                      criterion.results.push({
                        score: Number(value.result),
                        genre: entry.genre,
                      })
                    }
                }
            }
        }
       const preparedData = await this.prepareData(collectedCriteriaAndTheirValues)
       return preparedData
    }

    prepareData(data) {
       const result = []

       for(const entry of data) {
        const collectedScoresPerCriterion = []
        const collectedGenresPerCriterion = []

        for(const item of entry.results) {
            const extractedGenres = item.genre.split(',')
            for(const value of extractedGenres) {
                collectedScoresPerCriterion.push(item.score)
                collectedGenresPerCriterion.push(value)
            }
        }
        result.push({
          name: entry.name,
          collectedScores: collectedScoresPerCriterion,
          collectedGenres: collectedGenresPerCriterion,
        })
       }

       return result
    }

    createPlot(preparedData, genres) {
        console.log(genres)
        const result = {}
        const data = []

        for(const entry of preparedData) {
            console.log(entry.collectedScores)
            this[entry.name] = {
                x: entry.collectedScores,
                y: genres,
                z: [1,2,3,4,5],
                mode: 'markers',
                type: 'scatter',
                name: entry.name,
                marker: { size: 12 }
            }
            data.push(this[entry.name])
        }
          
        const layout = {
            title:'Genre and Review Criteria'
        }
        result.data = data
        result.layout = layout
        return result
    }
}

export default new ScatterPlot()