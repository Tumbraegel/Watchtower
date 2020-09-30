const criterionRepo = require('../repositories/CriterionRepository')

class BarChart {

  async createPlot(testResults, testStatus, dataset, comparisonValue) {
    const result = {}
    const data = []
    const xAxis = dataset
    let titleAddition = ''
    const colorArray = ['#b30059','#3cba9f','#4d79ff','#e83e8c']
    let count = -1

    for(const [key, value] of Object.entries(testResults)) {
      count += 1
      this[key] = {
        x: xAxis,
        y: Object.values(value),
        name: await criterionRepo.getTestBasedOnCriterion(key),
        marker: {color: colorArray[count]},
        type: 'bar'
      }
      data.push(this[key])
    }

    if(comparisonValue == 'releaseYears') titleAddition = 'over the Years.'
    if(comparisonValue == 'genres') titleAddition = 'for Existing Genres.'
    if(comparisonValue == 'reviewCriteria') titleAddition = 'in Relation to Review Criteria Themselves.'

    const layout = {
      title: 'Review Criteria Tests with a ' + testStatus.toUpperCase() + ' Test Result ' + titleAddition,
      titlefont: {size: 18},
      paper_bgcolor: 'rgb(243, 243, 243)',
      plot_bgcolor: 'rgb(243, 243, 243)',
    }
    result.data = data
    result.layout = layout
    return result
  }
}

module.exports = new BarChart()
