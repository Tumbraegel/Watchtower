<template>
    <div class='container-fluid'>
      <div>
        <h4>Pick a genre:</h4>
      </div>
      <div class="row">
      <div class="dropdown col-md-1">
        <button class="btn btn-outline-primary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Select
        </button>
        <div class="dropdown-menu dropdown-scrollable">
        <div v-for="genre in genreList" :key="genre" :value="genre">
          <a class="dropdown-item" href="#" @click="getFilmData(genre)">{{ genre }}</a>
        </div>
      </div>
      </div>
      <div class="col-md-2">
      <button class="btn btn-outline-warning" style="margin-right:10px;" @click="getFilmData('None')">
        Clear Filters
      </button>
      </div>
      </div>
      <genre-list :filteredFilms="filteredFilms" />
    </div>
</template>

<script>
import FilmService from '../services/film_service'
import GenreList from "../components/GenreList"

export default {
  name: 'genre',
  components: {
    GenreList,
  },
  
  data() {
    return {
      filteredFilms: [],
      genreList: [],
    };
  },

  created() {
    this.getGenreList()
  },

  methods: {
    getFilmData(genre) {
      FilmService.getListOfFilmsPer(genre).then((res) => {
        this.filteredFilms = res.data
      })
    },

    async getGenreList() {
      await FilmService.getGenreData().then((res) => {
        this.genreList = res.data
      })
    },
  }
}
</script>

<style scoped>
.dropdown-scrollable {
  height:150px;
  overflow-y:auto;
}
</style>
