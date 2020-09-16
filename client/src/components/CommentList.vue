<!-- Tutorial https://auth0.com/blog/beginner-vuejs-tutorial-with-user-login -->
<template>
  <div class="comments container">
    <h5>Comments</h5>
    <button class="btn btn-outline-custom" @click="checkifUserLoggedIn('comment')">Write</button>
    <div v-for="comment in commentList" :comment="comment" :key="comment._id">
      <li class="list-group-item list-group-item-outline-primary">
        {{comment.body}}
        <span
          style="float:right;"
        >{{ comment.upvotes.length }} | {{ comment.downvotes.length }}</span>
        <div style="float:right;">

          <button
            @click="voteOnComment('downvote', comment._id)"
            v-if="!comment.downvotes.includes(user._id)"
            class="btn btn-comment-vote"
            style="float: right; margin-right: 5px;"
            ><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
            </svg>
          </button>
          <button
            disabled
            v-if="comment.downvotes.includes(user._id)"
            class="btn btn-comment-disabled"
            style="float: right; margin-right: 5px;"
            ><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
            </svg>
          </button>

          <button
            @click="voteOnComment('upvote', comment._id)"
            v-if="!comment.upvotes.includes(user._id)"
            class="btn btn-comment-vote"
            style="float: right;"
            ><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
            </svg>
          </button>
          <button
            disabled
            v-if="comment.upvotes.includes(user._id)"
            class="btn btn-comment-disabled"
            style="float: right;"
            ><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
            </svg>
          </button>

        </div>
      </li>
      <div>
        <span
          v-if="comment.author == user._id"
          @click="checkifUserLoggedIn('commentEdit', comment._id, comment.body)"
          class="badge badge-light"
          style="cursor: pointer; float:right;"
        >edit</span>
        <span
          v-if="comment.author == user._id"
          @click="checkifUserLoggedIn('commentDelete', comment._id)"
          class="badge badge-light"
          style="cursor: pointer; float:right;"
        >delete</span>
      </div>
      <small style="color: gray; margin-right: 10px;">{{ comment.username }}</small>
      <!-- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString -->
      <small style="color: lightgray">
        ({{ new Date(comment.updatedAt).toLocaleDateString('en-GB', {weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC' }) }}
        {{ new Date(comment.updatedAt).toLocaleTimeString('en-GB') }} )
      </small>
    </div>

    <modal
      :toBeEdited="toBeEdited"
      :commentId="commentId"
      :commentBody="commentBody"
      :user="user"
      v-show="isModalVisible"
      @close="closeModal()"
    />

  </div>
</template>

<script>
import swal from 'sweetalert'
import { mapState, mapActions } from 'vuex'
import UserService from '../services/user_service.js'
import Modal from '../components/partials/ModalComment'

export default {
  name: "CommentList",

  components: {
    Modal
  },

  data() {
    return {
      commentId: "",
      commentBody: "",
      user: {},
      isModalVisible: false,
      toBeEdited: false,
    }
  },

  created() {
    if(this.$store.state.auth.status.loggedIn == true) this.getUserInformation()
  },

  computed: {
    ...mapState('film', ['commentList']),
    
    currentUser() {
      return this.$store.state.auth.user
    }
  },

  methods: {
    ...mapActions('film', ['voteForComment', 'deleteComment']),

    async getUserInformation() {
      await UserService.getUserProfile().then(
        (response) => {
          this.user = response.data
        },
        (error) => {
          this.user =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      )
    },

    checkifUserLoggedIn(modal, commentId, commentBody) {
      if (this.currentUser && modal == "comment")
        this.showModal("comment")
      else if (!this.currentUser && modal == "comment")
        swal("", "You need to be signed in to leave a comment!", "warning", {
          buttons: false,
          timer: 2000,
        })
      else if (this.currentUser && modal == "commentEdit")
        this.showModal("commentEdit", commentId, commentBody)
      else if (this.currentUser && modal == "commentDelete") {
        this.removeComment(commentId)
      }
    },

    showModal(modal, commentId, commentBody) {
      if (modal == "comment") this.isModalVisible = true
      else if (modal == "commentEdit") {
        this.isModalVisible = true
        this.toBeEdited = true
        this.commentId = commentId
        this.commentBody = commentBody
      }
    },

    closeModal() {
        this.isModalVisible = false;
        this.toBeEdited = false;
    },

    voteOnComment(type, commentId) {
      if(this.currentUser) {
        const id = this.$route.params.id
        const payload = {
          filmId: id,
          commentId: commentId,
          vote: type,
        }

        this.voteForComment(payload).then(
          (response) => {
            console.log(response)
          },
          (error) => {
            console.log(error.response)
          }
        )
      } else {
        swal("", "You need to be signed in to vote on a comment!", "warning", {
          buttons: false,
          timer: 2000,
        })
      }

    },

    removeComment(id) {
      const filmId = this.$route.params.id

      const payload = {
        filmId: filmId,
        commentId: id
      }

      swal({
        title: 'Delete this comment?',
        text: 'Are you sure? You won\'t be able to revert this!',
        icon: 'warning',
        buttons: true,
      }).then((confirmed) => {
          if (confirmed) {
            this.deleteComment(payload)
      }})
    }
  }
}
</script>

<style scoped>
.btn-outline-custom {
  border-color: #5d5dd5;
  color: #5d5dd5
}

.btn-outline-custom:hover {
  border-color: #5d5dd5;
  background-color: #5d5dd5;
  color: whitesmoke
}

.btn-comment-vote {
  color: purple;
  border-radius: 50px;
  border-color: purple;
  padding: 1px 8px 1px 8px;
  font-size: 13px;
}

.btn-comment-vote:hover {
  background-color: purple;
  color: whitesmoke;
}

.btn-comment-disabled {
  color: gray;
  border-radius: 50px;
  border-color: gray;
  padding: 1px 8px 1px 8px;
  font-size: 13px;
}
</style>