<template>
  <div class="about">
    <div class="container">
      <br>
      <h4>{{ message }}</h4>
      <p>Please contact us at XXX and let us know which film is missing!</p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'error',
    data() {
        return {
            message: 'Sorry! This film doesn\'t seem to exist!'
        }
    }
}
</script>

<style scoped>
</style>