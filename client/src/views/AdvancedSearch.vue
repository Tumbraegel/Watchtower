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
          <div v-for="genre in genreList" :key="genre.id" class="col-md-4">
            <input type="checkbox" class="form-check-input"
            v-model="searchQuery.selectedGenre[genre.name]">
            <label class="form-check-label">{{ genre.name }}</label>
          </div>
          </div>
        </div>
        <p><b>Review Criteria</b></p>
        <div class="form-check" style="margin-bottom: 15px;">
          <div class="row">
          <div v-for="criterion in reviewCriteria" :key="criterion.id" class="col-md-4">
            <input type="checkbox" class="form-check-input" v-model="searchQuery.selectedReviewCriteria[criterion.name]">
            <label class="form-check-label">{{ criterion.name }}</label>
          </div>
          </div>
        </div>
        <p><b>Release Date</b></p>
        <div class="form-group">
          <input type="text" class="form-control" id="titleInput" placeholder="e.g. 2019"
          v-model="searchQuery.selectedReleaseDate">
        </div>
        <p>{{searchQuery}}</p>
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
      reviewCriteria: [{id: '1', name: 'Diversity'}, {id: '2', name: 'Queer Friendliness'}, {id: '3', name: 'Gender Equality'}],
      searchQuery: {
        selectedTitle: '',
        selectedGenre: {},
        selectedReviewCriteria: {},
        selectedReleaseDate: '',
        advancedSearch: true
      }
    };
  },

  created() {
    this.getGenreList();
  },

  methods: {
    async getGenreList() {
      function Element(id, name) {
      this.id = id.toString();
      this.name = name;
      }

      await this.$http.get("/genre").then((res) => {
        const list = res.data;
        let sum = 0;
        
        for(const entry of list) {
          const element = new Element(sum+=1, entry);
          this.genreList.push(element);
        }
      });
    },

    submitSearchQuery(e) {
      e.preventDefault();
      this.$http.post('/advanced-search', this.searchQuery).then(
        () => {
          this.$router.push({name: 'searchResults'});
        }).catch(error => {
          console.log(error.response)
        });
      }
    }
}
</script>

<style scoped>

</style>