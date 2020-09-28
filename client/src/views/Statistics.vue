<template>
  <div>
    <div class="container-fluid">
      <br />
      <h4>Chart Display</h4>
      <div class="row">
        <div class="col-6">
          <p>
            Compare all genres to the frequency they got reviewed with a certain
            criterion:
          </p>
          <div class="dropdown">
            <button
              class="btn btn-outline-custom dropdown-toggle"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Select Review Criterion
            </button>
            <div class="dropdown-menu dropdown-scrollable">
              <div
                v-for="criterion in reviewCriteria"
                :key="criterion"
                :value="criterion"
              >
                <a
                  class="dropdown-item"
                  href="#"
                  @click="createChart('boxplot', criterion, 'none')"
                  >{{ criterion }}</a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="row">
          <p>
            See how the test results compare to the release year, the genre or
            the review criterion of a film:
          </p>
          <div class="dropdown col-4">
            <button
              class="btn btn-outline-custom dropdown-toggle"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Select Test Status
            </button>
            <div class="dropdown-menu dropdown-scrollable">
              <a
                class="dropdown-item"
                href="#"
                @click="chooseTestStatus('true')"
                >Passed</a
              >
              <a
                class="dropdown-item"
                href="#"
                @click="chooseTestStatus('false')"
                >Failed</a
              >
            </div>
          </div>
          <div class="dropdown col-2" v-show="isSecondDropdownVisible">
            <button
              class="btn btn-outline-custom dropdown-toggle"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Select Comparison Value
            </button>
            <div class="dropdown-menu dropdown-scrollable">
              <a
                class="dropdown-item"
                href="#"
                @click="chooseComparisonDataSet('releaseYears')"
                >Release Years</a
              >
              <a
                class="dropdown-item"
                href="#"
                @click="chooseComparisonDataSet('reviewCriteria')"
                >Review Criteria</a
              >
              <a
                class="dropdown-item"
                href="#"
                @click="chooseComparisonDataSet('genres')"
                >Genres</a
              >
            </div>
          </div>
          
          </div>
        </div>
      </div>

      <div :v-show=isChartVisible :id="selectedChart"></div>
    </div>
  </div>
</template>

<script>
import Plotly from 'plotly.js-dist'
import FilmService from '../services/film_service'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'statistics',

  data() {
    return {
      selectedChart: '',
      testStatus: '',
      isSecondDropdownVisible: false,
      isChartVisible: false
    }
  },

  created() {
    this.fetchReviewCriteriaContext()
  },

  computed: {
    ...mapState('film', ['reviewCriteriaList']),
    reviewCriteria() {
      return this.reviewCriteriaList
    }
  },

  methods: {
    ...mapActions('film', ['fetchReviewCriteriaContext']),

    chooseTestStatus(status) {
      this.testStatus = status
      this.isSecondDropdownVisible = true
    },

    chooseComparisonDataSet(value) {
      this.createChart('barChart', value, this.testStatus)
    },

    async createChart(chartType, value, status) {
      this.selectedChart = chartType
      this.isChartVisible = true
      const chartData = await FilmService.getChart(chartType, value, status)
      Plotly.newPlot(chartType, chartData.data.data, chartData.data.layout)
    }
  }
}
</script>

<style scoped>
.btn-outline-custom {
  border-color: #5d5dd5;
  color: #5d5dd5
}

.btn-outline-custom:hover {
  border-color: #5d5dd5;
  background-color: #5d5dd5;
  color: whitesmoke
}
</style>
