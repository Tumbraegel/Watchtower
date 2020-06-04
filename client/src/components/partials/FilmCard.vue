<template>
  <div class="card border-dark mb-3" style="max-width: 540px;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="../../assets/film-1.jpg" class="card-img" alt="Film XYZ" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <router-link :to="'/film/' + film.imdbID">
          <h5 class="card-title text-warning">{{ film.title }}</h5>
          </router-link>
          <p class="card-text">{{ film.year }}</p>
          <p>Rating:</p>
          <p class="card-text">
            <small class="text-muted">{{ film.genres }}</small>
          </p>
          <div>
          <!-- <button class="btn btn-outline-warning" @click="openModal">Open Modal</button>
          <modal-details v-model="modalOpen"></modal-details> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import ModalDetails from "./ModalDetails";

export default {
  /*components: {
    ModalDetails,
  },*/
  props: ['film'],
  data() {
    return {
      modalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.modalOpen = !this.modalOpen;
    },
  },
};
</script>

<style scoped>
.card-img {
  height: 15rem;
  object-fit: cover;
}
</style>
