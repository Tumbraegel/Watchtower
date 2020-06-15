<template>
  <div class="film-single">
    <div class="row film-banner">
        <div class="container">
          <h1 class="title">
            {{ film.title }} ({{ film.year }})
          </h1>
            <button class="btn btn-custom" @click="checkifUserLoggedIn()">Review</button>
        </div>
    </div>

    <div class="row film-content">
      <div class="container">
        <div class="row">
          <div class="col-md-9">
        <p class=""><strong>Plot: </strong>{{ film.plot }}</p>
        <p class=""><strong>Genre: </strong>{{ film.genres }}</p>
        <p class=""><strong>Directors: </strong>{{ film.directors }}</p>
        <p class=""><strong>Cast: </strong>{{ film.actors }}</p>
        <p class=""><strong>Language: </strong>{{ film.language }}</p>
        <p class=""><strong>Rated: </strong>{{ film.rated }}</p>
        <p class=""><strong>Awards: </strong>{{ film.awards }}</p>
        </div>
          <div class="col-md-2">
            <img :src=film.poster :alt=film.title>
          </div>
          <div class="comment-section" style="margin-top:30px;">
            <h4>Comments</h4>
          <div class="row">
            <div class="col-12">
              <li class="list-group-item list-group-item-outline-primary">
                This movie was awesome! There's a lot of ........ <b>+1</b> | <b>-1</b>
              </li>
                <li class="list-group-item list-group-item-outline-primary">
                I didn't really like this movie because .... <b>+1</b> | <b>-1</b>
              </li>
              <br>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>

  <modal v-show="isModalVisible" @close="closeReviewModal"/>

  </div>
</template>

<script>
// https://alligator.io/vuejs/vue-jwt-patterns/
import Modal from '../components/partials/ModalReview';

export default {
  name: 'Film',
  components: {
      Modal
    },
  
  data() {
    return {
      film: {},
      isModalVisible: false,
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
    created() {
    this.getFilmData();
    },

  methods: {
    checkifUserLoggedIn() {
      if(this.currentUser) {
        this.showReviewModal();
      }
      else alert("You need to be signed in to review a film!");
    },

    getFilmData() {
      this.$http.get("/film/" + this.$route.params.id).then(res => {
        this.film = res.data[0];
        this.jwt = res.text;
      });
  },

    showReviewModal() {
        this.isModalVisible = true;
      },
    
    closeReviewModal() {
        this.isModalVisible = false;
      },
  }
}
</script>

<style scoped>
  .film-banner{
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
    border-color: #06A797;
    background-color: #06A797;
    color: whitesmoke;
    transition-duration: 0.4s;
  }

  .btn-custom:hover {
    border-color: #06A797;
    background-color: #4d4d4d;
    color: #06A797;
  }

  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>