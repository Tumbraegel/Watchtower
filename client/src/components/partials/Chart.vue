<template>
  <div>
    <div class="row">
        <div id="reviewCriteriaChart" class=col-md-8></div>
    </div>
    <div class="row">
        <div id="pieChartReviewCriteria" class=col-md-4></div>
        <div id="pieChartRating" class=col-md-4></div>
    </div>
  </div>
</template>

<script>
import Plotly from 'plotly.js-dist'
import ReviewCriteriaChartService from '../../models/chart_models/chart_criteria'
import ScoreChartService from '../../models/chart_models/chart_pie'
import { mapState } from 'vuex'

export default {
  name: 'ChartItem',

  data() {
    return {
      ReviewCriteriaChartService,
      ScoreChartService,
      isModalVisible: false
    }
  },

  computed: {
    ...mapState('film', ['reviewList', 'filmContext', 'reviewCriteriaList']),
  }, 

  created() {
    this.getChartData(this.reviewList)
    this.ScoreChartService.fetchCriteriaScores(this.reviewList, this.reviewCriteriaList)
  },

  methods: {
    async getChartData(reviews) {
      // get chart data for all scores of selected film
      const scores = await this.ScoreChartService.fetchScores(reviews)
      const scoresChart = this.ScoreChartService.getScoreData(scores)
      
      // get chart data for all review criteria of selected film
      const reviewCriteria = await this.ReviewCriteriaChartService.fetchReviewCriteria(reviews)
      const reviewCriteriaChart = this.ReviewCriteriaChartService.getReviewCriteriaData(reviewCriteria)

      // get chart data for percentage of reviewed criteria of selected film
      const reviewCriteriaScores = await this.ScoreChartService.fetchCriteriaScores(reviews, this.reviewCriteriaList)
      const criteriaScoresChart = this.ScoreChartService.getScoreData(reviewCriteriaScores)

      Plotly.newPlot('reviewCriteriaChart', reviewCriteriaChart.data, reviewCriteriaChart.layout)
      Plotly.newPlot('pieChartRating', scoresChart.data, scoresChart.layout)
      Plotly.newPlot('pieChartReviewCriteria', criteriaScoresChart.data, criteriaScoresChart.layout)
    },

    showCanvasInModal() {
      this.isModalVisible = true
    },

    closeModal() {
      this.isModalVisible = false
    },
  },
}
</script>