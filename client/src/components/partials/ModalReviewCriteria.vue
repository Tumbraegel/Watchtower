 <template>
  <div>
    <label for="myRange1" style="margin-right:30px; color:#4d4d4d;">{{ reviewCriterion }}</label>
    <div>
      <span class="slider-color" style="margin-right: 7px;">1</span>
      <input
        @change="setConfirmButton"
        type="range"
        class="custom-range"
        min="1"
        max="10"
        step="0.5"
        style="width: 60%;"
        v-model="reviewResult"
      />
      <span class="slider-color" style="margin-left: 7px; margin-right: 25px;">10</span>
      <button
        v-if="showConfirmButton"
        @click="confirmSelection"
        class="btn btn-outline-dark btn-criteria-selection"
        style="margin-right: 10px;"
      >&#x2713;</button>
      <p>
        Result:
        <span class="slider-color">{{ reviewResult }}</span>
      </p>
    </div>
    <div @click="openTestQuestionsSection">
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-list-task" fill="currentColor" xmlns="http://www.w3.org/2000/svg" >
        <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"/>
        <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z"/>
        <path fill-rule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"/>
      </svg>
      <p>Take optional {{ reviewTest }}</p>
    </div>
    <div v-if="clickedOnTest">
      <div v-for="(value, key) in testQuestions" :key="key">
        <div class="row">
        <div class="col-md-10">{{ value }}</div>
        <div class="col-md-2">
          <input v-model="questions[key]" type="checkbox" class="form-check-input" >
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
name: "ModalReviewCriteria",
props: ['reviewCriterion'],

data() {
    return {
      reviewResult: 0,
      questions: {},
      clickedOnTest: false,
      showConfirmButton: false
    }
  },

  computed: {
    ...mapState('film', ['allReviewCriteriaData']),
    reviewCriteriaData() {return this.allReviewCriteriaData},
    reviewTest() {
      for(const entry of this.reviewCriteriaData) {
        if(entry.criterion == this.reviewCriterion)
          return entry.test
      }
      return null
    },
    testQuestions() {
      for(const entry of this.reviewCriteriaData) {
        if(entry.test == this.reviewTest)
          return entry.questions[0]
      }
      return null
    }
  },

  methods: {
    setConfirmButton() {
      this.showConfirmButton = true
    },

    openTestQuestionsSection() {
      this.clickedOnTest = true
    },

    checkIfTestPassed() {
      if(Object.keys(this.questions).length == Object.keys(this.testQuestions).length) {
        if (Object.values(this.questions).every(question => question == true)) {
          this.questions.testPassed = true
        }
        else this.questions.testPassed = false
       }
      else this.questions.testPassed = false
    },

    async confirmSelection() {
      if(Object.keys(this.questions).length != 0) await this.checkIfTestPassed()

      const criterion = {
          name: this.reviewCriterion,
          result: this.reviewResult,
          testResult: this.questions,
        } 

      this.showConfirmButton = false

      this.$emit("addCriterion", criterion)
    },
  }
}
</script>

<style scoped>

</style>