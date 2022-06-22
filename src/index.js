// Variables URL
const BASE_URL = 'https://api.themoviedb.org/3'
const TRENDING_MOVIE_DAY = '/trending/movie/day'
const LANGUAGE = '&language=en-US'
const GENRE = '/genre/movie/list'
const DISCOVER = '/discover/movie'
const POPULARITY = '&sort_by=popularity.desc'
const TOP_RATE = '/movie/top_rated'
const UPCOMING = '/movie/upcoming'
const REGION = '&region=US'

// Variables de HTML
const mainPoster = document.getElementById('trending-article')
const nextMovieArrow = document.getElementById('nextMovie')
const previuosMovieArrow = document.getElementById('previuosMovie')
const popularContainer = document.getElementById('popular-container')
const topRateContainer = document.getElementById('top-rate-container')
const upcomingContainer = document.getElementById('upcoming-container')

// Categorias de películas / Series (Falta series)
async function categoriesList() {
    const res = await fetch(BASE_URL + GENRE + API_KEY + LANGUAGE)
    const data = await res.json()

    categories = data.genres

    categories.forEach(category => {
        const selectList = document.getElementById('categories')

        const option = document.createElement('option')
        option.value = category.name
        option.textContent = category.name

        selectList.appendChild(option)
    });
}

categoriesList()

// Obtener peliculas trending (Falta series)
async function getTrendingMoviesPreview(i) {
    const res = await fetch(BASE_URL + TRENDING_MOVIE_DAY + API_KEY + LANGUAGE + REGION)
    const data = await res.json()
    
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
let i = 1
let limitTrendingMoviesPreview = 19
getTrendingMoviesPreview(i)

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
    const res = await fetch(BASE_URL + DISCOVER + API_KEY + LANGUAGE + POPULARITY + REGION)
    const data = await res.json()
    
    const movies = data.results
    movies.forEach(movie => {
        
        const linkPoster = document.createElement('a')
        linkPoster.href = '#'

        const posterContainer = document.createElement('div')
        posterContainer.classList.add('popular-poster')
        posterContainer.style.backgroundImage = `url('https://image.tmdb.org/t/p/w300${movie.poster_path}')`

        linkPoster.appendChild(posterContainer)
        popularContainer.appendChild(linkPoster)
    });
}

getMostPopularMoviesPreview()

// Top peliculas mejor calificadas
async function getTopRateMoviesPreview() {
    const res = await fetch(BASE_URL + TOP_RATE + API_KEY + LANGUAGE + REGION)
    const data = await res.json()
    
    const movies = data.results
    movies.forEach(movie => {
        
        if (movie.original_language === 'en') {
            
            const linkPoster = document.createElement('a')
            linkPoster.href = '#'

            const posterContainer = document.createElement('div')
            posterContainer.classList.add('top-rate-poster')
            posterContainer.style.backgroundImage = `url('https://image.tmdb.org/t/p/w300${movie.poster_path}')`

            linkPoster.appendChild(posterContainer)
            topRateContainer.appendChild(linkPoster)
        }
        
    });
}

getTopRateMoviesPreview()

// Colección de peliculas
async function getUpcomingMoviesPreview() {
    const res = await fetch(BASE_URL + UPCOMING + API_KEY + LANGUAGE + REGION)
    const data = await res.json()
    console.log(data.results);
    const movies = data.results
    movies.forEach(movie => {
        
        if (movie.original_language === 'en' && movie.poster_path !== null) {
            
            const linkPoster = document.createElement('a')
            linkPoster.href = '#'

            const posterContainer = document.createElement('div')
            posterContainer.classList.add('top-rate-poster')
            posterContainer.style.backgroundImage = `url('https://image.tmdb.org/t/p/w300${movie.poster_path}')`

            linkPoster.appendChild(posterContainer)
            upcomingContainer.appendChild(linkPoster)
        }
        
    });
}

getUpcomingMoviesPreview()