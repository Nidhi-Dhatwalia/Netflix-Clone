<template>
  <div class="movie-search-container">
    <h1 class="title">Search for Movies</h1>

   
    <div class="search-bar">
      <input 
        v-model="query" 
        @input="searchMovies" 
        placeholder="Search for a movie" 
        class="search-input"
      />   
     <button class= "btn-style" @click="$router.push({ name: 'Dashboard' })">  Back </button>
    </div>
   
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="movies.length" class="movie-list">
      <ul>
      <li 
  v-for="movie in movies" 
  :key="movie.id" 
  class="movie-item"
  @click="goToMovieDetails(movie.id)"
  style="cursor: pointer"
>

          <img 
            v-if="movie.poster_path" 
            :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`" 
            :alt="movie.title" 
            class="movie-poster" 
          />
          <div class="movie-info">
            <h3 class="movie-title">{{ movie.title }}</h3> 
            <p class="movie-date"><strong>Release Date:</strong> {{ movie.release_date }}</p>
          </div>
        </li>
      </ul>
    </div>

 
    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      query: '',
      movies: [],
      loading: false,
      error: null,
    };
  },
  methods: {
  goToMovieDetails(movieId) {
  this.$router.push({ name: 'movieDetails', params: { id: movieId } });
}
,
    searchMovies() {
      if (this.query.trim() === '') {
        this.movies = []; 
        return;
      }

      this.loading = true;
      this.error = null;

      const apiKey = '81fa4d93749a4108a50c3051bde20be2';
      const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${this.query}&api_key=${apiKey}`;

      axios
        .get(apiUrl)
        .then((response) => {
          this.loading = false;
          if (response.data.results.length) {
            this.movies = response.data.results;
          } else {
            this.movies = [];
            this.error = 'No movies found.';
          }
        })
        .catch((error) => {
          this.loading = false;
          this.error = 'An error occurred while fetching movie data.';
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
 
.movie-search-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  font-size: 2rem;
  color: #fcfcfc;
  margin-bottom: 20px;
}

 
.search-bar {
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  justify-content: center;
}

.search-input {
  width: 50%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  color: white;
}

.search-input:focus {
  border-color: #007bff;
}

.btn-style{
    background-color: rgb(22, 106, 216);
    color: white;
    padding: 10px 30px;
    font-weight: bold;
}
 
.movie-list ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
}

.movie-item {
  width: 23%;
  margin-bottom: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  transition: all 0.3s ease;
  background-color: #fff;
}

.movie-item:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.movie-poster {
  width: 100%;
  border-radius: 5px;
}

.movie-info {
  padding: 10px 0;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: black;
}

.movie-date {
  font-size: 0.9rem;
  color: #131313;
  margin-bottom: 10px;
}

 
.loading {
  text-align: center;
  font-size: 1.5rem;
  color: #007bff;
  font-weight: bold;
  margin-top: 20px;
}

 
.error-message {
  text-align: center;
  color: red;
  font-size: 1.1rem;
  margin-top: 20px;
}
</style>
