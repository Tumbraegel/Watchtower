<template>
  <div class="container-fluid">
    <div class="banner-border">
    <header class="banner-image">
      <div class="h-100">
        <div class="row h-100 align-items-center">
          <div class="col-11 banner-text">
            <h1 class="font-weight-light">
              {{ film.title }} ({{ film.year }})
              <svg
                width="0.5em"
                height="0.5em"
                viewBox="0 0 16 16"
                class="bi bi-heart favourite_icon"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                />
              </svg>
            </h1>
            <div class="row">
              <div class="lead col-9" v-if="currentUserRating != 0">
                Your score: {{ currentUserRating }}
                </div>
                <div class="lead col-4">
                  <button
                  v-if="currentUserRating != 0"
                  class="btn btn-custom"
                  @click="checkifUserLoggedIn()"
                >
                  Review again
                </button>
                <button
                  v-else
                  class="btn btn-custom"
                  @click="checkifUserLoggedIn()"
                >
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    </div>

    <div class="row film-content" style="margin: 40px 0px 30px 0px;">
          <div class="col-md-1"></div>
          <div class="col-md-7">
            <p v-if="film.overallRating != 0">
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
            <div class="col-md-7">
              <chart-item v-if="dataLoaded" />
            </div>
          </div>

          <div class="col-md-4">
            <div style="margin: auto">
              <img v-if="film.poster=='N/A'" src="../assets/film-placeholder.jpg" :alt="film.title" class="placeholder-img"/>
              <img v-else :src="film.poster" :alt="film.title" />
            </div>
            <div style="padding-top: 20px">
              <comment-list />
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
  name: 'Film',
  components: {
    CommentList,
    ModalReview,
    ChartItem
  },

  data() {
    return {
      isModalVisible: false,
      dataLoaded: false,
      user: {}
    }
  },

  computed: {
    ...mapState('film', [
      'film',
      'chartData'
    ]),

    currentUser() {
      return this.$store.state.auth.user
    },

    currentUserRating() {
      let userScore = 0
      if (this.user.reviews != undefined) {
        const userReviewForThisFilm = this.user.reviews.filter(
          review => review.film._id == this.film._id
        )
        if (userReviewForThisFilm.length)
          userScore = userReviewForThisFilm[0].rating
      }
      return userScore
    }
  },

  async created() {
    await this.fetchFilmContext(this.$route.params.id).then(async () => {
      await this.fetchReviewCriteriaContext()
      if (this.chartData != undefined) this.dataLoaded = true
      if (this.$store.state.auth.status.loggedIn == true) await this.getUserInformation()
    })
  },

  methods: {
    ...mapActions('film', ['fetchFilmContext', 'fetchReviewCriteriaContext', 'deleteComment']),

    checkifUserLoggedIn() {
      if (this.currentUser) this.showModal()
      else
        swal('', 'You need to be signed in to review a film!', 'warning', {
          buttons: false,
          timer: 2000
        })
    },

    async getUserInformation() {
      await UserService.getUserProfile().then(
        response => {
          this.user = response.data
        },
        error => {
          this.user =
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        }
      )
    },

    showModal() {
      this.isModalVisible = true
    },

    async closeModal() {
      this.isModalVisible = false
      this.dataLoaded = false
      await this.fetchFilmContext(this.$route.params.id).then(async () => {
        this.dataLoaded = true
        if (this.currentUser) await this.getUserInformation()
      })
    }
  }
}
</script>

<style scoped>
.banner-image {
  height: 200px;
  min-height: 200px;
  background-image: url('../assets/background_2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transform: scaleX(-1);
}

.banner-text {
  transform: scaleX(-1);
  color: white;
  text-shadow: 0.07em 0 black, 0 0.07em black, -0.07em 0 black, 0 -0.07em black;
}

.btn-custom {
  border-color: #06a797;
  background-color: #06a797;
  color: whitesmoke;
  transition-duration: 0.4s;
}

.btn-custom:hover {
  border-color: #07c5b2;
  background-color: #07c5b2;
  color: whitesmoke;
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

.favourite_icon:hover {
  color: crimson;
  cursor: pointer;
}

.placeholder-img {
  height: 450px;
  width: 300px;
}
</style>
