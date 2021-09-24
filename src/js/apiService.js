import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '22909528-f64cd92665831d6faf8601377';
const params = 'image_type=photo&orientation=horizontal&safesearch=true';

export default class PixabayApiService {
  constructor() {
    this._searchQuery = '';
    this.perPage = 16;
    this.page = 1;
  }

  async fetchImages() {
    const { data } = await axios.get(
      `${BASE_URL}/?key=${API_KEY}&q=${this._searchQuery}&${params}&per_page=${this.perPage}&page=${this.page}`,
    );
    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get searchQuery() {
    return this._searchQuery;
  }

  set searchQuery(newQuery) {
    this._searchQuery = newQuery;
  }
}
