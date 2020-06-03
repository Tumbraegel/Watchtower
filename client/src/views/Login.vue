<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }">
              Don't have an account yet?
            </router-link>
          </p>
          <form @submit="loginUser">
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                v-model="email"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router';
export default {
  name: 'login',

  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    loginUser(e) {
      e.preventDefault();

      const options = {
        headers: {'Content-Type': 'application/json'}
      }

      const payload = {
        email : this.email,
        password : this.password
        };

      this.$http.post('/user/login', JSON.stringify(payload), options).then((response) => {
            console.log(response);
            router.push({name: 'home'});
          }, (error) => {
            console.log(error.response);
        });
    }
  }
}
</script>

<style scoped></style>