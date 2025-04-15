<template>
  <div class="container">
    <div class="genre-header">
      <h2 class="movies-heading">Movies for {{ genreName }}</h2>
      <button class="back-button" @click="$router.push({ name: 'categoriesPage' })">⬅ Back</button>
    </div>

    <div v-if="loading" class="loading">Loading movies...</div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="movies.length === 0 && !loading" class="no-movies">No movies found.</div>
 
    <div class="movie-grid">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img
          :src="getMoviePosterUrl(movie.poster_path)"
          alt="Movie Poster"
          class="movie-poster"
        />
        <div class="movie-details">
          <h3 class="movie-title">{{ movie.title }}</h3>
          <p class="release-date">Release Date: {{ movie.release_date }}</p>

          <div class="movie-actions">
            <button @click="watchTrailer(movie.id)">🎬 Watch Trailer</button>
            <button
              :disabled="isInWatchlist(movie.id)"
              :class="isInWatchlist(movie.id) ? 'in-watchlist' : 'add-watchlist'"
              @click="toggleWatchlist(movie)"
            >
              {{ isInWatchlist(movie.id) ? '✓ In Watchlist' : '+ Add to Watchlist' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showVideo" class="video-player-overlay">
      <div class="video-container">
        <iframe
          v-if="videoUrl"
          :src="videoUrl"
          frameborder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        ></iframe>
        <button @click="closeVideo" class="close-video-button">❌ Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movies: [],
      loading: true,
      error: null,
      genreId: null,
      genreName: '',
      watchlist: [],
      showVideo: false,
      videoUrl: '',
    };
  },
  mounted() {
    this.genreId = this.$route.params.id;
    this.genreName = this.$route.params.name;
    this.fetchMovies();
    this.loadWatchlist();
  },
  methods: {
    async fetchMovies() {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${this.genreId}&api_key=81fa4d93749a4108a50c3051bde20be2`
        );
        this.movies = res.data.results;
        this.loading = false;
      } catch (err) {
        this.error = err.message;
        this.loading = false;
      }
    },
    getMoviePosterUrl(posterPath) {
      return posterPath
        ? `https://image.tmdb.org/t/p/w500${posterPath}`
        : 'https://via.placeholder.com/500x750?text=No+Image';
    },
    async watchTrailer(movieId) {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=81fa4d93749a4108a50c3051bde20be2`
        );
        const trailers = res.data.results.filter(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailers.length > 0) {
          this.videoUrl = `https://www.youtube.com/embed/${trailers[0].key}?autoplay=1`;
          this.showVideo = true;
        } else {
          alert('Trailer not available');
        }
      } catch (err) {
        alert('Failed to fetch trailer');
      }
    },
    closeVideo() {
      this.showVideo = false;
      this.videoUrl = '';
    },
    loadWatchlist() {
      const stored = localStorage.getItem('watchlist');
      this.watchlist = stored ? JSON.parse(stored) : [];
    },
    saveWatchlist() {
      localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
    },
    toggleWatchlist(movie) {
      const exists = this.watchlist.find(m => m.id === movie.id);
      if (exists) {
        this.watchlist = this.watchlist.filter(m => m.id !== movie.id);
      } else {
        this.watchlist.push(movie);
      }
      this.saveWatchlist();
    },
    isInWatchlist(movieId) {
      return this.watchlist.some(m => m.id === movieId);
    },
  },
};
</script>
<style scoped>
.container {
  padding: 30px;
  max-width: 1200px;
  margin: auto;
}
.genre-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.movies-heading {
  font-size: 2rem;
  font-weight: bold;
  color: white;
}
.back-button {
  padding: 8px 16px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.back-button:hover {
  background-color: #555;
}
.loading,
.error-message,
.no-movies {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 20px;
  color: white;
}

 
.movie-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.movie-card {
  width: 200px;
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 10px;
  transition: transform 0.2s;
}
.movie-card:hover {
  transform: scale(1.05);
}

.movie-poster {
  width: 100%;
  height: 280px;
  border-radius: 8px;
  object-fit: cover;
}
.movie-title {
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  color: white;
  text-align: center;
}
.release-date {
  font-size: 13px;
  color: #aaa;
  text-align: center;
}
.movie-actions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;
}
.movie-actions button {
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
}
.add-watchlist {
  background-color: #e50914;
  color: white;
}
.add-watchlist:hover {
  background-color: #b00710;
}
.in-watchlist {
  background-color: gray;
  color: white;
  cursor: default;
}

.video-player-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.video-container {
  position: relative;
  width: 80%;
  max-width: 900px;
  height: 500px;
  background-color: #000;
  border-radius: 12px;
  overflow: hidden;
}
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
.close-video-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  padding: 8px;
  cursor: pointer;
}
.close-video-button:hover {
  background-color: rgba(255, 0, 0, 1);
}
</style>