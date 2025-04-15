<template>
  <div class="container">
    <div class="genre-header">
      <h1 class="heading">Popular Genres</h1>
      <button class="back-button" @click="$router.push({ name: 'Dashboard' })">⬅ Back</button>
    </div> 
    <div v-if="loading" class="loading">Loading genres...</div>
    <div v-if="error" class="error-message">{{ error }}</div>

    <div v-if="genres.length > 0" class="genre-grid">
      <div
        v-for="genre in genres"
        :key="genre.id"
        class="genre-card" 
        @click="$router.push({ name: 'movieGenres', params: { id: genre.id, name: genre.name } })"
      >
        <div class="overlay">
          <span class="genre-title">{{ genre.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      genres: [],
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchGenres();
  },
  methods: {
    async fetchGenres() {
      try {
        const res = await axios.get(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=81fa4d93749a4108a50c3051bde20be2'
        );
        this.genres = res.data.genres;
        this.loading = false;
      } catch (err) {
        this.error = err.message;
        this.loading = false;
      }
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
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.back-button {
  padding: 8px 16px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 10px;
}
.back-button:hover {
  background-color: #555;
}

.heading {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
  margin-bottom: 10px;
}
.genre-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
.genre-card {
  width: 220px;
  height: 180px;
  border-radius: 16px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s;
  background: #e50914;
  color: white;
}
.genre-card:hover {
  transform: scale(1.05);
}
.overlay {
  background: rgba(0, 0, 0, 0.6);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.genre-title {
  font-size: 1.5rem;
  color: #fff;
  font-weight: 600;
}
.loading,
.error-message {
  text-align: center;
  margin-top: 20px;
  font-size: 1.2rem;
}
</style>
