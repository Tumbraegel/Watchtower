<template>
  <div class="admin">
    <div class="container">
      <br />
      <button v-show="isAuthorized" class="btn btn-warning" @click="openModal">Add</button>
      <p v-show="!isAuthorized" >You are not authorized to view this content.</p>
    </div>

    <modal v-show="isModalVisible" @close="closeModal('review')" />
  </div>
</template>

<script>
import Modal from "../components/partials/ModalAddReviewCriterion";
import UserService from "../services/user_service";

export default {
  name: "admin",
  components: {
    Modal,
  },

  data() {
    return {
      user: {},
      isModalVisible: false,
      isAuthorized: false
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },

  async created() {
    if (!this.currentUser) {
      this.isAuthorized = false
      console.log("Unauthorized Access")
    } else {
      await UserService.getAdminSection().then(
        response => {
          this.user = response.data;
        },
        error => {
          this.user =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      )
      if(this.user.role == 'admin') this.isAuthorized = true
    }
  },

  methods: {
    openModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    },
  },
}
</script>

<style scoped>
</style>