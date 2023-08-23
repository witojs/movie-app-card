import "./style.css";
import "./component/app-bar.js";
//TMDB API WITO 7871e7049a5a2e0166c035850093c567
//URL https://api.themoviedb.org/3/movie/550?api_key=7871e7049a5a2e0166c035850093c567
//base url https://api.themoviedb.org/3/

const API_KEY = "api_key=7871e7049a5a2e0166c035850093c567";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const imgUrl = "https://image.tmdb.org/t/p/w500";
const searchUrl = `${BASE_URL}/search/movie?${API_KEY}`;
const notFoundImage =
  "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/cinema-night-design-template-d6cf8153feca3f0c4fbdabd55e5590f3_screen.jpg?ts=1637041050";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const getMovies = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      if (data.results.length !== 0) {
        showMovies(data.results);
      } else {
        main.innerHTML = `<h1 class="not-found">No Movies Found</h1>`;
      }
    });
};

getMovies(API_URL);

const showMovies = (data) => {
  main.innerHTML = "";
  for (const movie of data) {
    const {
      title,
      poster_path,
      vote_average,
      overview,
      release_date,
      original_language,
    } = movie;
    const year = release_date.slice(0, 4);
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
        <img src="${
          poster_path ? imgUrl + poster_path : notFoundImage
        }" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="orange">${year}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
          <p class="language">Language: ${original_language.toUpperCase()}</p>
          <p class="rating">${vote_average}<i class="fa-solid fa-star"></i></p>          
        </div>
        `;
    main.appendChild(movieElement);
  }
};

//fitur cari film
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(`${searchUrl}&query=${searchTerm}`);
  } else {
    getMovies(API_URL);
  }
});
