<template>
  <div class="container" style="margin-bottom: 40px;">
    <header class="jumbotron">
      <h3>
        <strong>{{ user.username }}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Username:</strong>
      {{ user.username }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ user.email }}
    </p>
    <div v-if="user.role == 'admin'" style="margin-bottom: 20px;">
      <p>
        You are classified as
        <strong>{{user.role}}</strong>
      </p>
      <a href @click="openModal">Assign admin rights to other user</a>
    </div>
    <strong>Reviews:</strong>
    <div class="row row-cols-1 row-cols-md-3">
        <p v-if="!(user.reviews).length" style="color: lightgray; margin-top: 20px;" class="col mb-4">You have not reviewed any films.</p>
        <div v-for="item in user.reviews" :item="item" :key="item._id"  class="col mb-4">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">
                <router-link :to="'/film/' + item.film.imdbID">{{ item.film.title }}</router-link>
              </h5>
              <h6 class="card-subtitle mb-2 text-muted">Score: {{ item.rating }}</h6>
              <div>
                <span>Criteria</span>
                <div
                  v-for="entry in item.reviewCriteria"
                  :entry="entry"
                  :key="entry.name"
                >- {{ entry.name }} : {{ entry.result }}</div>
              </div>
            </div>
        </div>
      </div>
    </div>
    <button class="btn btn-danger" @click="deleteAccount()">Delete account</button>
    <modal v-show="isModalVisible" @close="closeModal" />
  </div>
</template>

<script>
import swal from 'sweetalert'
import Modal from "../components/partials/ModalAddAdmin"
import UserService from "../services/user_service"

export default {
  name: "profile",

  components: {
    Modal,
  },

  data() {
    return {
      user: {},
      isModalVisible: false,
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },

  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login")
    } else {
      UserService.getUserProfile().then(
        (response) => {
          this.user = response.data
        },
        (error) => {
          this.user =
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        }
      )
    }
  },

  methods: {
    openModal(e) {
      e.preventDefault()
      this.isModalVisible = true
    },

    closeModal() {
      this.isModalVisible = false
    },

    deleteAccount() {
      const payload = {
        email: this.currentUser.email
      }

      swal({
        title: 'Delete this account?',
        text: 'Are you sure? You won\'t be able to revert this! All your data will be lost.',
        icon: 'warning',
        buttons: true,
      }).then((confirmed) => {
          if (confirmed) {
            this.$store.dispatch('auth/deleteAccount', payload).then(() => {
            swal('Done!', 'Your account was deleted.', 'success', { buttons: false, timer: 2000 })
            this.$router.push("/")
            })
          }
      })
    }
  }
}
</script>
