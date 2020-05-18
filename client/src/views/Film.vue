<template>
  <div class="film-single">
    <div class="row film-banner">
        <div class="container">
          <h1 class="title">
            {{ film.title }}
          </h1>
          <h2 class="subtitle ">
            {{ film.releaseDate }}
          </h2>
        </div>
    </div>

    <div class="row film-content">
      <div class="container">
        <div class="row">
          <div class="col-md-9">
        <p class=""><strong>Plot: </strong>{{ film.description }}</p>
        <p class=""><strong>Genre: </strong>{{ film.genres }}</p>
        <p class=""><strong>Cast: </strong>{{ film.cast }}</p>
        </div>
          <div class="col-md-2">
            <img :src=film.image :alt=film.title>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Film',
    data() {
      return {
        film: {}
      }
    },
    created() {
    this.getFilmData();
  },
  methods: {
    getFilmData() {
      this.$http.get("/film/" + this.$route.params.id).then(res => {
        this.film = res.data;
      });
  }
  }
  }
</script>

<style lang="scss" scoped>
  .film-banner{
    background-color: #00d1b2;
    color: #fff;
    font-weight: 200;
    line-height: 1.5;
    padding: 20px 0 20px;
    margin-bottom: 30px;
  }
  .film-single {
    margin-top: 30px;
  }
</style>