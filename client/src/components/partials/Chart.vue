<template>
  <div>
    <div class="row">
        <div id="reviewCriteriaChart" class="col-md-12"></div>
    </div>
    <div class="row">
      <div id="pieChartReviewCriteria" class="col-md-4"></div>
      <div class="col-md-4"></div>
      <div id="pieChartRating" class="col-md-4"></div>
    </div>
  </div>
</template>

<script>
import Plotly from 'plotly.js-dist'
import { mapState } from 'vuex'

export default {
  name: 'ChartItem',

  computed: {
    ...mapState('film', ['chartData']),
  }, 

  mounted() {
    this.getChartData()
  },

  methods: {
    async getChartData() {
      Plotly.newPlot('reviewCriteriaChart', this.chartData.reviewCriteriaChart.data, this.chartData.reviewCriteriaChart.layout)
      Plotly.newPlot('pieChartRating', [this.chartData.pieChartRating.data[0]], this.chartData.pieChartRating.layout)
      Plotly.newPlot('pieChartReviewCriteria', [this.chartData.pieChartReviewCriteria.data[0]], this.chartData.pieChartReviewCriteria.layout)
    },
  },
}
</script>