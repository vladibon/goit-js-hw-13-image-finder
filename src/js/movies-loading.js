import moviesTemplate from '../templates/card-markup.hbs';
import { trendingMovies } from './api/movies-api';
import refs from './refs';

loadMovies();

async function loadMovies() {
  try {
    const { results } = await trendingMovies.fetchMovies();
    console.log(results);
    appendMoviesMarkup(results);
  } catch (err) {
    console.log(err);
  }
}

function appendMoviesMarkup(movies) {
  refs.moviesContainer.insertAdjacentHTML('beforeend', moviesTemplate(movies));
}

function clearMoviesContainer() {
  refs.moviesContainer.innerHTML = '';
}
