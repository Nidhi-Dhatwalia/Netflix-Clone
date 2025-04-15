<template>
  <div class="container">
    <h1 class="heading">Sports Videos</h1>

  
    <div v-if="error" class="error-message">{{ error }}</div>

  
    <div v-if="loading" class="loading">Loading sports videos...</div>

   
    <div v-if="videos.length > 0" class="video-container">
      <div v-for="video in videos" :key="video.id" class="video-card">
        <div class="video-wrapper">
          <iframe
            :src="'https://www.youtube.com/embed/' + video.id"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <p class="video-title">{{ video.title }}</p>
      </div>
    </div>
 
    <button v-if="error" @click="fetchSportsVideos" class="retry-button">Try Again</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      videos: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchSportsVideos() {
      this.loading = true;
      this.error = null;
      try {
        const API_KEY = "AIzaSyDrHc8FLHtz_Xgqsj_wLhadAV_w_V-36Ec";  
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              part: "snippet",
              q: "sports",  
              type: "video",
              key: 'AIzaSyDrHc8FLHtz_Xgqsj_wLhadAV_w_V-36Ec',
              maxResults: 26,  
            },
          }
        );

        this.videos = response.data.items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.high.url,
        }));
        this.loading = false;
      } catch (error) {
        this.error = "Error fetching sports videos: " + error.message;
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchSportsVideos();
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px; 
  border-radius: 8px;
}

.heading {
  font-size: 36px;
  text-align: center;
  margin-bottom: 20px;
  color: #ffffff;
  font-weight: 700;
  text-transform: uppercase;
}

.video-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.video-card { 
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.video-card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 50px rgba(0, 0, 0, 0.2);
}

.video-wrapper {
  position: relative;
  padding-top: 56.25%; 
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

.video-title {
  text-align: center;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
}

.loading,
.error-message {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-top: 20px;
}

.retry-button {
  display: block;
  margin: 30px auto;
  padding: 12px 30px;
  background-color: #007bff;
  color: white;
  font-size: 18px;
  border-radius: 50px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.retry-button:hover {
  background-color: #0056b3;
}

.retry-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
}
</style>
