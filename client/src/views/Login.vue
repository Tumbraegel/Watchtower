<template>
  <div class="login">
    <div class='container-fluid'>
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }">
              Don't have an account yet?
            </router-link>
          </p>
          <form @submit.prevent="loginUser">
            <div class="form-group">
              <input
                type="email"
                name="email"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                v-model="user.email"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                name="password"
                class="form-control"
                placeholder="Password"
                v-model="user.password"
              />
            </div>
            <div class="form-group">
            <button type="submit" class="btn btn-primary">
              <span>Login</span>
            </button>
            </div>
            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'
import User from '../models/user'

export default {
  name: 'login',
  data() {
    return {
      user: new User('', ''),
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
    loginUser() {
        if (this.user.email && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              router.push({name: 'home'})
            },
            () => {
              this.message = 'The email or password was incorrect!' 
            }
          )
        }
    }
  }
};
</script>

<style scoped></style>