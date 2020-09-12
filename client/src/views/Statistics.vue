<template>
  <div>
    <div class="container">
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
      <button @click="filterReviewedFilmsBy()">Click me!</button>
      <button @click="testMethod()">Test</button>
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

    filterReviewedFilmsBy() {
      // film with most reviews and highest rating 
      // film with most (favourable > 7-10) reviews on one specific criterion

      // SORTING ALGORITHM
      // If film matches conditions, then compare to films already in list
      // change places if necessary
      // if film is higher rated than the previous ones put it in first place and so on
    const data = []
    const allExistingRatings = []
    const amountOfReviews = []
    const reviewedFilms = this.plotData
    
    for(const film of reviewedFilms) {
      allExistingRatings.push(film.score)
      amountOfReviews.push(film.criteria.length)  
    }

    const medianOfAllExistingRatings = this.calculateMedian(allExistingRatings)
    const medianOfAmountOfReviews = this.calculateMedian(amountOfReviews)

    for(const film of reviewedFilms) {
      if(film.score >= medianOfAllExistingRatings && film.criteria.length >= medianOfAmountOfReviews) {
        data.push(film)
      }
    }

    console.log(medianOfAllExistingRatings)
    console.log(medianOfAmountOfReviews)
    console.log(data)
    },

    // PUT THIS ON BACKEND!!!
    calculateMedian(numbers) {
        //https://stackoverflow.com/questions/45309447/calculating-median-javascript
        const sorted = numbers.slice().sort((a, b) => a - b)
        const middle = Math.floor(sorted.length / 2)
        if (sorted.length % 2 === 0) {
            return (sorted[middle - 1] + sorted[middle]) / 2
        }
        return sorted[middle]
    },

    testMethod() {
      //https://dev.to/wangonya/sorting-algorithms-with-javascript-part-2-3g51
      this.$http.get("/film/sorted-list").then((res) => {
        console.log(res)
      })
    }
  },
}
</script>

<style scoped>
</style>