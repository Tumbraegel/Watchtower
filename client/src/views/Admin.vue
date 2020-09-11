<template>
  <div class="admin">
    <div class="container">
      <br />
      <div class="row">
        <button v-show="isAuthorized" class="btn btn-warning" @click="openModal('review')">Add review criterion</button>
      </div>
      <div class="row" style="margin-top: 15px;">
        <button v-show="isAuthorized" class="btn btn-warning" @click="openModal('film')">Add new film</button>
      </div> 
      <p v-show="!isAuthorized" >You are not authorized to view this content.</p>
    </div>

    <modal-review v-show="isReviewModalVisible" @close="closeModal" />
    <modal-film v-show="isFilmModalVisible" @close="closeModal" />
  </div>
</template>

<script>
import ModalReview from "../components/partials/ModalAddReviewCriterion"
import ModalFilm from "../components/partials/ModalAddFilm"

export default {
  name: "admin",
  components: {
    ModalReview,
    ModalFilm
  },

  data() {
    return {
      user: {},
      isReviewModalVisible: false,
      isFilmModalVisible: false,
      isAuthorized: false
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user
    }
  },

  async created() {
    if(this.currentUser && this.currentUser.role == 'admin') this.isAuthorized = true
    else this.isAuthorized = false
  },

  methods: {
    openModal(name) {
      if(name == 'review') this.isReviewModalVisible = true
      else this.isFilmModalVisible = true
    },

    closeModal() {
      this.isReviewModalVisible = false
      this.isFilmModalVisible = false
    },
  },
}
</script>

<style scoped>
</style>