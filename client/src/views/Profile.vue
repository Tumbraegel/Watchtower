<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{user.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Username:</strong>
      {{user.username}}
    </p>
    <p>
      <strong>Email:</strong>
      {{user.email}}
    </p>
    <p>
      <strong>Reviews:</strong>
      {{user.reviews}}
    </p>
    <strong>Role:</strong>
    <ul>
      <!--<li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>-->
    </ul>
  </div>
</template>

<script>
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
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    else {
        UserService.getUserProfile().then(response => {
        this.user = response.data;
      },
      error => {
        this.user =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      });
    }
  },

};
</script>
