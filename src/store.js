import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex);
Vue.use(VueAxios, axios);


export default new Vuex.Store({
  state: {
    // Array for storing all the retrived movies from API call.
    movies: [],
  },
  actions: {
    loadMovies({ commit }) {
      // Each API call returns 1 page with 20 movies, to get 100 movies we need to call API
      // for 5 pages.
      const moviesList = [];
      const api = 'https://api.themoviedb.org/3/movie/top_rated?api_key=49151716af6c213927eb153fb51b929f&language=en-US&page=';
      for (let page = 1; page < 5; page += 1) {
        moviesList.push(axios.get(api + page));
      }
      axios
        .all(moviesList)
        .then(
          // Aggregate all the responses into allMovies array.
          axios.spread((...responses) => {
            const allMovies = [];
            for (let i = 0; i < responses.length; i += 1) {
              const objects = responses[i].data.results;
              for (let j = 0; j < objects.length; j += 1) {
                allMovies.push(objects[j]);
              }
            }
            commit('SET_MOVIES', allMovies);
          }),
        )
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },
  },
  mutations: {
    SET_MOVIES(state, retrievedMovies) {
      // eslint-disable-next-line no-param-reassign
      state.movies = retrievedMovies;
    },
  },
});
