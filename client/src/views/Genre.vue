<template>
  <div class="genre">
    <div class="container">
      <div>
        <h4>Pick a genre:</h4>
      </div>
      <button class="btn btn-outline-primary" style="margin-right:10px;" @click="getFilmData('Drama')">
        Drama
      </button>
      <button class="btn btn-outline-primary" style="margin-right:10px;" @click="getFilmData('Thriller')">
        Thriller
      </button>
      <button class="btn btn-outline-primary" style="margin-right:10px;" @click="getFilmData('Action')">
        Action
      </button>
      <button class="btn btn-outline-warning" style="margin-right:10px;" @click="getFilmData('None')">
        Clear Filters
      </button>
      <genre-list :filteredFilms="filteredFilms" />
    </div>
  </div>
</template>

<script>
import GenreList from "../components/GenreList";
export default {
  name: 'genre',
  components: {
    GenreList,
  },
  
  data() {
    return {
      filteredFilms: []
    };
  },

  methods: {
    getFilmData(genre) {
      this.$http.get("/genre/" + genre).then((res) => {
        this.filteredFilms = res.data;
      });
    },
  },
};
</script>

<style scoped></style>
