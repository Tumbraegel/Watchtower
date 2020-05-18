<!-- Tutorial https://auth0.com/blog/beginner-vuejs-tutorial-with-user-login -->
<template>
  <div class="films container">
    <h2>Film List</h2>
    <div class="row row-cols-1 row-cols-md-3">
        <div v-for="film in films" :film="film" :key="film._id" class="col mb-4">
          <router-link :to="'/film/' + film._id">
            <FilmCard :film="film" />
           </router-link>
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
  data () {
    return {
      film: {},
      films: []
    }  ;
  },
  created() {
    this.getFilmData();
  },
  methods: {
    getFilmData() {
      this.$http.get("/").then(res => {
        this.films = res.data;
      });
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