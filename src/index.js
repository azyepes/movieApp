// Variables URL
const BASE_URL = 'https://api.themoviedb.org/3'
const TRENDING_MOVIE_DAY = '/trending/movie/day'
const LANGUAGE = '?language=en-US'
const GENRE = '/genre/movie/list'
const DISCOVER = '/discover/movie'
const POPULAR = '/movie/popular'
const TOP_RATE = '/movie/top_rated' //'/movie/latest'
const UPCOMING = '/movie/upcoming'
const REGION = '&region=US'
const SEARCH_MOVIE = '/search/movie'
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
        'region': 'US',
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

    let i = 0
    genres.forEach(genre => {
        const option = document.createElement('option')
        option.value = i
        i += 1
        option.label = genre.name
        option.textContent = genre.name

        selectList.appendChild(option)
    });
}

selectList.addEventListener('change', categoriesPage)

// categoriesList()
async function getMoviesByCategories() {
    const { data } = await api(GENRE)
    const genres = data.genres
    let i = selectList.value

    console.log(i, typeof(i));

    if (i != "") {
        location.hash = `#category=${genres[i].name}-${genres[i].id}`
    const [_, id] = location.hash.split('-')

    getMoviesCompleteView(DISCOVER, completeMovieListSection, 0, {params: {'with_genres': id}})
    } else {
        location.hash = '#home'
    }
}

// Obtener peliculas trending preview (Falta series)
async function getTrendingMoviesPreview() {
    const { data } = await api(TRENDING_MOVIE_DAY)
    const movies = data.results
    mainPoster.innerHTML = ""

    movies.forEach(movie => {
        const posterContainer = document.createElement('div')
        posterContainer.classList.add('trending-poster')
        posterContainer.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')`

        const posterTitle = document.createElement('h3')
        posterTitle.classList.add('trending-poster--title')
        posterTitle.textContent = `${movie.title}`

        posterContainer.appendChild(posterTitle)
        mainPoster.appendChild(posterContainer)
    });
}

// Siguiente pelicula
// nextMovieArrow.addEventListener('click', nextMovie)
// function nextMovie() {
//     if (i === limitTrendingMoviesPreview) {
//         i = 0
//     } else {
//         i += 1
//     }
//     getTrendingMoviesPreview(i)
// }

// Pelicula previa
// previuosMovieArrow.addEventListener('click', previuosMovie)
// function previuosMovie() {
//     if (i === 0) {
//         i = limitTrendingMoviesPreview
//     } else {
//         i -= 1
//     }
//     getTrendingMoviesPreview(i)
// }

async function getMoviesPreviewList(url, container, idSectionName, idContainer, href, idButton, x, j, params = {}) {
    movieSectionContainer.innerHTML = ""

    const sectionPreviewContainer = document.createElement('section')
    sectionPreviewContainer.classList.add('movieSection')
    sectionPreviewContainer.setAttribute('id', idSectionName) 
    
    const sectionTitleAndButton = document.createElement('div')
    sectionTitleAndButton.classList.add('titleAndButton')

    const sectionTittle = document.createElement('h2')
    sectionTittle.classList.add('title')
    sectionTittle.textContent = titles[x]

    const sectionButton = document.createElement('a')
    sectionButton.classList.add('seeMoreButton')
    sectionButton.setAttribute('href', href)
    sectionButton.setAttribute('id', idButton)
    sectionButton.textContent = buttons[j]

    sectionTitleAndButton.append(sectionTittle, sectionButton)

    container = document.createElement('div')
    container.setAttribute('id', idContainer)
    container.classList.add('popular-container--poster')

    const { data } = await api(url, params)
    container.innerHTML = ""

    for (let i = 0; i < limitMovies; i++) {
        const movie = data.results[i];
        const posterContainer = document.createElement('div')
        posterContainer.classList.add('popular-poster')
        posterContainer.style.backgroundImage = `url('https://image.tmdb.org/t/p/w300${movie.poster_path}')`
        container.appendChild(posterContainer)
    }  

    sectionPreviewContainer.append(sectionTitleAndButton, container)
    movieSectionContainer.appendChild(sectionPreviewContainer)
}

// Más populares
async function getMostPopularMoviesPreview() {
    getMoviesPreviewList(POPULAR, 'popularContainer', 'popular', 'popular-container', '#morePopular', 'seeMoreButtonPopular', 0, 0)
}

// Top peliculas mejor calificadas
async function getTopRateMoviesPreview() {
    getMoviesPreviewList(DISCOVER, 'topRateContainer', 'top-rate', 'top-rate-container', '#moreTopRate', 'seeMoreButtonTopRate', 1, 0, { params: { 'sort_by': 'vote_count.desc' } } ) 
}

// Upcoming movies
async function getUpcomingMoviesPreview() {
    getMoviesPreviewList(UPCOMING, 'upcomingContainer', 'upcoming', 'upcoming-container', '#moreUpcoming', 'seeMoreButtonUpcoming', 2, 0)
}

// Movies vista completa
async function getMoviesCompleteView(url, container, x, params = {}) {
    const { data } = await api(url, params)

    const movies = data.results

    navTitleSection.textContent = titles[x]
    container.innerHTML = ""

    movies.forEach(movie => {
        const posterContainer = document.createElement('div')
        posterContainer.classList.add('completeMovieListSection--poster')
        posterContainer.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${movie.poster_path}')`
        container.appendChild(posterContainer)
    });
}

async function getMoviesByCategory() {
    getMoviesCompleteView(GENRE, completeMovieListSection, 1, { params: { 'sort_by': 'vote_count.desc' } })
}

function getTrendingMoviesSearchPage() {
    getMoviesCompleteView(TRENDING_MOVIE_DAY, completeMovieListSection)
}

function seeMorePopularMovies() {
    getMoviesCompleteView(POPULAR, completeMovieListSection, 0)
}

function seeMoreTopRateMovies() {
    getMoviesCompleteView(DISCOVER, completeMovieListSection, 1, { params: { 'sort_by': 'vote_count.desc' } })
}

function seeMoreUpcomingMovies() {
    getMoviesCompleteView(UPCOMING, completeMovieListSection, 2)
}

searchButton.addEventListener('click', getMoviesBySearch)
document.addEventListener('keypress', (event) => {
    
    if (event.code === "Enter" || event.code === "NumpadEnter") {
        getMoviesBySearch()
    }
})

backButton.addEventListener( 'click', () => {
    history.back()
} )

function getMoviesBySearch() {
    location.hash = `#search=${search.value}`
    const [_, value] = location.hash.split('=')
    const query = decodeURI(value.trim())

    getMoviesCompleteView(SEARCH_MOVIE, completeMovieListSection, 0, { params: { query, 'sort_by': 'vote_count.desc' } })
}

