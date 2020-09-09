<template>
  <div class="card border-dark mb-3" style="max-width: 540px;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <div v-if="film.poster!='N/A'">
          <img :src=film.poster :alt=film.title class="card-img">
        </div>
        <div v-else>
          <img src="../../assets/film-1.jpg" :alt=film.title class="card-img">
        </div>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <router-link :to="'/film/' + film.imdbID">
          <h5 class="card-title text-warning">{{ film.title }}</h5>
          </router-link>
          <p class="card-text">{{ film.year }}</p>
          <p v-if="film.overallRating != null">Rating: {{ film.overallRating }}</p>
          <p v-else>Rating: TBD</p>
          <p class="card-text">
            <small class="text-muted">{{ film.genres }}</small>
          </p>
          <div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['film']
}
</script>

<style scoped>
.card-img {
  height: 15rem;
  object-fit: cover;
}
</style>
