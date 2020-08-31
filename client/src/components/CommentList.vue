<!-- Tutorial https://auth0.com/blog/beginner-vuejs-tutorial-with-user-login -->
<template>
  <div class="comments container">
    <h5>Comments</h5>
    <button class="btn btn-outline-warning" @click="checkifUserLoggedIn('comment')">Write</button>
    <div v-for="comment in commentList" :comment="comment" :key="comment._id">
      <li class="list-group-item list-group-item-outline-primary">
        {{comment.body}}
        <span
          style="float:right;"
        >{{ comment.upvotes.length }} | {{ comment.downvotes.length }}</span>
        <div style="float:right;">
          <button
            @click="voteForComment('downvote', comment._id)"
            v-if="!comment.downvotes.includes(user._id)"
            class="btn btn-comment-vote"
            style="float: right; margin-right: 5px;"
          >&#8595;</button>
          <button
            disabled
            v-if="comment.downvotes.includes(user._id)"
            class="btn btn-comment-disabled"
            style="float: right; margin-right: 5px;"
          >&#8595;</button>
          <button
            @click="voteForComment('upvote', comment._id)"
            v-if="!comment.upvotes.includes(user._id)"
            class="btn btn-comment-vote"
            style="float: right;"
          >&#8593;</button>
          <button
            disabled
            v-if="comment.upvotes.includes(user._id)"
            class="btn btn-comment-disabled"
            style="float: right;"
          >&#8593;</button>
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
import { mapState } from 'vuex'
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
        this.deleteComment(commentId)
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

    voteForComment(type, comment_id) {
      if(this.currentUser) {
        const id = this.$route.params.id
        const payload = {
          comment_id: comment_id,
          vote: type,
        };

        console.log(type);
        console.log(comment_id);
        UserService.postCommentVote(payload, id).then(
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

    deleteComment(id) {
      swal({
        title: 'Delete this comment?',
        text: 'Are you sure? You won\'t be able to revert this!',
        icon: 'warning',
        buttons: true,
      }).then((confirmed) => {
          if (confirmed) {
            this.$store.dispatch('film/deleteComment', id)
      }})
    }
  }
}
</script>

<style scoped>
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