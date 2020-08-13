<template>
  <div class="admin">
    <div class="container">
      <br />
      <button class="btn btn-warning" @click="openModal">Add</button>
    </div>

    <modal v-show="isModalVisible" @close="closeModal('review')" />
  </div>
</template>

<script>
import Modal from "../components/partials/ModalAddReviewCriterion";

export default {
  name: "admin",
  components: {
    Modal,
  },

  data() {
    return {
      isModalVisible: false,
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