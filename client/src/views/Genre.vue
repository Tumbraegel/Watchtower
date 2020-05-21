<template>
  <div class="genre">
    <div class="container">
      <div>
        <h4>Pick a genre:</h4>
      </div>
      <button class="btn btn-outline-primary" style="margin-right:10px;" @click="getGenre('Drama')">
        Drama
      </button>
      <button class="btn btn-outline-primary" style="margin-right:10px;" @click="getGenre('Thriller')">
        Thriller
      </button>
      <button class="btn btn-outline-primary" style="margin-right:10px;" @click="getGenre('Action')">
        Action
      </button>
      <button class="btn btn-outline-warning" style="margin-right:10px;" @click="getGenre('#')">
        Clear Filters
      </button>
      <genre-list :filteredFilms="filteredFilms" />
    </div>
  </div>
</template>

<script>
import GenreList from "../components/GenreList";
export default {
  name: "genre",
  components: {
    GenreList,
  },
  data() {
    return {
      films: [],
      filteredFilms: [],
      genre: "",
    };
  },
  created() {
      this.getFilmData();
  },
  methods: {
    getFilmData() {
      this.$http.get("/").then((res) => {
        this.films = res.data;
      });
    },
    getGenre(genre) {
      this.genre = genre;
      this.filterFilmsByGenre(genre);
    },

    filterFilmsByGenre(genre) {
      this.filteredFilms = this.films.filter((film) =>
        film.genres.includes(genre)
      );
    },
  },
};
</script>

<style scoped></style>
