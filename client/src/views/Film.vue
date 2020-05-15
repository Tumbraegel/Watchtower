<template>
  <div class="film-single">
    <section class="film-banner">
        <div class="container">
          <h1 class="title">
            {{ film.title }}
          </h1>
          <h2 class="subtitle ">
            {{ film.release }}
          </h2>
        </div>
    </section>
    <section class="film-content">
      <div class="container">
        <p class="description">Film description</p>
        <p class=""><strong>Plot: </strong>{{ film.description }}</p>
        <p class=""><strong>Genre: </strong>{{ film.genre }}</p>
        <p class=""><strong>Cast: </strong>{{ film.cast }}</p>
        <div class="film-image">
          <div class="">
            {{ film.image }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Film',
    data() {
      return {
        films: [
          {
          id: 1,
          title: 'Parasite',
          genre: 'Comedy, Drama, Thriller',
          description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
          release: '2019',
          duration: '2h 12min',
          cast: 'Song Kangho, Park Sodam, Choi Wooshik, Cho Yeojeong, Lee Sunkyun, Lee Jungeun',
          image: 'https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png'
        },
        {
          id: 2,
          title: 'Portrait of a Lady on Fire',
          genre: 'Drama, Romance',
          description: 'On an isolated island in Brittany at the end of the eighteenth century, a female painter is obliged to paint a wedding portrait of a young woman. ',
          release: '2019',
          duration: '2h 02min',
          cast: ' Noémie Merlant, Adèle Haenel, Luàna Bajrami',
          image: 'https://upload.wikimedia.org/wikipedia/en/c/cb/Portrait_of_a_Lady_on_Fire.jpg'
        },
        {
          id: 3,
          title: 'Black Panther',
          genre: 'Action, Adventure, Sci-Fi',
          description: 'T\'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country\'s past.',
          release: '2018',
          duration: '2h 14min',
          cast: 'Chadwick Boseman, Michael B. Jordan, Lupita Nyong\'o',
          image: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Black_Panther_film_poster.jpg'
        }
        ],
        film: {}
      }
    },
    created() {
    const ID = Number(this.$route.params.id);
    let film = this.films.find(film => film.id === ID);
    this.film = film;
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
  .film-image {
    margin-top: 50px;
  }
  .description {
    margin-bottom: 30px;
  }
</style>