import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '037ec70dbdb1dfe68ab8507aed2e070b';

export const trendingMovies = {
  query_type: 'trending', // search,
  media_type: 'movie', // all, tv, pearson
  time_window: 'week', // day
  params: {
    api_key: API_KEY,
  },

  createURL() {
    return `${BASE_URL}/${this.query_type}/${this.media_type}/${
      this.time_window
    }?${new URLSearchParams(this.params).toString()}`;
  },

  async fetchMovies() {
    const { data } = await axios.get(this.createURL());
    return data;
  },

  async fetchConfiguration() {
    const data = await axios.get(
      `https://api.themoviedb.org/3/configuration?${new URLSearchParams(
        this.params,
      ).toString()}`,
    );
    console.log(data);
  },
};

trendingMovies.fetchConfiguration();
