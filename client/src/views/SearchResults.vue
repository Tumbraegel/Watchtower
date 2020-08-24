<template>
  <div>
    <div class="container">
      <div style="margin-top:30px">
          <h5 v-if="getSearchKeyword">Results for "{{ getSearchKeyword }}" </h5>
          <h5 v-else>Results</h5>
      </div>
      <div v-if="getSearchResults">
        <div v-for="film in getSearchResults" :film="film" :key="film._id" class="col mb-9"> 
          <FilmCard :film="film" />
        </div>
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

  computed: {
    getSearchKeyword() {
      const result = this.$store.state.search.keyword
      if (result[0] != undefined) return result[0].searchKeyword
      else return null
    },

    getSearchResults() {
      let results = []
      if(this.$store.state.search.keyword != '') {
        results = this.$store.state.search.simple
      }
      else {
        results = this.$store.state.search.advanced
      }
      return results
    }
  }
}
</script>

<style scoped>

</style>