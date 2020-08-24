<template>
  <div class="admin">
    <div class="container">
      <br />
      <p>Statistics Area</p>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "statistics",

  data() {
    return {
     initialState: []
    }
  },

  async created() {
    await this.getInitialStatistics()
  },

  methods: {
      ...mapActions('statistics', ['fetchInitialState']),

      getInitialStatistics() {
        const initialData = this.fetchInitialState().then(async (response) => {
        this.initialState = response
      })
      return initialData
    },
  },
}
</script>

<style scoped>
</style>