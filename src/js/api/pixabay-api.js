export default {
  BASE_URL: 'https://pixabay.com/api',
  API_KEY: '22909528-f64cd92665831d6faf8601377',
  params: {
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page: 1,
  },

  getURL() {
    return `${this.BASE_URL}/?key=${this.API_KEY}&${new URLSearchParams(
      this.params,
    ).toString()}`;
  },

  incrementPage() {
    this.params.page += 1;
  },

  resetPage() {
    this.params.page = 1;
  },

  get searchQuery() {
    return this.params.q;
  },

  set searchQuery(newQuery) {
    this.params.q = newQuery;
  },
};
