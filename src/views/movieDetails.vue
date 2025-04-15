<template>
  <div class="movie-details">
    <h1>{{ movie.title }}</h1>
    <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
    <p><strong>Overview:</strong> {{ movie.overview }}</p>

    <div v-if="trailerKey" class="trailer-container">
      <h2>Watch Trailer</h2>
      <iframe
        width="100%"
        height="400"
        :src="`https://www.youtube.com/embed/${trailerKey}`"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
    <button class="btn-style" @click="$router.back()">← Back</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movie: {},
      trailerKey: null,
    };
  },
  mounted() {
    this.fetchMovieDetails();
  },
  methods: {
    fetchMovieDetails() {
      const movieId = this.$route.params.id;
      const apiKey = '81fa4d93749a4108a50c3051bde20be2'; 
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
        .then(response => {
          this.movie = response.data;
        });
 
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`)
        .then(response => {
          const trailers = response.data.results;
          const officialTrailer = trailers.find(v => v.type === 'Trailer' && v.site === 'YouTube');
          this.trailerKey = officialTrailer ? officialTrailer.key : null;
        });
    },
  },
};
</script>

<style scoped>
.movie-details {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 12px;
  background: linear-gradient(to bottom right, #1e1e2f, #2c3e50);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.movie-details h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  color: #f9c922;
}

.movie-details p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 15px;
}

.trailer-container {
  margin-top: 30px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
}

iframe {
  border: none;
  border-radius: 8px;
}

.btn-style {
  display: inline-block;
  margin-top: 30px;
  padding: 10px 25px;
  background-color: #ffffff;
  color: #1e1e2f;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
}

.btn-style:hover {
  background-color: #ffffff;
  transform: scale(1.05);
}

 
 
</style>
