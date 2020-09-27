<template>
  <div class="films container">
    <h2>Filtered List</h2>
    <div class="row">
        <div v-for="film in filteredFilms" :film="film" :key="film._id" class="col-12">
           <li class="list-group-item list-group-item-custom" style="margin-bottom:10px;">
             <router-link :to="'/film/' + film.imdbID" class="custom-link-color">
                {{ film.title }}
             </router-link>
             </li>
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
.list-group-item-custom {
  border-color: #5d5dd5;
  background-color: #f2f2f2;
}
.custom-link-color {
  color: #5d5dd5
}
</style>