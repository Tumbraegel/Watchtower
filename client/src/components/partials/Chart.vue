<template>
  <div>
    <div style="height: 100%; width: 360px;">
      <canvas id="criteria-chart"></canvas>
      <span
        @click="showCanvasInModal"
        class="badge badge-info"
        style="cursor: pointer; float:right;"
      >Expand</span>
    </div>
    <div style="height: 100%; width: 360px;">
      <canvas id="score-chart"></canvas>
      <span
        @click="showCanvasInModal"
        class="badge badge-info"
        style="cursor: pointer; float:right;"
      >Expand</span>
    </div>
    <modal-statistics v-show="isModalVisible" @close="closeModal" />
  </div>
</template>

<script>
// https://www.digitalocean.com/community/tutorials/vuejs-vue-chart-js
// https://vue-chartjs.org/guide/#chart-with-api-data
// LAST ACCESSED 27/07/2020
import Chart from "chart.js";
import ReviewCriteriaChartService from "../../models/chart_models/chart_criteria.js";
import ScoreChartService from "../../models/chart_models/chart_score.js";
import ModalStatistics from "../partials/ModalStatistics";

export default {
  name: "ChartItem",
  components: {
    ModalStatistics,
  },
  props: ["filmId"],

  data() {
    return {
      ReviewCriteriaChartService,
      ScoreChartService,
      isModalVisible: false,
      id: this.filmId,
    };
  },

  async mounted() {
    const reviews = await this.ReviewCriteriaChartService.getReviewDataOfSelectedFilm(
      this.id
    );
    const reviewCriteria = await this.ReviewCriteriaChartService.fetchReviewCriteria(
      reviews
    );
    this.createChart(
      "criteria-chart",
      this.ReviewCriteriaChartService.getReviewCriteriaData(reviewCriteria)
    );

    const films = await this.ScoreChartService.getReviewDataOfSelectedFilm(
      this.id
    );
    const scores = await this.ScoreChartService.fetchScores(films);
    this.createChart(
      "score-chart",
      this.ScoreChartService.getScoreData(scores)
    );
  },

  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    },

    showCanvasInModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>