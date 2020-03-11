import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)


export default new Vuex.Store({
    state: {
        movies: []
    },
    actions: {
        loadMovies({ commit }) {
            axios
                .get(
                    "https://api.themoviedb.org/3/movie/top_rated?api_key=49151716af6c213927eb153fb51b929f&language=en-US"
                )
                .then(response => {
                    commit('SET_MOVIES', response.data.results)
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    mutations: {
        SET_MOVIES(state, retrieved_movies) {
            state.movies = retrieved_movies
        }
    }
})