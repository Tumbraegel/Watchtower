<!-- Tutorial https://auth0.com/blog/beginner-vuejs-tutorial-with-user-login -->
<template>
  <div class="films container">
    <h2>Film List</h2>
    <div class="row row-cols-1 row-cols-md-3">
        <div v-for="film in films" :film="film" :key="film.id" class="col mb-4">
          <router-link :to="'/film/' + film.id">
            <FilmCard :film="film" />
           </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import FilmCard from '@/components/partials/FilmCard';
export default {
  name: 'FilmList',
  components : {
    FilmCard
  },
  data () {
    return {
      film: {},
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
      ]
    }  
  }
}
</script>

<style scoped>
  .films {
    margin-top: 100px;
    text-align: center;
  }
</style>