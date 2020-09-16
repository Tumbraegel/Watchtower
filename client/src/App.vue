<template>
  <div id="app">
    <Nav />
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Nav from './components/partials/Nav.vue';
export default {
  name: 'app',
  components: {
    Nav
  }
}
</script>

<style>
#app {
  font-family: Verdana, Geneva, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#content {
  margin: 30px 20px 0px 20px;
}
</style>
