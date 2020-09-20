<template>
  <div class="admin">
    <div class='container-fluid'>
      <h6>Choose action:</h6>
      <div style="margin: 20px 0px 0px 20px;">
        <div v-show="isAuthorized" class="row" style="margin-top: 15px;">
          <button class="col-md-3  btn btn-outline-custom" @click="openModal('admin')">Add new admin user</button>
        </div>
        <div class="row" style="margin-top: 15px;">
          <button class="col-md-3  btn btn-outline-custom" @click="openModal('')">Add new film</button>
        </div>
        <div class="row" style="margin-top: 15px;">
          <button class="col-md-3 btn btn-outline-custom" @click="openModal('review')">Add review criterion</button>
        </div>
      </div> 
      <p v-show="!isAuthorized" >You are not authorized to view this content.</p>
    </div>

    <modal-review v-show="isReviewModalVisible" @close="closeModal" />
    <modal-film v-show="isFilmModalVisible" @close="closeModal" />
    <modal-admin v-show="isAdminModalVisible" @close="closeModal" />
  </div>
</template>

<script>
import ModalReview from "../components/partials/ModalAddReviewCriterion"
import ModalFilm from "../components/partials/ModalAddFilm"
import ModalAdmin from "../components/partials/ModalAddAdmin"

export default {
  name: "admin",
  components: {
    ModalReview,
    ModalFilm,
    ModalAdmin
  },

  data() {
    return {
      user: {},
      isReviewModalVisible: false,
      isFilmModalVisible: false,
      isAdminModalVisible: false,
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
      else if(name == 'admin') this.isAdminModalVisible = true
      else this.isFilmModalVisible = true
    },

    closeModal() {
      this.isReviewModalVisible = false
      this.isFilmModalVisible = false
      this.isAdminModalVisible = false
    },
  },
}
</script>

<style scoped>
.btn-outline-custom {
  border-color: #5d5dd5;
  color: #5d5dd5
}

.btn-outline-custom:hover {
  border-color: #5d5dd5;
  background-color: #5d5dd5;
  color: whitesmoke
}
</style>