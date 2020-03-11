<template>
  <form id="app">
    <div class="search">
      <!-- Create a binding between the searchString model and the text field -->

      <input type="text" v-model="searchString" placeholder="Search movie by title" />
    </div>
    <ul>
      <!-- Render a li element for every entry in the computed filteredMovies array. -->

      <li v-for="movie in filteredMovies" v-bind:key="movie.id">
        <p>{{movie.title}}</p>
      </li>
    </ul>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "Search",

  data: () => ({
    searchString: "",
    movies: [
      // {
      //   title: "What You Need To Know About CSS Variables",
      //   url:
      //     "https://tutorialzine.com/2016/03/what-you-need-to-know-about-css-variables/",
      //   image: "https://tutorialzine.com/media/2016/03/css-variables.jpg"
      // },
      // {
      //   title: "Freebie: 4 Great Looking Pricing Tables",
      //   url:
      //     "https://tutorialzine.com/2016/02/freebie-4-great-looking-pricing-tables/",
      //   image:
      //     "https://tutorialzine.com/media/2016/02/great-looking-pricing-tables.jpg"
      // },
      // {
      //   title: "20 Interesting JavaScript and CSS Libraries for February 2016",
      //   url:
      //     "https://tutorialzine.com/2016/02/20-interesting-javascript-and-css-libraries-for-february-2016/",
      //   image:
      //     "https://tutorialzine.com/media/2016/02/interesting-resources-february.jpg"
      // },
      // {
      //   title: "Quick Tip: The Easiest Way To Make Responsive Headers",
      //   url:
      //     "https://tutorialzine.com/2016/02/quick-tip-easiest-way-to-make-responsive-headers/",
      //   image:
      //     "https://tutorialzine.com/media/2016/02/quick-tip-responsive-headers.png"
      // },
      // {
      //   title: "Learn SQL In 20 Minutes",
      //   url: "https://tutorialzine.com/2016/01/learn-sql-in-20-minutes/",
      //   image: "https://tutorialzine.com/media/2016/01/learn-sql-20-minutes.png"
      // },
      // {
      //   title: "Creating Your First Desktop App With HTML, JS and Electron",
      //   url:
      //     "https://tutorialzine.com/2015/12/creating-your-first-desktop-app-with-html-js-and-electron/",
      //   image:
      //     "https://tutorialzine.com/media/2015/12/creating-your-first-desktop-app-with-electron.png"
      // }
    ]
  }),

  computed: {
    // A computed property that holds only those movies that match the searchString.
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
  },

  mounted() {
    var ref = this;
    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=49151716af6c213927eb153fb51b929f&language=en-US"
      )
      .then(response => {
        ref.movies = response.data.results;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>


<style scoped>
.search {
  background-image: linear-gradient(to bottom right, #1da7da, #00ced9);

  box-shadow: 0 1px 1px #ccc;
  border-radius: 2px;
  width: 400px;
  padding: 14px;
  margin: 45px auto 20px;
  position: relative;
}

.search input {
  background: #fff no-repeat 13px 13px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU5NEY0RTlFMTA4NzExRTM5RTEzQkFBQzMyRjkyQzVBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU5NEY0RTlGMTA4NzExRTM5RTEzQkFBQzMyRjkyQzVBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTk0RjRFOUMxMDg3MTFFMzlFMTNCQUFDMzJGOTJDNUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTk0RjRFOUQxMDg3MTFFMzlFMTNCQUFDMzJGOTJDNUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4DjA/RAAABK0lEQVR42pTSQUdEURjG8dOY0TqmPkGmRcqYD9CmzZAWJRHVRIa0iFYtM6uofYaiEW2SRJtEi9YxIklp07ZkWswu0v/wnByve7vm5ee8M+85zz1jbt9Os+WiGkYdYxjCOx5wgFeXUHmtBSzpcCGa+5BJTCjEP+0nKWAT8xqe4ArPGEEVC1hHEbs2oBwdXkM7mj/JLZrad437sCGHOfUtcziutuYu2v8XUFF/4f6vMK/YgAH1HxkBYV60AR31gxkBYd6xAeF3VzMCwvzOBpypX8V4yuFRzX2d2gD/l5yjH4fYQEnzkj4fae5rJulF2sMXVrAsaTWttRFu4Osb+1jEDT71/ZveyhouTch2fINQL9hKefKjuYFfuznXWzXMTabyrvfyIV3M4vhXgAEAUMs7K0J9UJAAAAAASUVORK5CYII=);
  border: none;
  width: 100%;
  line-height: 19px;
  padding: 11px 0;

  border-radius: 2px;
  box-shadow: 0 2px 8px #c4c4c4 inset;
  text-align: left;
  font-size: 14px;
  font-family: inherit;
  color: #738289;
  font-weight: bold;
  outline: none;
  text-indent: 40px;
}

ul {
  list-style: none;
  width: 428px;
  margin: 0 auto;
  text-align: left;
}
ul li {
  border-bottom: 1px solid #ddd;
  padding: 10px;
  overflow: hidden;
}
ul li img {
  width: 60px;
  height: 60px;
  float: left;
  border: none;
}
ul li p {
  margin-left: 75px;
  font-weight: bold;
  padding-top: 12px;
  color: #6e7a7f;
}
</style>
