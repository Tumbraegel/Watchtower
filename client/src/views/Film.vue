<template>
  <div class="film-single">
    <div class="row film-banner">
      <div class="container">
        <div class="row">
        <h1 class="title col-md-9" style="padding: 0px">{{ film.title }} ({{ film.year }})</h1>
        <p class="col-md-3" v-if="userScoreForThisFilm != ''">Your score: {{ userScoreForThisFilm }}</p>
      </div>
      <div class="row">
        <button v-if="userScoreForThisFilm != ''" style="float: right;" class="btn btn-custom col-md-3" @click="checkifUserLoggedIn()">Review again</button>
        <button v-else style="float: right;" class="btn btn-custom col-md-2" @click="checkifUserLoggedIn()">Review</button>
        <div style="margin-left: 10px; vertical-align: middle;" class="favourite-button">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg>
        </div>
      </div>
      </div>
    </div>

    <div class="row film-content" style="margin-bottom: 30px;">
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <p v-if="film.overallRating != null">
              <strong>Rating:</strong>
              {{ film.overallRating }}
            </p>
            <p v-else>
              <strong>Rating:</strong>
              TBD
            </p>
            <p>
              <strong>Plot:</strong>
              {{ film.plot }}
            </p>
            <p>
              <strong>Genre:</strong>
              {{ film.genres }}
            </p>
            <p>
              <strong>Directors:</strong>
              {{ film.directors }}
            </p>
            <p>
              <strong>Cast:</strong>
              {{ film.actors }}
            </p>
            <p>
              <strong>Language:</strong>
              {{ film.language }}
            </p>
            <p>
              <strong>Rated:</strong>
              {{ film.rated }}
            </p>
            <p>
              <strong>Awards:</strong>
              {{ film.awards }}
            </p>
            <div>
            <chart-item v-if="dataLoaded" />
          </div>
          </div>
          
          <div class="col-md-4">
            <div style="margin: auto">
              <img :src="film.poster" :alt="film.title" />
            </div>
            <div style="margin: auto; padding-top: 20px">
                <comment-list :commentList="commentList"></comment-list>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal-review v-show="isModalVisible" @close="closeModal()" />

  </div>
</template>

<script>
import CommentList from '../components/CommentList'
import ModalReview from '../components/partials/ModalReview'
import UserService from '../services/user_service.js'
import ChartItem from '../components/partials/Chart'
import swal from 'sweetalert'
import { mapState, mapActions } from 'vuex'

export default {
  name: "Film",
  components: {
    CommentList,
    ModalReview,
    ChartItem,
  },

  data() {
    return {
      film: {},
      reviews: [],
      isModalVisible: false,
      toBeEdited: false,
      userScoreForThisFilm: '',
      dataLoaded: false,
      user: {}
    }
  },

  computed: {
    ...mapState('film', ['filmContext', 'reviewList', 'commentList']),

    currentUser() {
      return this.$store.state.auth.user
    }
  },

  async created() {
    await this.getFilmData().then(() => {
      if(this.reviewList.length) this.dataLoaded = true
      if(this.$store.state.auth.status.loggedIn == true) this.getUserInformation()
    }) 
  },

  methods: {
    ...mapActions('film', ['fetchFilmContext', 'deleteComment']),

    getFilmData() {
      const filmInformation = this.fetchFilmContext(this.$route.params.id).then(() => {
        this.film = this.filmContext
        this.reviews = this.reviewList
      })
      if(this.reviews.length) this.reviewsPopulated = true
      return filmInformation
    },

    checkifUserLoggedIn() {
      if (this.currentUser) this.showModal()
      else
        swal("", "You need to be signed in to review a film!", "warning", {
          buttons: false,
          timer: 2000,
        })
    },

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
      ).then(() => { this.getExistingUserRating(this.user) })
    },

    getExistingUserRating(user) {
      const userReviewForThisFilm = (user.reviews).filter(review => review.film._id == this.film._id)
      if(userReviewForThisFilm.length) this.userScoreForThisFilm = userReviewForThisFilm[0].rating
    },

    showModal() {
      this.isModalVisible = true
    },

    closeModal() {
      this.isModalVisible = false
    }
  }
}
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

.favourite-button:hover {
  
}
</style>