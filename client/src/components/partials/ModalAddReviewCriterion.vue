<template>
  <div class="modal-backdrop">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div
            class="modal-dialog modal-dialog-scrollable"
            role="dialog"
            aria-labelledby="modalTitle"
            aria-describedby="modalDescription"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Add a review criterion</h5>
                <button type="button" class="close" @click="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div>
                    <div>
                      <div class="form-group">
                        <label for="criterionName">Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="criterionName"
                          v-model="name"
                          placeholder="Enter name for criterion"
                        />
                      </div>

                      <div class="form-group">
                        <label for="criterionTest">Test</label>
                        <input
                          type="text"
                          class="form-control"
                          id="criterionTest"
                          v-model="test"
                          placeholder="Enter name for test"
                        />
                      </div>

                      <hr />
                      <p>Choose the number of questions for the test:</p>
                      <div id="question-area" v-for="question in questionCount" :question="question" :key="question">
                        <div class="form-group" id=question>
                          <input type="text" class="form-control" v-model="questions[question]" placeholder="Enter question" />
                        </div>
                      </div>
                      <button class="btn btn-primary" @click="addTestQuestion">&plus;</button>
                      <button class="btn btn-primary" id="remove-btn" @click="removeTestQuestion">&minus;</button>
                    </div>
                    <button @click="submitResult" class="btn btn-primary" style="float: right;">Submit</button>
                    <button
                      @click="close"
                      class="btn btn-outline-secondary"
                      style="float: right; margin-right: 5px;"
                    >Cancel</button>
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
import swal from 'sweetalert'
import UserService from "../../services/user_service.js";

export default {
  name: "ModalAddReviewCriteria",

  data() {
    return {
        name: '',
        test: '',
        questionCount: [],
        questions: {}
    }
  },

  created() {
      this.questionCount.push(0)
  },

  methods: {
    close() {
      this.$emit('close')
    },

    addTestQuestion(e) {
      e.preventDefault()
      let element = this.questionCount.slice(-1).pop()
      element++
      this.questionCount.push(element)
    },

    removeTestQuestion(e) {
      e.preventDefault()
      this.questionCount.pop()
    },

    submitResult() {
      const payload = {
          criterion: this.name,
          test: this.test,
          questions: this.questions
      }
      
      UserService.addNewReviewCriterion(payload).then(
        response => {
          swal('Criterion added!', 'You just added "' + payload.criterion + '" to the criteria collection =)', 'success', { buttons: false, timer: 3000 });
          console.log(response)
        },
        error => {
          console.log(error.response)
        }
      )
      this.close()
    },
  },
}
</script>