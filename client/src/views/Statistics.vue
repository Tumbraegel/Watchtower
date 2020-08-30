<template>
  <div class="admin">
    <div class="container">
      <br />
      <p>Statistics Area</p>
      <button @click="createPlot()">Click me!</button>
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
      <!-- <div id="scatterPlot"></div> -->
      <div id="boxPlot"></div> 
    </div>

  </div>
</template>

<script>
import ScatterPlot from '../models/chart_models/chart_scatter'
import BoxPlot from '../models/chart_models/chart_box'
import Plotly from 'plotly.js-dist'
import { mapActions, mapState } from 'vuex'

export default {
  name: "statistics",

  data() {
    return {
     ScatterPlot,
     BoxPlot,
     initialState: []
    }
  },

  async created() {
    await this.getInitialStatistics()
  },

  computed: {
    ...mapState('statistics', ['initialData', 'listOfReviewCriteria', 'listOfGenres']),
    plotData() {return this.initialData},
    reviewCriteria() {return this.listOfReviewCriteria},
    genres() {return this.listOfGenres}
  },

  methods: {
    ...mapActions('statistics', ['fetchInitialState']),

    getInitialStatistics() {
      const initialData = this.fetchInitialState().then((response) => {
        this.initialState = response
      })
      return initialData
    },

    async createBoxPlot(criterion) {
      const data = await this.BoxPlot.fetchData(this.plotData, this.reviewCriteria)
      const result = await this.BoxPlot.createPlot(data, this.listOfGenres, criterion)
      Plotly.newPlot('boxPlot', result.data, result.layout)
    },

    createPlot() {

    }
  },
}
</script>

<style scoped>
</style>