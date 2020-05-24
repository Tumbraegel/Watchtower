<template>
  <div class="film-single">
    <div class="row film-banner">
        <div class="container">
          <h1 class="title">
            {{ film.title }}
          </h1>
          <h2 class="subtitle ">
            {{ film.released }}
          </h2>
            <button class="btn btn-warning" @click="showModal=true">Review</button>
        </div>
    </div>

    <div class="row film-content">
      <div class="container">
        <div class="row">
          <div class="col-md-9">
        <p class=""><strong>Plot: </strong>{{ film.plot }}</p>
        <p class=""><strong>Genre: </strong>{{ film.genres }}</p>
        <p class=""><strong>Cast: </strong>{{ film.actors }}</p>
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

<!--TEMPORARY test modal form-->
  <div v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Rate this movie</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" @click="showModal = false">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div>
                  <p>Choose Indicators</p>
                  <small class="form-text text-muted" style="margin-bottom:15px;">Just go with your gut feeling!</small>
                  </div>
                  <div class="form-group">
                    <label for="myRange1" style="margin-right:90px; color:#4d4d4d;">Diversity</label>
                    <input type="range" min="0" max="10" value="5" class="slider" id="myRange1">
                  </div>
                  <div class="form-group">
                    <label for="myRange2" style="margin-right:20px; color:#4d4d4d;">Queer Friendliness</label>
                    <input type="range" min="0" max="10" value="5" class="slider" id="myRange2">
                  </div>
                  <div class="form-group">
                    <label for="myRange3" style="margin-right:40px; color:#4d4d4d;">Gender Equality</label>
                    <input type="range" min="0" max="10" value="5" class="slider" id="myRange3">
                  </div>
                  <hr>
                  <div style="margin-bottom:25px;">
                    <a href="#">
                      Click here for more detailed review options.
                    </a>
                  </div>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>

  </div>
</template>

<script>
  export default {
    name: 'Film',
    data() {
      return {
        film: {},
        showModal: false
      }
    },
    created() {
    this.getFilmData();
  },
  methods: {
    getFilmData() {
      this.$http.get("/film/" + this.$route.params.id).then(res => {
        this.film = res.data;
      });
  }
  }
  }
</script>

<style lang="scss" scoped>
  .film-banner{
    background-color: #00d1b2;
    color: #fff;
    font-weight: 200;
    line-height: 1.5;
    padding: 20px 0 20px;
    margin-bottom: 30px;
  }
  .film-single {
    margin-top: 30px;
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