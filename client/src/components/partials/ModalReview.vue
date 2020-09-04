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
                <div v-if="!nextSlide">
                  <p style="font-weight: bold; letter-spacing: 2px;">Score:</p>
                  <div>
                    <span class="slider-color" style="margin-right: 7px;">1</span>
                    <input
                      type="range"
                      class="custom-range"
                      min="1"
                      max="10"
                      step="0.5"
                      style="width: 90%;"
                      v-model="rating"
                    />
                    <span class="slider-color" style="margin-left: 7px;">10</span>
                    <hr />
                    <p>
                      Result:
                      <span class="slider-color">{{rating}}</span>
                    </p>
                    <button @click="changeSlide" class="btn btn-outline-dark" style="float: right;">Continue</button>
                  </div>
                </div>

                <div v-if="nextSlide">
                  <div>
                    <p>Choose at least one criterion:</p>
                    <div v-for="entry in reviewCriteriaData" :key="entry">
                      <a
                        href="#"
                        class="badge badge-warning"
                        style="margin-right: 6px;"
                        @click="reviewSelected(entry.criterion)"
                      >{{ entry.criterion }}</a>
                    </div>
                  </div>
                  <hr />

                  <review-criteria
                    v-if="criterionSelected"
                    @addCriterion="addCriterion"
                    :reviewCriterion="reviewCriterion"
                  />

                  <hr />
                  <div v-if="!isEmpty" style="margin-bottom:25px;">
                    Your review criteria:
                    <div v-for="criterion in allReviewResults" :key="criterion.name">
                      <span
                        class="badge badge-light"
                        style="margin-right: 6px;"
                      >{{ criterion.name }} : {{ criterion.result }} <button 
                          @click="clearSelection(criterion.name)"
                          class="btn btn-outline-dark btn-criteria-selection">
                        &#x2717;</button></span>
                    </div>
                  </div>
                  <button
                    @click="submitReview"
                    class="btn btn-primary"
                    style="float: right"
                  >Submit all</button>
                  <button @click="close"
                    class="btn btn-outline-secondary" style="float: right; margin-right: 5px;">Cancel</button>
                  <button @click="changeSlide" class="btn btn-outline-dark">Go back</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import UserService from "../../services/user_service.js"
import ReviewCriteria from "./ModalReviewCriteria"
import swal from 'sweetalert'
import { mapState } from 'vuex'

export default {
  name: "ModalReview",
  components: {
    ReviewCriteria
  },

  data() {
    return {
      nextSlide: false,
      criterionSelected: false,
      reviewCriterion: "",
      reviewResult: 0,
      rating: 0,
      allReviewResults: []
    }
  },

  computed: {
    ...mapState('film', ['allReviewCriteriaData']),
    isEmpty: function () {
      return Object.keys(this.allReviewResults).length === 0
      },
      reviewCriteriaData() {return this.allReviewCriteriaData}
  },

  methods: {
    close() {
      this.$emit("close")
    },

    addCriterion(criterion) {
      console.log(criterion)
      const results = this.allReviewResults
      const entry = {
        name: criterion[0].name,
        result: criterion[0].result,
        questions: criterion[0].questions
      }

      const criterionToOverwrite = results.findIndex(
        criterion => criterion.name === entry.name
      )

      if (criterionToOverwrite > -1) {
        results.splice(criterionToOverwrite, 1);
      }

      results.push(entry)
      this.criterionSelected = false
    },

    clearSelection(entry) {
      const results = this.allReviewResults
      const index = results.findIndex(
        criterion => criterion.name === entry
      )
      if (index > -1) results.splice(index, 1)
    },

    changeSlide() {
      if (!this.nextSlide) this.nextSlide = true;
      else this.nextSlide = false
    },

    reviewSelected(value) {
      this.criterionSelected = true
      this.reviewCriterion = value
    },

    submitReview() {
      const id = this.$route.params.id
      const payload = {
        rating: this.rating,
        reviewCriteria: this.allReviewResults
      }

      console.log(payload)
      if(!payload.reviewCriteria.length) {
        swal({
          title: 'You\'re not quite done :)',
          text: 'You need to review at least one extra criterion.',
          icon: 'warning',
        })
      } else {
        UserService.postReview(payload, id).then(
          response => {
            console.log(response)
            swal('Done!', 'You rated this film with a score of ' + payload.rating, 'success', { buttons: false, timer: 2500 });
          },
          error => {
            console.log(error.response)
          }
        )
        this.close()
      }
    }
  }
}
</script>

<style>
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

.slider-color {
  color: purple;
  font-weight: bold;
}

.btn-criteria-selection {
  color: purple;
  border-radius: 50px;
  border-color: purple;
  padding: 1px 15px 1px 15px;
}

.btn-criteria-selection:hover {
  background-color: purple;
  color: whitesmoke;
}
</style>