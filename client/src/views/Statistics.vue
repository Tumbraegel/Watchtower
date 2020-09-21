<template>
  <div>
    <div class='container-fluid'>
      <br />
      <p>Statistics Area</p>
      <div class="dropdown col-md-1">
        <button class="btn btn-outline-primary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Select
        </button>
        <div class="dropdown-menu dropdown-scrollable">
        <div v-for="criterion in reviewCriteria" :key="criterion" :value="criterion">
          <a class="dropdown-item" href="#" @click="createBoxPlot(criterion)">{{ criterion }}</a>
        </div>
      </div>
      </div>
      <div id="boxPlot"></div> 
    </div>
  </div>
</template>

<script>
import Plotly from 'plotly.js-dist'
import FilmService from '../services/film_service'
import { mapActions, mapState } from 'vuex'

export default {
  name: "statistics",

  created() {
    this.fetchReviewCriteriaContext()
  },

  computed: {
    ...mapState('film', ['reviewCriteriaList']),
    reviewCriteria() {return this.reviewCriteriaList},
  },

  methods: {
    ...mapActions('film', ['fetchReviewCriteriaContext']),

    async createBoxPlot(criterion) {
      const chartData = await FilmService.getChart('boxplot', criterion)
      Plotly.newPlot('boxPlot', chartData.data.data, chartData.layout)
    },
  },
}
</script>

<style scoped>
</style>