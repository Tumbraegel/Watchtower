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
                <h5 class="modal-title">Add a film to the collection</h5>
                <button type="button" class="close" @click="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div>
                  <p>Use the film's IMDb id to add it to the database:</p>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          id="imdbID"
                          v-model="imdbID"
                          placeholder="Enter id"
                        />
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
import UserService from '../../services/user_service'

export default {
  name: "ModalAddAdmin",

  data() {
    return {
        imdbID: '',
    }
  },

  methods: {
    close() {
      this.$emit('close')
    },

    submitResult() {
      const payload = {
        imdbID: this.imdbID
      }

      UserService.addFilm(this.imdbID, payload).then(
        response => {
          swal('Film added!', 'The film was successfully stored in the database.', 'success', { buttons: false, timer: 2500 })
          console.log(response)
        },
        error => {
           swal('Oops, something went wrong :(', 'There was an error trying to add the film. Check if it perhaps already exists on the platform.', 'error', { buttons: true })
          console.log(error.response)
        }
      )
      this.imdbID = ''
      this.close()
    },
  },
}
</script>