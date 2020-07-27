<template>
  <div>
    <canvas id="criteria-chart" style="width: 600px; height: 300px;"></canvas>
    <canvas id="score-chart" style="width: 600px; height: 300px;"></canvas>
  </div>
</template>

<script>
// https://www.digitalocean.com/community/tutorials/vuejs-vue-chart-js
// https://vue-chartjs.org/guide/#chart-with-api-data
// LAST ACCESSED 27/07/2020
import Chart from 'chart.js';
import reviewCriteriaChartData from '../../models/chart_models/chart_criteria.js';
import ScoreChartService from '../../models/chart_models/chart_score.js';

export default {
  data() {
    return {
      reviewCriteriaChartData,
      ScoreChartService
    }
  },

  mounted() {
    this.createChart('criteria-chart', this.reviewCriteriaChartData);
    this.createChart('score-chart', this.ScoreChartService.getScoreData());
  },

  methods: {
  createChart(chartId, chartData) {
    const ctx = document.getElementById(chartId);
    new Chart(ctx, {
      type: chartData.type,
      data: chartData.data,
      options: chartData.options,
    });
  }
}
}

</script>