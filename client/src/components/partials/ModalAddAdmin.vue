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
                <h5 class="modal-title">Give someone admin rights:</h5>
                <button
                  type="button"
                  class="close"
                  @click="close"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div>
                  <div>
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="username"
                        v-model="username"
                        placeholder="Enter username"
                      />
                    </div>
                  </div>
                  <button
                    @click="submitResult"
                    class="btn btn-primary"
                    style="float: right;"
                  >
                    Submit
                  </button>
                  <button
                    @click="close"
                    class="btn btn-outline-secondary"
                    style="float: right; margin-right: 5px;"
                  >
                    Cancel
                  </button>
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
import UserService from '../../services/user_service.js'

export default {
  name: 'ModalAddAdmin',

  data() {
    return {
      username: ''
    }
  },

  methods: {
    close() {
      this.$emit('close')
    },

    submitResult() {
      const payload = {
        username: this.username
      }

      UserService.addNewAdminUser(payload).then(
        () => {
            swal(
              'Admin added!',
              'You just made ' + payload.username + ' an admin.',
              'success',
              { buttons: false, timer: 2500 }
            )
          }).catch(() => {
          swal(
            'That didn\'t work :(',
            'Something went wrong. Check if this user actually exists.',
            'error',
            { buttons: true }
          )
        })
      this.username = ''
      this.close()
    }
  }
}
</script>
