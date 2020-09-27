<template>
  <div>
    <div class='container-fluid'>
      <div style="margin-top:30px">
        <h5 style="font-strech: ultra-condensed">Advanced Search</h5>
      </div>
      <form>
        <p>
          <b>Title</b>
        </p>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="titleInput"
            placeholder="e.g. Snowpiercer"
            v-model="searchQuery.selectedTitle"
          />
        </div>
        <p>
          <b>Genre</b>
        </p>
        <div class="form-check" style="margin-bottom: 15px;">
          <div class="row">
            <div v-for="genre in currentGenres" :key="genre.index" class="col-md-4">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="searchQuery.selectedGenre[genre]"
              />
              <label class="form-check-label">{{ genre }}</label>
            </div>
          </div>
        </div>
        <p>
          <b>Review Criteria</b>
        </p>
        <div class="form-check" style="margin-bottom: 15px;">
          <div class="row">
            <div v-for="entry in currentReviewCriteria" :key="entry._id" class="col-md-4">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="searchQuery.selectedReviewCriteria[entry.criterion]"
              />
              <label class="form-check-label">{{ entry.criterion }}</label>
            </div>
          </div>
        </div>
        <p>
          <b>Release Year</b>
        </p>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="titleInput"
            placeholder="e.g. 2019"
            v-model="searchQuery.selectedReleaseDate"
          />
        </div>
        <button type="submit" class="btn btn-outline-custom" @click="submitSearchQuery">Search</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "advancedSearch",

  data() {
    return {
      genreList: [],
      searchQuery: {
        selectedTitle: "",
        selectedGenre: {},
        selectedReviewCriteria: {},
        selectedReleaseDate: "",
        advancedSearch: true,
      },
    };
  },

  computed: {
    ...mapState('film', ['allReviewCriteriaData', 'allGenres']),
    currentReviewCriteria() {
      return this.allReviewCriteriaData
    },
    currentGenres() {
      return this.allGenres
    }
  },

  created() {
    this.getInitialData()
  },

  methods: {
    ...mapActions('search', ['performAdvancedSearch']),
    ...mapActions('film', ['fetchReviewCriteriaContext', 'fetchAllGenres']),

    async getInitialData() {
      this.fetchReviewCriteriaContext()
      this.fetchAllGenres()
    },

    submitSearchQuery(e) {
      e.preventDefault()
      const payload = this.searchQuery
      this.performAdvancedSearch(payload).then(() => {
          this.$router.push({name: 'searchResults'})
      })
    },
  },
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