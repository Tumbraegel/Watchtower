<template>
  <div class="admin">
    <div class="container">
      <br />
      <p>Statistics Area</p>
      <button @click="createPlot">Click me!</button>
      <div id="scatterPlot"></div>
    </div>

  </div>
</template>

<script>
import ScatterPlot from '../models/chart_models/chart_scatter'
import Plotly from 'plotly.js-dist'
import { mapActions, mapState } from 'vuex'

export default {
  name: "statistics",

  data() {
    return {
     ScatterPlot,
     initialState: []
    }
  },

  async created() {
    await this.getInitialStatistics()
    await this.fetchReviewCriteria()
  },

  computed: {
    ...mapState('statistics', ['initialData', 'listOfReviewCriteria']),
    plotData() {return this.initialData},
    reviewCriteria() {return this.listOfReviewCriteria}
  },

  methods: {
    ...mapActions('statistics', ['fetchInitialState', 'fetchReviewCriteria']),

    getInitialStatistics() {
      const initialData = this.fetchInitialState().then((response) => {
        this.initialState = response
      })
      return initialData
    },

    async createPlot() {
      const data = await this.ScatterPlot.fetchData(this.plotData, this.listOfReviewCriteria)
      const result = await this.ScatterPlot.createPlot(data)
      Plotly.newPlot('scatterPlot', result.data, result.layout)
    },
  },
}
</script>

<style scoped>
</style>