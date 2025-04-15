<template>
  <div class="container">
    <div class="main-container">
      <h1 class="heading"> Your Watchlist</h1> 
    </div>

    <div v-if="watchlist.length === 0" class="empty-message">
      Your watchlist is empty.
    </div>

    <div v-else class="movie-list">
      <div v-for="movie in watchlist" :key="movie.id" class="movie-item">
        <img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster" class="movie-poster" />
        <div class="movie-details">
          <h3 class="movie-title">{{ movie.title }}</h3>
          <p class="release-date"><strong>Release Date:</strong> {{ movie.release_date }}</p>
          <div class="btn-container"> 
          <button @click="watchTrailer(movie.id)" class="trailer-button">Watch Trailer</button>
          <button @click="removeFromWatchlist(movie.id)" class="remove-button">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'WatchlistPage',
  data() {
    return {
      watchlist: [],
    };
  },
  mounted() {
    this.loadWatchlist();
  },
  methods: {
    loadWatchlist() {
      const saved = localStorage.getItem('watchlist');
      this.watchlist = saved ? JSON.parse(saved) : [];
    },
    saveWatchlist() {
      localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
    },
    removeFromWatchlist(movieId) {
      this.watchlist = this.watchlist.filter((movie) => movie.id !== movieId);
      this.saveWatchlist();
    },
    async watchTrailer(movieId) {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=81fa4d93749a4108a50c3051bde20be2`);
        const trailer = res.data.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube');
        if (trailer) {
          window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
        } else {
          alert('Trailer not found!');
        }
      } catch (err) {
        console.error('Failed to load trailer:', err);
        alert('Error loading trailer.');
      }
    },
    getMoviePosterUrl(posterPath) {
      return posterPath
        ? `https://image.tmdb.org/t/p/w500${posterPath}`
        : 'https://via.placeholder.com/500x750?text=No+Image';
    },
  },
};
</script>

<style scoped>.container {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #121212; 
}

.main-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.heading {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 1px 1px 2px black;
}

.empty-message {
  text-align: center;
  color: #aaa;
  font-size: 1.5rem;
  margin-top: 60px;
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 30px;
}

.movie-item {
  display: flex;
  flex-direction: column;
  background-color: #1f1f1f;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(229, 9, 20, 0.3);
}

.movie-poster {
  width: 100%;
  height: 330px;
  object-fit: cover;
}

.movie-details {
  padding: 15px;
  text-align: center;
}

.movie-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 5px;
}

.release-date {
  font-size: 0.95rem;
  color: #ccc;
  margin-bottom: 10px;
}

.btn-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.trailer-button,
.remove-button {
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.trailer-button {
  background-color: #e50914;
  color: #fff;
}

.trailer-button:hover {
  background-color: #f40612;
  transform: scale(1.05);
}

.remove-button {
  background-color: transparent;
  color: #e50914;
  border: 2px solid #e50914;
}

.remove-button:hover {
  background-color: #e50914;
  color: white;
  transform: scale(1.05);
}

</style>
