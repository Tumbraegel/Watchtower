<template>
    <div class='container-fluid'>
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <h1 class="text-xs-center">Register</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">
              Already have an account?
            </router-link>
          </p>
          <form @submit.prevent="createNewUser">
              <div class="form-group">
              <input
                type="username"
                class="form-control"
                name="username"
                aria-describedby="usernameHelp"
                placeholder="Enter username"
                v-model="user.username"
              />
            </div>
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                v-model="user.email"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                name="password"
                placeholder="Password"
                v-model="user.password"
              />
            </div>
            <div class="form-group">
            <button type="submit" class="btn btn-primary">Sign Up</button>
            </div>
          </form>
          <div
            v-if="message"
            class="alert alert-danger"
          >{{message}}</div>
        </div>
      </div>
    </div>
</template>

<script>
import router from '../router'
import swal from 'sweetalert'
import User from '../models/user'

export default {
  name: 'register',

  data() {
    return {
      user: new User('', '', ''),
      message: ''
    }
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created() {
    if (this.loggedIn) {
      router.push({name: 'home'})
    }
  },

  methods: {
    createNewUser() {
      this.message = ''
          this.$store.dispatch('auth/register', this.user).then( function() {
            swal('Done!', 'Account created!', 'success', { buttons: false, timer: 1500 })
            router.push({name: 'login'})
          },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString()
            }
          )
    }
  }
}
</script>

<style scoped></style>