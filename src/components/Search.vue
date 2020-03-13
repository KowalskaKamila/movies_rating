<template>
  <form id="app">
    <header>
      <h1>The Top 100 Movies of IMDB</h1>
    </header>
    <div class="search_window">
      <v-text-field
        v-model="searchString"
        solo
        append-icon="search"
        placeholder="Search for movie "
      />
    </div>
    <v-container class="wrapper">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="movie in filteredMovies"
          :key="movie.id"
        >
          <v-expansion-panel-header>
            <a>
              <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path">
            </a>
            <p class="title_width">
              {{ movie.title }}
            </p>
            <v-icon
              medium
              color="#F5BD1F"
            >
              mdi-star
            </v-icon>
            <p>{{ movie.vote_average }}</p>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card>
              <v-img
                height="300px"
                :src="'https://image.tmdb.org/t/p/w500' + movie.backdrop_path"
              />
              <v-card-text>
                <p>{{ movie.overview }}</p>
                <br>
                <p>
                  Premiere:
                  <span style="font-weight:400">{{ formatReleaseDate(movie.release_date) }}</span>
                </p>
                <br>
                <v-icon
                  small
                  color="#F5BD1F"
                  class="padding"
                >
                  mdi-star
                </v-icon>
                <span>
                  <b>{{ movie.vote_average }}/10</b> based on
                  <b>{{ movie.vote_count }}</b> user ratings
                </span>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'Search',

  data: () => ({
    // Search input string provided by a user.
    searchString: '',
  }),

  computed: {
    ...mapState(['movies']),

    // Keeps the movies that matched the searchString.
    filteredMovies() {
      let moviesArray = this.movies;
      let { searchString } = this;

      if (!searchString) {
        return moviesArray;
      }
      searchString = searchString.trim().toLowerCase();

      moviesArray = moviesArray.filter(
        (item) => item.title.toLowerCase().indexOf(searchString) !== -1,
      );
      // Return an array with the filtered data.
      return moviesArray;
    },
  },
  mounted() {
    // Triggers loading movies from the server.
    this.$store.dispatch('loadMovies');
  },

  methods: {
    // Returns formated release date.
    formatReleaseDate(date) {
      return moment(date).format('MMMM Do YYYY');
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900");

#app {
  font-family: "Roboto", sans-serif;
}
header {
  text-align: center;
  margin-top: 20px;
}
.search_window {
  min-width: 280px;
  max-width: 450px;
  margin: 45px auto 20px;
}

.wrapper {
  width: 50%;
  min-width: 380px;
  max-width: 650px;
  margin: 0 auto;
  text-align: left;
}
.wrapper a {
  max-width: 50px;
  height: 60px;
  margin-right: 20px;
}
.wrapper img {
  width: 50px;
  height: 60px;
  float: left;
  border: none;
}
.wrapper p {
  font-weight: bold;
  text-align: left;
}

.title_width {
  width: 363px;
}
.mdi-star {
  padding-bottom: 3px;
  margin-right: 4px;
  max-width: 24px;
}
v-icon {
  text-align: right;
}
</style>
