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
            // get 100 movies by calling API for 5 pages
            var api_list = [];
            for (let page = 1; page <= 5; page++) {
                let api = "https://api.themoviedb.org/3/movie/top_rated?api_key=49151716af6c213927eb153fb51b929f&language=en-US&page=" + page
                api_list.push(api);
            }
            var movies_list = [];
            for (let api = 0; api < api_list.length; api++) {
                movies_list.push(axios.get(api_list[api]));
            }
            axios
                .all(movies_list)
                .then(
                    //aggregate all the responses into all_movies array
                    axios.spread((...responses) => {
                        var all_movies = [];
                        for (let i = 0; i < responses.length; i++) {
                            var objects = responses[i].data.results
                            for (let j = 0; j < objects.length; j++) {
                                all_movies.push(objects[j])
                            }
                        }
                        commit('SET_MOVIES', all_movies)
                    })
                )
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mutations: {
        SET_MOVIES(state, retrieved_movies) {
            state.movies = retrieved_movies
        }
    }
})