<template>
  <div class="film-single">
    <div class="row film-banner">
      <div class="container">
        <h1 class="title">{{ film.title }} ({{ film.year }})</h1>
        <button class="btn btn-custom" @click="checkifUserLoggedIn('review')">Review</button>
      </div>
    </div>

    <div class="row film-content" style="margin-bottom: 30px;">
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <p class>
              <strong>Score:</strong>
              {{ film.overallRating }}
            </p>
            <p class>
              <strong>Plot:</strong>
              {{ film.plot }} 
            </p>
            <p class>
              <strong>Genre:</strong>
              {{ film.genres }}
            </p>
            <p class>
              <strong>Directors:</strong>
              {{ film.directors }}
            </p>
            <p class>
              <strong>Cast:</strong>
              {{ film.actors }}
            </p>
            <p class>
              <strong>Language:</strong>
              {{ film.language }}
            </p>
            <p class>
              <strong>Rated:</strong>
              {{ film.rated }}
            </p>
            <p class>
              <strong>Awards:</strong>
              {{ film.awards }}
            </p>
            
            <div class="comment-section" style="margin-top:100px;">  
            <h5>Comments</h5>
            <div class="row">
              <div class="col-11">
                <button
                  class="btn btn-outline-warning"
                  @click="checkifUserLoggedIn('comment')"
                >Write</button>
                <p>{{ comments.body }}</p>
                <div v-for="comment in comments" :comment="comment" :key="comment._id">
                  <li class="list-group-item list-group-item-outline-primary">
                    {{comment.body}} | {{ comment.upvotes.length }} | {{ comment.downvotes.length }}
                    <button @click="voteForComment('upvote', comment._id)" v-if="!comment.upvotes.includes(user._id)" class="btn btn-comment-vote" style="float: right; margin-right: 5px;">&#8595;</button>
                    <button disabled v-if="comment.upvotes.includes(user._id)" class="btn btn-comment-disabled" style="float: right; margin-right: 5px;">&#8595;</button>
                    <button @click="voteForComment('downvote', comment._id)" v-if="!comment.downvotes.includes(user._id)" class="btn btn-comment-vote" style="float: right;">&#8593;</button>
                    <button disabled v-if="comment.downvotes.includes(user._id)" class="btn btn-comment-disabled" style="float: right;">&#8593;</button>
                  </li>
                  <span
                    @click="checkifUserLoggedIn('commentEdit', comment._id, comment.body)"
                    class="badge badge-light"
                    style="cursor: pointer; float:right;"
                  >edit</span>
                  <span
                    @click="checkifUserLoggedIn('commentDelete', comment._id)"
                    class="badge badge-light"
                    style="cursor: pointer; float:right;"
                  >delete</span>
                  <small style="color: gray; margin-right: 10px;">{{ comment.username }}</small>
                  <!-- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString -->
                  <small style="color: lightgray">({{ new Date(comment.updatedAt).toLocaleDateString('en-GB', {weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC' }) }} 
                    {{ new Date(comment.updatedAt).toLocaleTimeString('en-GB') }} )</small>
                </div>
                <br />
              </div>
            </div>

          </div>
          </div>
          <div class="col-md-3">
            <div style="margin: auto; width: 50%;">
              <img :src="film.poster" :alt="film.title" />
            </div>
            <div style="margin: auto; width: 80%;">
              <chart-item :filmId="filmId"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal-review v-show="isModalVisible" @close="closeModal('review')" />
    <modal-comment :toBeEdited="toBeEdited" :commentId="commentId" :commentBody="commentBody" v-show="isModalCommentVisible" @close="closeModal('comment')" />
  </div>
</template>

<script>
import ModalReview from "../components/partials/ModalReview";
import ModalComment from "../components/partials/ModalComment";
import UserService from "../services/user_service.js";
import ChartItem from '../components/partials/Chart';

export default {
  name: "Film",
  components: {
    ModalReview,
    ModalComment,
    ChartItem
  },

  data() {
    return {
      film: {},
      filmId: this.$route.params.id,
      comments: [],
      commentId: '',
      commentBody: '',
      reviews: [],
      isModalVisible: false,
      isModalCommentVisible: false,
      toBeEdited: false,
      user: {}
    };
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },

  async created() {
    await this.getFilmData();
    this.getUserInformation();
  },

  methods: {
    checkifUserLoggedIn(modal, commentId, commentBody) {
      if (this.currentUser && modal == "review") {
        this.showModal("review");
      } else if (this.currentUser && modal == "comment") {
        this.showModal("comment");
      } else if (this.currentUser && modal == "commentEdit") {
        this.showModal("commentEdit", commentId, commentBody);
      } 
      else if (this.currentUser && modal == "commentDelete") {
        this.deleteComment(commentId);
      }
      else alert("You need to be signed in to review a film!");
    },

    async getUserInformation() {
      await UserService.getUserProfile().then(
        response => {
          this.user = response.data;
        },
        error => {
          this.user =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },

    async getFilmData() {
      await this.$http.get("/film/" + this.$route.params.id).then(res => {
        this.film = res.data[0];
        this.comments = res.data[1].comments;
        this.reviews = res.data[2].reviews;
      });

      await this.$store.dispatch('film/fetchReviews', this.reviews);
      this.$store.dispatch('film/fetchFilmContext', this.film);
    },

    showModal(modal, commentId, commentBody) {
      if (modal == "review") this.isModalVisible = true;
      else if (modal == "comment") this.isModalCommentVisible = true;
      else if (modal == "commentEdit") {
        this.isModalCommentVisible = true;
        this.toBeEdited = true;
        this.commentId = commentId;
        this.commentBody = commentBody;
      }
    },

    closeModal(modal) {
      if (modal == "review") this.isModalVisible = false;
      else if (modal == "comment" || modal == "commentEdit") {
        this.isModalCommentVisible = false;
        this.toBeEdited = false;
      }
    },

    voteForComment(type, comment_id) {
      const id = this.$route.params.id;

      const payload = {
        comment_id: comment_id,
        vote: type
      };

      console.log(type);
      console.log(comment_id);
      UserService.postCommentVote(payload, id).then(
        response => {
          console.log(response);
        },
        error => {
          console.log(error.response);
        }
      );
    },

    deleteComment(id) {
      UserService.deleteComment(id).then(
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
.film-banner {
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
  border-color: #06a797;
  background-color: #06a797;
  color: whitesmoke;
  transition-duration: 0.4s;
}

.btn-custom:hover {
  border-color: #06a797;
  background-color: #4d4d4d;
  color: #06a797;
}

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