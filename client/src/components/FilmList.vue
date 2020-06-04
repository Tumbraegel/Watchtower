<!-- Tutorial https://auth0.com/blog/beginner-vuejs-tutorial-with-user-login -->
<template>
  <div class="films container">
    <h2>Featured Films</h2>
    <div class="row row-cols-1 row-cols-md-3">
        <div v-for="film in featuredFilms" :film="film" :key="film._id" class="col mb-4">
            <FilmCard :film="film" />
        </div>
    </div>
  </div>
</template>

<script>
import FilmCard from '../components/partials/FilmCard';

export default {
  name: 'FilmList',
  components : {
    FilmCard
  },
  props: {
    featuredFilms: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
  .films {
    margin-top: 100px;
    text-align: center;
  }
</style>