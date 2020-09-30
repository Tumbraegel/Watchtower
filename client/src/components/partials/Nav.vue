<template>
  <nav class='navbar navbar-expand-lg navbar-light bg-light'>
    <router-link class='navbar-brand'
    :to="{ name: 'home' }" style="margin-right: 0px;"
    title="Go to Homepage">
      <img src='../../assets/logo_2.jpg' width='60' height='40' alt='Watchtower Logo' />
    </router-link>
    <button
      class='navbar-toggler'
      type='button'
      data-toggle='collapse'
      data-target='#navbarSupportedContent'
      aria-controls='navbarSupportedContent'
      aria-expanded='false'
      aria-label='Toggle navigation'
    >
      <span class='navbar-toggler-icon'></span>
    </button>

    <div class='collapse navbar-collapse' id='navbarSupportedContent'>
      <ul class='navbar-nav mr-auto'>
        <li class='nav-item active'>
          <router-link :to="{ name: 'home' }" class='nav-link'>Home</router-link>
        </li>
        <li class='nav-item active'>
          <router-link :to="{ name: 'about' }" class='nav-link'>About</router-link>
        </li>
        <li class='nav-item active'>
          <router-link :to="{ name: 'lists' }" class='nav-link'>Lists</router-link>
        </li>
        <li class='nav-item active'>
          <router-link :to="{ name: 'statistics' }" class='nav-link'>Statistics</router-link>
        </li>
        <li v-if="showAdminArea" class='nav-item active'>
          <router-link :to="{ name: 'admin' }" class='nav-link'>Admin</router-link>
        </li>
      </ul>
      <form class='form-inline my-2 my-lg-0'>
        <div>
          <router-link class='btn btn-outline-dark my-2 my-sm-0 btn-distance'
          :to="{ name: 'advancedSearch' }"
          title="Advanced Search">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-up-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"/>
          </svg>
          </router-link>
        <input
          class='form-control mr-sm-2'
          v-model='query'
          placeholder='Search'
          aria-label='Search'
        />
        <button
          @click.prevent='searchFilm'
          class='btn btn-outline-dark my-2 my-sm-0 btn-distance'
          title="Search"
        ><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
          <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
        </svg>
        </button>
        </div>
      </form>

      <div v-if='!currentUser'>
        <router-link class='btn btn-outline-dark my-2 my-sm-0 btn-distance'
        :to="{ name: 'register' }"
        title="Resgister">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10zM13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
          </svg> <span style="vertical-align: middle;"> Register</span>
        </router-link>
        <router-link class='btn btn-outline-dark my-2 my-sm-0'
        :to="{ name: 'login' }"
        title="Login">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-box-arrow-in-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
          <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
        </svg> <span style="vertical-align: middle;"> Login</span>
        </router-link>
      </div>

      <div v-if='currentUser'>
        <router-link class='btn btn-outline-dark my-2 my-sm-0 btn-distance' to='/me' title="Profile">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/>
            <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
          </svg><span style="vertical-align: middle;"> Me</span>
        </router-link>
        <button class='btn btn-outline-dark my-2 my-sm-0' @click.prevent='logout' title="Logout">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-box-arrow-in-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
          </svg><span style="vertical-align: middle;"> Logout</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import router from '../../router';

export default {
  name: 'Nav',
  data() {
    return {
      query: ''
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
    showAdminArea() {
      if(this.currentUser && this.currentUser.role == 'admin') return true
      else return false
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      router.push({ name: 'login' })
    },

    async searchFilm() {
      const keyword = this.query
      this.$store.dispatch("search/performSimpleSearch", keyword).then(() => {
        this.query = ''
        this.$router.push({name: 'searchResults'})
      })
    }
  }
}
</script>

<style scoped>
.btn-distance {
  margin-right: 5px;
}
</style>