<template>
  <div class="register">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h1 class="text-xs-center">Register</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">
              Already have an account?
            </router-link>
          </p>
          <form  @submit="createNewUser">
              <div class="form-group">
              <input
                type="username"
                class="form-control"
                id="username"
                aria-describedby="usernameHelp"
                placeholder="Enter username"
                v-model="username"
              />
            </div>
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                v-model="email"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <button type="submit" class="btn btn-primary">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router';
import swal from 'sweetalert';
export default {
  name: 'register',

  data() {
    return {
      username : '',
      email : '',
      password : ''
    }
  },

  methods: {
    createNewUser(e) {
      e.preventDefault();

      const options = {
        headers: {'Content-Type': 'application/json'}
      }
      const payload = {
        username : this.username,
        email : this.email,
        password : this.password
        };

      this.$http.post('/user/register', JSON.stringify(payload), options).then((response) => {
            swal('Done!', 'Account created!', 'success', { buttons: false, timer: 1500 });
            console.log(response);
            router.push({name: 'login'});
          }, (error) => {
            console.log(error.response);
        });
    }
  }
}
</script>

<style scoped></style>