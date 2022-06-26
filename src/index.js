// Variables URL
const BASE_URL = 'https://api.themoviedb.org/3'
const TRENDING_MOVIE_DAY = '/trending/movie/day'
const LANGUAGE = '?language=en-US'
const GENRE = '/genre/movie/list'
const DISCOVER = '/discover/movie'
const POPULARITY = '&sort_by=popularity.desc'
const TOP_RATE = '/movie/top_rated'
const UPCOMING = '/movie/upcoming'
const REGION = '&region=US'
const API_KEY = "f0497c57ada4a743e060e3cbfc13deb3"

// Axios
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
        'language': 'en-US',
        'sort_by': 'popularity.desc',
        'region': 'US'
    }
});

// Useful variables
let i = 1
let limitTrendingMoviesPreview = 19
let limitMovies = 8

// Categorias de películas / Series (Falta series)
async function categoriesList() {
    const { data, status } = await api(GENRE)

    const genres = data.genres

    genres.forEach(genre => {
        const selectList = document.getElementById('categories')

        const option = document.createElement('option')
        option.value = genre.name
        option.textContent = genre.name

        selectList.appendChild(option)
    });
}

// categoriesList()

// Obtener peliculas trending (Falta series)
async function getTrendingMoviesPreview(i) {
    const { data } = await api(TRENDING_MOVIE_DAY)
    
    const movies = data.results[i]

    if (mainPoster.childElementCount !== 0) {
        cleaner(mainPoster, i)
    } else {
        const posterContainer = document.createElement('div')
        posterContainer.classList.add('trending-poster')
        posterContainer.style.backgroundImage = `url('https://image.tmdb.org/t/p/w300${movies.backdrop_path}')`

        const posterTitle = document.createElement('h3')
        posterTitle.classList.add('trending-poster--title')
        posterTitle.textContent = `${movies.title}`

        posterContainer.appendChild(posterTitle)
        mainPoster.appendChild(posterContainer)
    }
}

// Siguiente pelicula
nextMovieArrow.addEventListener('click', nextMovie)
function nextMovie() {
    if (i === limitTrendingMoviesPreview) {
        i = 0
    } else {
        i += 1
    }
    getTrendingMoviesPreview(i)
}

// Pelicula previa
previuosMovieArrow.addEventListener('click', previuosMovie)
function previuosMovie() {
    if (i === 0) {
        i = limitTrendingMoviesPreview
    } else {
        i -= 1
    }
    getTrendingMoviesPreview(i)
}

// Limpiar sección
function cleaner(section, i) {
    for (let i = 0; i < section.childElementCount; i++) {
        section.removeChild(section.children[i])        
    }

    switch (section) {
        case mainPoster:
            
            getTrendingMoviesPreview(i)
            break;
    
        default:
            break;
    }
}

// Más populares
async function getMostPopularMoviesPreview() {
    const { data } = await api(DISCOVER)
    
    for (let i = 0; i < limitMovies; i++) {
        const movie = data.results[i];
        const linkPoster = document.createElement('a')
        linkPoster.href = '#'

        const posterContainer = document.createElement('div')
        posterContainer.classList.add('popular-poster')
        posterContainer.style.backgroundImage = `url('https://image.tmdb.org/t/p/w300${movie.poster_path}')`

        linkPoster.appendChild(posterContainer)
        popularContainer.appendChild(linkPoster)
    }   
}

// Top peliculas mejor calificadas
async function getTopRateMoviesPreview() {
    const { data } = await api(TOP_RATE)
    
    for (let i = 0; i < limitMovies; i++) {
        const movie = data.results[i];
            
        const linkPoster = document.createElement('a')
        linkPoster.href = '#'

        const posterContainer = document.createElement('div')
        posterContainer.classList.add('top-rate-poster')
        posterContainer.style.backgroundImage = `url('https://image.tmdb.org/t/p/w300${movie.poster_path}')`

        linkPoster.appendChild(posterContainer)
        topRateContainer.appendChild(linkPoster)
        
    }
}

// Upcoming movies
async function getUpcomingMoviesPreview() {
    const { data } = await api(UPCOMING)

    for (let i = 0; i < limitMovies; i++) {
        const movie = data.results[i];
        if (movie.poster_path !== null) {
            
            const linkPoster = document.createElement('a')
            linkPoster.href = '#'

            const posterContainer = document.createElement('div')
            posterContainer.classList.add('top-rate-poster')
            posterContainer.style.backgroundImage = `url('https://image.tmdb.org/t/p/w300${movie.poster_path}')`

            linkPoster.appendChild(posterContainer)
            upcomingContainer.appendChild(linkPoster)
        }
    }
}

// Trending movies en search page
async function getTrendingMoviesSearchPage() {
    const { data } = await api(TRENDING_MOVIE_DAY)
    
    const movies = data.results

    movies.forEach(movie => {
        
        const posterContainer = document.createElement('div')
        posterContainer.classList.add('trending-poster--search_search')
        posterContainer.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${movie.poster_path}')`

        trendingSearchPage.appendChild(posterContainer)

    });
    
}