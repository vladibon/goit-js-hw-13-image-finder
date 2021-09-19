const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '22909528-f64cd92665831d6faf8601377';
const filter =
  'image_type=photo&orientation=horizontal&editors_choice=true&safesearch=true&per_page=12';

export default class PixabayApiService {
  constructor() {
    this._searchQuery = '';
    this.page = 1;
  }

  fetchPhotos() {
    const url = `${BASE_URL}/?key=${API_KEY}&${filter}&q=${this._searchQuery}&page=${this.page}`;

    return fetch(url)
      .then(res => res.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
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
