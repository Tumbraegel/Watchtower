<template>
  <div>
    <div class="container-fluid">
      <br />
      <h4>Pick a list to display</h4>
      <div class="row">
        <div class="col-6">
          <p>
            See all films for a genre:
          </p>
          <div class="dropdown">
            <button
              class="btn btn-outline-custom dropdown-toggle"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Select Genre
            </button>
            <div class="dropdown-menu dropdown-scrollable">
              <div v-for="genre in genreList" :key="genre" :value="genre">
                <a
                  class="dropdown-item"
                  href="#"
                  @click="getFilteredFilms('genre', genre)"
                  >{{ genre }}</a
                >
              </div>
            </div>
          </div>
          <button
            class="btn btn-outline-warning"
            style="margin-right:10px;"
            @click="getFilteredFilms('genre', 'None')"
          >
            Clear Selection
          </button>
        </div>
        <div class="col-6">
          <p>
            See the twenty highest ranking films for a review criterion:
          </p>
          <p>
            <small>[This is based on how often a film was reviewed with this criterion and what rating it was given.]</small>
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
                  @click="getFilteredFilms('criterion', criterion)"
                  >{{ criterion }}</a
                >
              </div>
            </div>
          </div>
          <button
            class="btn btn-outline-warning"
            style="margin-right:10px;"
            @click="getFilteredFilms('criterion', 'None')"
          >
            Clear Selection
          </button>
        </div>
      </div>
    </div>
    <genre-list :filteredFilms="filteredFilms" />
  </div>
</template>

<script>
import FilmService from '../services/film_service'
import GenreList from '../components/GenreList'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'genre',
  components: {
    GenreList
  },

  data() {
    return {
      filteredFilms: [],
      genreList: []
    }
  },

  computed: {
    ...mapState('film', ['reviewCriteriaList']),
    reviewCriteria() {
      return this.reviewCriteriaList
    }
  },

  created() {
    FilmService.getGenreData().then(res => {
      this.genreList = res.data
    })
    this.fetchReviewCriteriaContext()
  },

  methods: {
    ...mapActions('film', ['fetchReviewCriteriaContext']),

    getFilteredFilms(type, value) {
      if (type == 'genre') {
        FilmService.getListOfFilmsPer(value).then(res => {
          this.filteredFilms = res.data
          console.log(this.filteredFilms)
        })
      }
      if (type == 'criterion') {
        FilmService.getListOfHighestRankingFilms(value).then(res => {
          this.filteredFilms = res.data
          console.log(this.filteredFilms)
        })
      }
    }
  }
}
</script>

<style scoped>
.dropdown-scrollable {
  height: 150px;
  overflow-y: auto;
}

.btn-outline-custom {
  border-color: #5d5dd5;
  color: #5d5dd5;
}

.btn-outline-custom:hover {
  border-color: #5d5dd5;
  background-color: #5d5dd5;
  color: whitesmoke;
}
</style>
