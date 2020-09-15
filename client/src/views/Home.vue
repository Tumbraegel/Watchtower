<template>
  <div class='home'>
    <div class='container'>
      <h1>Welcome to this review website</h1>
        <h4>Make sure to check out the Top Picks below</h4>
      <hr>
      <div>
        <h2>Featured Films</h2>
        <film-list :featuredFilms='featuredFilms' />
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
    FilmList,
  },

  data() {
    return {
      listOfFilmsWithReviews: [],
      featuredFilms: []
    }
  },

  created() {
    this.getFilmData()
  },

  methods: {
    randomiseFeaturedFilms() {
      const array = this.listOfFilmsWithReviews
      for (var i = 0; i < 3; i++) {
        const film = array[Math.floor(Math.random() * array.length)]
        if (this.featuredFilms.includes(film)) i -= 1
        else this.featuredFilms.push(film)
      }
    },

    getFilmData() {
      FilmService.getAllFilms().then(res => {
        const films = res.data

        films.forEach(element => {
          // filter out films without reviews
          if (element.reviews.length) this.listOfFilmsWithReviews.push(element)
        })
        this.randomiseFeaturedFilms()
      })
    }
  }
}
</script>

<style scoped>
</style>
