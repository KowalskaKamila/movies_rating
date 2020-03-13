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
      ></v-text-field>
    </div>
    <v-container class="wrapper">
      <v-expansion-panels>
        <v-expansion-panel v-for="movie in filteredMovies" v-bind:key="movie.id">
          <v-expansion-panel-header>
            <a>
              <img v-bind:src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" />
            </a>
            <p class="title_width">{{movie.title}}</p>
            <v-icon medium color="#F5BD1F">mdi-star</v-icon>
            <p>{{movie.vote_average}}</p>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card>
              <v-img
                height="300px"
                v-bind:src="'https://image.tmdb.org/t/p/w500' + movie.backdrop_path"
              ></v-img>
              <v-card-text>
                <p>{{movie.overview}}</p>
                <br />
                <p>
                  Premiere:
                  <span
                    style="font-weight:400"
                  >{{ moment(movie.release_date).format('MMMM Do YYYY') }}</span>
                </p>
                <br />
                <v-icon small color="#F5BD1F" class="padding">mdi-star</v-icon>
                <span>
                  <b>{{movie.vote_average}}/10</b> based on
                  <b>{{movie.vote_count}}</b> user ratings
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
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "Search",

  data: () => ({
    searchString: ""
  }),

  methods: {
    moment: function(date) {
      return moment(date);
    },
    date: function(date) {
      return moment(date).format("MMMM Do YYYY");
    }
  },
  filters: {
    moment: function(date) {
      return moment(date).format("MMMM Do YYYY");
    }
  },

  mounted() {
    this.$store.dispatch("loadMovies");
  },
  computed: {
    ...mapState(["movies"]),
    filteredMovies: function() {
      var movies_array = this.movies,
        searchString = this.searchString;

      if (!searchString) {
        return movies_array;
      }
      searchString = searchString.trim().toLowerCase();

      movies_array = movies_array.filter(function(item) {
        if (item.title.toLowerCase().indexOf(searchString) !== -1) {
          return item;
        }
      });
      // Return an array with the filtered data.
      return movies_array;
    }
  }
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
