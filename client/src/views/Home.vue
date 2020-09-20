<template>
  <div class="home">
    <div class="container-fluid">
      <h1>Welcome to this review website</h1>
      <h4>Make sure to check out the Top Picks below</h4>
      <hr />
      <div>
        <h2>Featured Films</h2>
        <film-list :featuredFilms="featuredFilms" />
      </div>
    </div>
  </div>
</template>

<script>
import FilmService from '../services/film_service'
import FilmList from '../components/FilmList'

export default {
  name: 'home',
  components: {
    FilmList
  },

  data() {
    return {
      featuredFilms: []
    }
  },

  created() {
    this.getFeaturedFilms()
  },

  methods: {
    getFeaturedFilms() {
      FilmService.getRandomReviewedFilms().then(res => {
        this.featuredFilms = res.data
      })
    }
  }
}
</script>

<style scoped></style>
