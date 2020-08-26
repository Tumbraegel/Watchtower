<template>
  <div>
      <div id="reviewCriteriaChart"></div>
      <div id="scoresChart"></div>
  </div>
</template>

<script>
import Plotly from 'plotly.js-dist'
import ReviewCriteriaChartService from '../../models/chart_models/chart_criteria'
import ScoreChartService from '../../models/chart_models/chart_score'
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
    ...mapState('film', ['reviewList']),
  }, 

  created() {
    this.getChartData(this.reviewList)
  },

  methods: {
    async getChartData(reviews) {
      // get chart data for all scores of selected film
      const scores = await this.ScoreChartService.fetchScores(reviews)
      const scoresChart = this.ScoreChartService.getScoreData(scores)
      
      // get chart data for all review criteria of selected film
      const reviewCriteria = await this.ReviewCriteriaChartService.fetchReviewCriteria(reviews)
      const reviewCriteriaChart = this.ReviewCriteriaChartService.getReviewCriteriaData(reviewCriteria)

      Plotly.newPlot('reviewCriteriaChart', reviewCriteriaChart.data, reviewCriteriaChart.layout)
      Plotly.newPlot('scoresChart', scoresChart.data, scoresChart.layout)
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