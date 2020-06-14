<template>
  <div class="modal-backdrop">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div
            class="modal-dialog"
            role="dialog"
            aria-labelledby="modalTitle"
            aria-describedby="modalDescription"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Rate this movie</h5>
                <button type="button" class="close" @click="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>Score:</p>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value="5"
                    id="myRange1"
                    v-model="rating"
                  />
                <small
                  class="form-text text-muted"
                  style="margin-bottom:15px;"
                >Just go with your gut feeling!</small>
                <div>
                  <p>Choose Indicators</p>
                  <a
                    href="#"
                    class="badge badge-warning"
                    style="margin-right: 6px;"
                    @click="reviewSelected('Diversity')"
                  >Diversity</a>
                  <a
                    href="#"
                    class="badge badge-info"
                    style="margin-right: 6px;"
                    @click="reviewSelected('Queer Friendliness')"
                  >Queer Friendliness</a>
                  <a
                    href="#"
                    class="badge badge-primary"
                    style="margin-right: 6px;"
                    @click="reviewSelected('Gender Equality')"
                  >Gender Equality</a>
                </div>

                <div v-if="!isHidden">
                  <label
                    for="myRange1"
                    style="margin-right:30px; color:#4d4d4d;"
                  >{{ reviewCriterion }}</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value="5"
                    id="myRange1"
                    v-model="reviewResult"
                  />

                  <br />

                  <button
                    v-if="showConfirmButton"
                    class="btn btn-dark"
                    @click="confirmResult"
                  >Confirm</button>
                  <button v-if="showClearButton" class="btn btn-light" @click="clearResult">Clear</button>
                  <hr />
                  <p>Optional {{ reviewTest }}</p>
                </div>
                <hr />
                <div style="margin-bottom:25px;">
                  Your review criteria:
                  <div v-for="criterion in allReviewResults" :key="criterion.name">
                    <span
                      class="badge badge-light"
                      style="margin-right: 6px;"
                    >{{ criterion.name }} : {{ criterion.result }}</span>
                  </div>
                </div>
                <button @click="submitReview" class="btn btn-primary">Submit all</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Modal",

  data() {
    return {
      reviewCriterion: '',
          reviewTest: '',
          reviewResult: 0,
          rating: 0,
          allReviewResults: [],
          isHidden: true,
          showClearButton: false,
          showConfirmButton: true
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    reviewSelected(value) {
      this.reviewCriterion = value;
      this.isHidden = false;
      this.setReviewTest(value);
    },

    setReviewTest(value) {
      if (value == "Diversity") this.reviewTest = "Duvernay Test";
      if (value == "Queer Friendliness") this.reviewTest = "Russo Test";
      if (value == "Gender Equality") this.reviewTest = "Bechdel Test";
    },

    confirmResult() {
      const results = this.allReviewResults;
      const criterionToRemove = results.findIndex(
        criterion => criterion.name === this.reviewCriterion
      );
      const criterion = {
        name: this.reviewCriterion,
        result: this.reviewResult
      };

      if (criterionToRemove != -1) {
        results.splice(criterionToRemove, 1);
      }

      results.push(criterion);
      this.showClearButton = true;
      this.isHidden = true;
    },

    clearResult() {
      const value = this.reviewCriterion;
      const results = this.allReviewResults;
      const criterionToRemove = results.findIndex(
        criterion => criterion.name === value
      );
      results.splice(criterionToRemove, 1);
    },

    submitReview() {
      // POST Request with allReviewResults array
      const options = {
        headers: { "Content-Type": "application/json" }
      };
      const payload = {
        'rating': this.rating,
        'reviewCriteria': this.allReviewResults};
      console.log("Payload " + payload);

      this.$http
        .post(
          "/film/" + this.$route.params.id,
          JSON.stringify(payload),
          options
        )
        .then(
          response => {
            console.log(response);
          },
          error => {
            console.log(error.response);
          }
        );
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>