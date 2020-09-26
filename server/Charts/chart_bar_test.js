const criterionRepo = require('../repositories/CriterionRepository')

class BarChart {

  async createPlot(testResults, list2) {
    const result = {}
    const data = []
    const xAxis = list2
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

    const layout = {
      title: 'Review Criteria Tests over the Years',
      titlefont: {size: 14},
    }
    result.data = data
    result.layout = layout
    return result
  }
}

module.exports = new BarChart()
