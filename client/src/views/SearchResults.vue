<template>
  <div>
    <div class="container">
      <div style="margin-top:30px">
      <h5>Results for "{{ getSearchKeyword }}" </h5>
      </div>
      <div v-for="film in getSearchResults" :film="film" :key="film._id" class="col mb-9"> 
        <FilmCard :film="film" />
      </div>
    </div>
  </div>
</template>

<script>
import FilmCard from '../components/partials/FilmCard';

export default {
  name: 'searchResults',
  components : {
    FilmCard
  },

  data() {
    return {
      query: '',
      featuredFilms: [],
    };
  },

  computed: {
    getSearchKeyword() {
      const result = this.$store.state.search.input;
      if (result[0] != undefined) return result[0].film.title;
      else return null
    },

    getSearchResults() {
      const searchResults = []
      const results = this.$store.state.search.input;
      for(let entry of results) {
        searchResults.push(entry.film);
      }
      return searchResults;
    }
  }
}
</script>

<style scoped>

</style>