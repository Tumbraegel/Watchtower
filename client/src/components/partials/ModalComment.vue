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
                <h5 class="modal-title">Write a comment</h5>
                <button type="button" class="close" @click="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                <textarea v-model="comment" class="form-control" id="commentTextarea" rows="3"></textarea>
                </div>
                <button class="btn btn-outline-info" style="float:right;" @click="submitComment">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// import UserService from "../../services/user_service.js"

export default {
  name: "ModalComment",
  props:['toBeEdited', 'commentId', 'commentBody', 'user'],

  data() {
    return {
      comment: ''
    };
  },

  async created() {
    this.getExistingCommentText()
  },

  methods: {
    getExistingCommentText() {
      this.comment = this.commentBody
    },

    close() {
      this.$emit('close')
      this.comment = ''
    },

    submitComment() {
      const payload = {
        body: this.comment,
        editStatus: this.toBeEdited,
        commentId: this.commentId,
        filmId: this.$route.params.id,
        updatedAt: Date.now(),
        author: this.user._id,
        upvotes: [],
        downvotes: []
      }

      this.$store.dispatch('film/addComment', payload)
      this.close()
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