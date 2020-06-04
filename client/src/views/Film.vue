<template>
  <div class="film-single">
    <div class="row film-banner">
        <div class="container">
          <h1 class="title">
            {{ film.title }} ({{ film.year }})
          </h1>
            <button class="btn btn-custom" @click="showModal=true">Review</button>
        </div>
    </div>

    <div class="row film-content">
      <div class="container">
        <div class="row">
          <div class="col-md-9">
        <p class=""><strong>Plot: </strong>{{ film.plot }}</p>
        <p class=""><strong>Genre: </strong>{{ film.genres }}</p>
        <p class=""><strong>Directors: </strong>{{ film.directors }}</p>
        <p class=""><strong>Cast: </strong>{{ film.actors }}</p>
        <p class=""><strong>Language: </strong>{{ film.language }}</p>
        <p class=""><strong>Rated: </strong>{{ film.rated }}</p>
        <p class=""><strong>Awards: </strong>{{ film.awards }}</p>
        </div>
          <div class="col-md-2">
            <img :src=film.poster :alt=film.title>
          </div>
          <div class="comment-section" style="margin-top:30px;">
            <h4>Comments</h4>
          <div class="row">
            <div class="col-12">
              <li class="list-group-item list-group-item-outline-primary">
                This movie was awesome! There's a lot of ........ <b>+1</b> | <b>-1</b>
              </li>
                <li class="list-group-item list-group-item-outline-primary">
                I didn't really like this movie because .... <b>+1</b> | <b>-1</b>
              </li>
              <br>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>

<!--TEMPORARY test modal form-->
  <div v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Rate this movie</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" @click="showModal = false">&times;</span>
                </button>
              </div>
              <div class="modal-body">

                  <div>
                  <p>Choose Indicators</p>
                  <a href="#" class="badge badge-warning" style="margin-right: 6px;" @click="reviewSelected('Diversity')">Diversity</a>
                  <a href="#" class="badge badge-info" style="margin-right: 6px;" @click="reviewSelected('Queer Friendliness')">Queer Friendliness</a>
                  <a href="#" class="badge badge-primary" style="margin-right: 6px;" @click="reviewSelected('Gender Equality')">Gender Equality</a>
                  </div>
                  
                  <div v-if="!isHidden">
                    <label for="myRange1" style="margin-right:30px; color:#4d4d4d;">{{ reviewCriterion }}</label>
                    <input type="range" min="0" max="10" value="5" id="myRange1" v-model="reviewResult">
                    
                    <br>
                    <!--<small class="form-text text-muted" style="margin-bottom:15px;">Just go with your gut feeling!</small>-->
                    <button v-if="showConfirmButton" class="btn btn-dark" @click=confirmResult>Confirm</button>
                    <button v-if="showClearButton" class="btn btn-light" @click=clearResult>Clear</button>
                  <hr>
                  <p>Optional {{ reviewTest }}</p>

                  </div>
                  <hr>
                  <div style="margin-bottom:25px;">
                    Your review criteria:
                    <div v-for="criterion in allReviewResults" :key="criterion.name">
                      <span class="badge badge-light" style="margin-right: 6px;">{{ criterion.name }} : {{ criterion.result }}</span>
                    </div>

                    <!--<a href="#">
                      Click here for more detailed review options.
                    </a>-->
                  </div>
                  <button @click="submitReview" class="btn btn-primary">Submit all</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>

  </div>
</template>

<script>
  export default {
    name: 'Film',
    data() {
      return {
        film: {},
        showModal: false,
        reviewCriterion: '',
        reviewTest: '',
        reviewResult: 0,
        allReviewResults: [],
        isHidden: true,
        showClearButton: false,
        showConfirmButton: true
      }
    },
    created() {
    this.getFilmData();
  },
  methods: {
    getFilmData() {
      this.$http.get("/film/" + this.$route.params.id).then(res => {
        this.film = res.data[0];
      });
  },

    reviewSelected(value) {
      this.reviewCriterion = value;
      this.isHidden = false;
      this.setReviewTest(value);
    },

    setReviewTest(value) {
      if(value == 'Diversity') this.reviewTest = 'Duvernay Test';
      if(value == 'Queer Friendliness') this.reviewTest = 'Russo Test';
      if(value == 'Gender Equality') this.reviewTest = 'Bechdel Test';
    },

    confirmResult() {
      const results = this.allReviewResults;
      const criterionToRemove = results.findIndex(criterion => criterion.name === this.reviewCriterion);
      const criterion = {
        name: this.reviewCriterion,
        result: this.reviewResult,
      }

      if (criterionToRemove != -1) {
        results.splice(criterionToRemove,1)
      }

      results.push(criterion);
      this.showClearButton = true;
      this.isHidden = true;
    },

    clearResult() {
      const value = this.reviewCriterion;
      const results = this.allReviewResults;
      const criterionToRemove = results.findIndex(criterion => criterion.name === value)
      results.splice(criterionToRemove,1);
    },

    submitReview() {
      // POST Request with allReviewResults array
      const options = {
        headers: {'Content-Type': 'application/json'}
      }
      const payload = this.allReviewResults;
      console.log("Payload " + payload);

      this.$http.post('/film/' + this.$route.params.id, JSON.stringify(payload), options).then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error.response);
        });
    }
  }
}
</script>

<style scoped>
  .film-banner{
    background-color: #4d4d4d;
    color: #fff;
    font-weight: 200;
    line-height: 1.5;
    padding: 20px 0 20px;
    margin-bottom: 30px;
  }
  .film-single {
    margin-top: 30px;
  }

  .btn-custom {
    border-color: #06A797;
    background-color: #06A797;
    color: whitesmoke;
    transition-duration: 0.4s;
  }

  .btn-custom:hover {
    border-color: #06A797;
    background-color: #4d4d4d;
    color: #06A797;
  }

  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>