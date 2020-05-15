<template>
<div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="../../assets/film-1.jpg" class="card-img" alt="Film XYZ">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{ film.title }}</h5>
        <p class="card-text">{{ film.release }}</p>
        <p class="card-text"><small class="text-muted">{{ film.genre }}</small></p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    props: [
      'film'
    ]
  }
</script>

<style scoped>
.card-img {
    height: 15rem;
    object-fit: cover;
}
</style>