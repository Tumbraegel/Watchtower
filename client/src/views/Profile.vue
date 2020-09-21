<template>
  <div class="container-fluid" style="margin-bottom: 40px;">
    <header class="banner-image">
      <div class="h-100">
        <div class="row h-100 align-items-center">
          <span class="col-md-1"></span>
          <div class="col-md-11 banner-text">
            <h3>
              <strong>{{ user.username }}</strong> Profile
            </h3>
          </div>
        </div>
      </div>
    </header>

    <div class="row" style="margin-top: 40px">
      <span class="col-md-1"></span>
      <div class="col">
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
            <strong>{{ user.role }}</strong>
          </p>
        </div>
        <strong>Reviews:</strong>
      </div>
    </div>

    <div class="row" style="margin: 30px 0px 0px 100px">
      <p
        v-if="!user.reviews == undefined"
        style="color: lightgray; margin-top: 20px;"
      >
        You have not reviewed any films.
      </p>
      <div v-for="item in user.reviews" :key="item._id" class="col-md-4">
        <div class="card" style="margin-bottom: 20px;">
          <div class="card-body">
            <h5 class="card-title">
              <router-link :to="'/film/' + item.film.imdbID">{{
                item.film.title
              }}</router-link>
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">
              Score: {{ item.rating }}
            </h6>
            <div>
              <span>Criteria</span>
              <div
                v-for="entry in item.reviewCriteria"
                :entry="entry"
                :key="entry.name"
              >
                - {{ entry.name }} : {{ entry.result }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" style="margin-top: 40px">
    <span class="col-md-1"></span>
    <button class="btn btn-danger" @click="deleteAccount()">
      Delete account
    </button>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import UserService from '../services/user_service'

export default {
  name: 'profile',

  data() {
    return {
      user: {}
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user
    }
  },

  created() {
    if (!this.currentUser) {
      this.$router.push('/login')
    } else {
      UserService.getUserProfile().then(
        response => {
          this.user = response.data
        },
        error => {
          this.user =
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        }
      )
    }
  },

  methods: {
    deleteAccount() {
      const payload = {
        email: this.currentUser.email
      }

      swal({
        title: 'Delete this account?',
        text:
          "Are you sure? You won't be able to revert this! All your data will be lost.",
        icon: 'warning',
        buttons: true
      }).then(confirmed => {
        if (confirmed) {
          this.$store.dispatch('auth/deleteAccount', payload).then(() => {
            swal('Done!', 'Your account was deleted.', 'success', {
              buttons: false,
              timer: 2000
            })
            this.$router.push('/')
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.banner-image {
  height: 200px;
  min-height: 200px;
  background-image: url('../assets/background_3.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.banner-text {
  color: darkslategray;
}
</style>
