// src/services/youtubeService.js

import axios from 'axios';

// Base URL for YouTube API
const API_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyDrHc8FLHtz_Xgqsj_wLhadAV_w_V-36Ec';  // Your API key
const MAX_RESULTS = 10;  // Number of results to fetch

// Function to fetch videos based on search query
export const searchVideos = async (query) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        part: 'snippet',
        q: query,
        key: API_KEY,
        maxResults: MAX_RESULTS,
      },
    });

    return response.data.items;  // Return video items from the API response
  } catch (error) {
    console.error('Error fetching data from YouTube API:', error);
    return [];
  }
};
