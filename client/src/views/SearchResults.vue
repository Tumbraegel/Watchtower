<template>
  <div>
    <div class="container">
      <div style="margin-top:30px">
      <h5>Results for "{{ query }}" </h5>
      </div>
      <film-list :featuredFilms="featuredFilms" />
    </div>
  </div>
</template>

<script>
import FilmList from '../components/FilmList';
export default {
  name: 'searchResults',
  components: {
    FilmList
  },

  data() {
    return {
      query: '',
      listOfFilmsWithReviews: [],
      featuredFilms: [],
    };
  },

  methods: {
      
}
}
</script>

<style scoped>

</style>