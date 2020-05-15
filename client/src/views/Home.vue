<template>
  <div class="home">
    <div class="container">
      <div class="bgimg">
      <h1>Welcome to the world of inclusive reviews</h1>
      <h4>Make sure to check out the Top Picks below</h4>
      </div>
    <FilmList />
    </div>
  </div>
</template>

<script>
import FilmList from '../components/FilmList';
export default {
  name: 'home',
  components: {
    FilmList
  }
}
</script>

<style scoped>
/*.bgimg {
  background-image:  url("../assets/film-negative.jpg");
  height: 50%;
  opacity: 0.65;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}*/
</style>