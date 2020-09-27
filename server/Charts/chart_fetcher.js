const filmRepo = require('../repositories/FilmRepository')
const criterionRepo = require('../repositories/CriterionRepository')
const reviewRepo = require('../repositories/ReviewRepository')
const boxPlot = require('../Charts/chart_box_plot')
const barChart = require('../Charts/chart_bar')
const pieChart = require('../Charts/chart_pie')
const barChartTest = require('../Charts/chart_bar_test')

class ChartFetcher {
  async fetchChart(type, value, status) {
    let result = {}
    let dataset = []
    let testResults = []

    if (type == 'boxplot') {
      const selectedFilms = await filmRepo.filterForFilmsWithReviewCriterion(value)
      const allGenres = await filmRepo.getAllGenres()
      const allReviewCriteria = await criterionRepo.getAllReviewCriteria()
      const data = await boxPlot.fetchData(selectedFilms, allReviewCriteria)
      result = boxPlot.createPlot(data, allGenres, value)
    }

    if(type == 'barChart') {
      if(value == 'releaseYears') {
        dataset = await filmRepo.getAllReleaseYears()
        testResults = await reviewRepo.getAllTestResults('releaseYears', dataset, status)
      }
      if(value == 'genres') {
        dataset = await filmRepo.getAllGenres()
        testResults = await reviewRepo.getAllTestResults('genres', dataset, status)
      }
      if(value == 'reviewCriteria') {
        dataset = await criterionRepo.getAllReviewCriteria()
        testResults = await reviewRepo.getAllTestResults('reviewCriteria', dataset, status)
      }
      result = barChartTest.createPlot(testResults, dataset, value)
    }
    return result
  }

  async getFilmPageChartData(reviews, reviewCriteriaList) {
    const data = {
      reviewCriteriaChart: {},
      pieChartRating: {},
      pieChartReviewCriteria: {},
    }

    // get chart data for all scores of selected film
    const scores = pieChart.fetchScores(reviews)
    const pieChartRating = pieChart.createPlot(scores)

    // get chart data for all review criteria of selected film
    const reviewCriteriaChart = barChart.fetchReviewCriteria(
      reviews,
      reviewCriteriaList
    )
    const test = barChart.getReviewCriteriaData(reviewCriteriaChart)

    // get chart data for percentage of reviewed criteria of selected film
    const reviewCriteriaScores = pieChart.fetchCriteriaScores(
      reviews,
      reviewCriteriaList
    )
    const pieChartReviewCriteria = pieChart.createPlot(reviewCriteriaScores)

    data.reviewCriteriaChart = test
    data.pieChartRating = pieChartRating
    data.pieChartReviewCriteria = pieChartReviewCriteria
    return data
  }

  getBarChartData(reviewCriteriaChart) {
    return barChart.getReviewCriteriaData(reviewCriteriaChart)
  }
}

module.exports = new ChartFetcher()
