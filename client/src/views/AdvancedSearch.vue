<template>
  <div>
    <div class="container">
      <div style="margin-top:30px">
      <h5 style="font-strech: ultra-condensed">Advanced Search</h5>
      </div>
      <form>
        <p><b>Title</b></p>
        <div class="form-group">
          <input type="text" class="form-control" id="titleInput" placeholder="e.g. Snowpiercer"
          v-model="searchQuery.selectedTitle">
        </div>
        <p><b>Genre</b></p>
        <div class="form-check" style="margin-bottom: 15px;">
          <div class="row">
          <div v-for="genre in genreList" :key="genre" class="col-md-4">
            <input type="checkbox" class="form-check-input" 
            v-model="searchQuery.selectedGenre[genre]"
            :value="genre">
            <label class="form-check-label">{{ genre }}</label>
          </div>
          </div>
        </div>
        <p><b>Review Criteria</b></p>
        <div class="form-check" style="margin-bottom: 15px;">
          <div class="row">
          <div v-for="criterion in reviewCriteria" :key="criterion" :value="criterion" class="col-md-4">
            <input type="checkbox" class="form-check-input" v-model="searchQuery.selectedReviewCriteria[criterion.value]">
            <label class="form-check-label">{{ criterion }}</label>
          </div>
          </div>
        </div>
        <p><b>Release Date</b></p>
        <div class="form-group">
          <input type="text" class="form-control" id="titleInput" placeholder="e.g. 2019"
          v-model="searchQuery.selectedReleaseDate">
        </div>
        <!-- <p> {{ selectedGenre }}
          {{ searchQuery }}</p> -->
        <button type="submit" class="btn btn-primary" @click="submitSearchQuery">Search</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'advancedSearch',

  data() {
    return {
      genreList: [],
      reviewCriteria: ['Diversity', 'Queer Friendliness', 'Gender Equality'],
      selectedGenre: [],
      searchQuery: {
        selectedTitle: '',
        selectedGenre: [],
        selectedReviewCriteria: [],
        selectedReleaseDate: '',
      }
    };
  },

  created() {
    this.getGenreList();
  },

  methods: {
    getGenreList() {
      this.$http.get("/genre").then((res) => {
        this.genreList = res.data;
      });
    },

    submitSearchQuery() {
      console.log(this.searchQuery);
      // give search query to search results page
    }
  },
}
</script>

<style scoped>

</style>