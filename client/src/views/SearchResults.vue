<template>
  <div>
    <div class='container-fluid'>
      <div style="margin-top:30px">
          <h5 v-if="getSearchKeyword">Results for "{{ getSearchKeyword }}" </h5>
          <h5 v-else>Results</h5>
      </div>
      <div v-if="getSearchResults.length">
        <div v-for="film in getSearchResults" :film="film" :key="film._id" class="col mb-9"> 
          <FilmCard :film="film" />
        </div>
      </div>
      <div v-else>Oops. There seem to be no films matching your query.</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FilmCard from '../components/partials/FilmCard';

export default {
  name: 'searchResults',
  components : {
    FilmCard
  },

  computed: {
    ...mapState('search', ['keyword', 'simple', 'advanced']),

    getSearchKeyword() {
      if (this.keyword != '') return this.keyword
      else return null
    },

    getSearchResults() {
      let results = []
      if(this.simple.length) {
        results = this.simple
      }
      else {
        results = this.advanced
      }
      return results
    }
  }
}
</script>

<style scoped>

</style>