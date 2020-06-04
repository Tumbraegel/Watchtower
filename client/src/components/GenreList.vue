<template>
  <div class="films container">
    <h2>Genre List</h2>
    <div class="row">
        <div v-for="film in filteredFilms" :film="film" :key="film._id" class="col-12">
           <li class="list-group-item list-group-item-primary" style="margin-bottom:10px;">{{ film.title }}</li>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GenreList',
  props: ['filteredFilms'],
}
</script>

<style scoped>
  .films {
    margin-top: 100px;
    text-align: center;
  }
</style>