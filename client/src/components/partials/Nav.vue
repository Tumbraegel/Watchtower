<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/" @click.prevent>
      <img src="../../assets/logo.jpg" width="35" height="35" alt="Watchtower Logo" />
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item active">
          <router-link :to="{ name: 'about' }" class="nav-link">About</router-link>
        </li>
        <li class="nav-item active">
          <router-link :to="{ name: 'genre' }" class="nav-link">Genres</router-link>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          v-model="query"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          @click.prevent="searchFilm"
          class="btn btn-outline-dark my-2 my-sm-0 btn-distance"
        >Search</button>
      </form>

      <div v-if="!currentUser">
        <router-link class="btn btn-dark my-2 my-sm-0 btn-distance" :to="{ name: 'register' }">
          <font-awesome-icon icon="user-plus" />Register
        </router-link>
        <router-link class="btn btn-dark my-2 my-sm-0" :to="{ name: 'login' }">
          <font-awesome-icon icon="sign-in-alt" />Sign In
        </router-link>
      </div>

      <div v-if="currentUser">
        <router-link class="btn btn-dark my-2 my-sm-0 btn-distance" to="/me">
          <font-awesome-icon icon="user" />
          Me
          {{ currentUser.username }}
        </router-link>
        <button class="btn btn-dark my-2 my-sm-0" @click.prevent="logout">
          <font-awesome-icon icon="sign-out-alt" />Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import router from "../../router";

export default {
  name: "Nav",
  data() {
    return {
      query: "",
      searchedForFilms: []
    };
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }

      return false;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      router.push({ name: "login" });
    },

    searchFilm() {
      this.$http.get("/search/" + this.query).then(
        response => {
          if(response.data[0]) { 
            for(let entry of response.data[0]) {
              console.log(entry.title);
            }
            //this.$router.push('/film/' + response.data[0].imdbID);
          } 
          else {
            //this.sendErrorMessage('This film does not seem to exist in our database');
            this.$router.push('/error');
          }
          this.query = '';
        },
        error => {
          console.log(error.response);
        }
      );
    },

  }
};
</script>

<style scoped>
.btn-distance {
  margin-right: 5px;
}
</style>