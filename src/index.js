// Variables URL
const trending_day = {
    movie: '/trending/movie/day',
    tv: '/trending/tv/day',
    all: '/trending/all/day'
}
const genre = {
    movie: '/genre/movie/list',
    tv: '/genre/tv/list'
}
const discover = {
    movie: '/discover/movie',
    tv: '/discover/tv'
}
const popular = {
    movie: '/movie/popular',
    tv: '/tv/popular'
}
const upcoming = {
    movie: '/movie/upcoming',
    tv: '/tv/on_the_air'
}
const searchUrl = {
    movie: '/search/movie',
    tv: '/search/tv'
}
const API_KEY = "f0497c57ada4a743e060e3cbfc13deb3"

options.addEventListener('change', ()=> {
    location.hash = `#home-${options.value}`
    
})

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
let limitTrendingMoviesPreview = 19
let limitMovies = 10

// Categorias de películas / Series (Falta series)
async function categoriesList(url) {
    const { data, status } = await api(url)
    const genres = data.genres

    selectList.innerHTML = ''
    const firstOption = document.createElement('option')
    firstOption.textContent = 'Categories'
    selectList.appendChild(firstOption)

    // let i = 0
    genres.forEach(genre => {
        const option = document.createElement('option')
        option.value = genre.id
        // i += 1
        option.textContent = genre.name

        selectList.appendChild(option)
    });
}



selectList.addEventListener('change', () => {
    const text = selectList.options[selectList.selectedIndex].innerHTML
    location.hash = `#category=${text}-${selectList.value}`
    
}) 

// categoriesList()
async function getByCategories(url_discover, id) {

    getMoviesCompleteView(url_discover, completeMovieListSection, 0, {params: {'with_genres': id}})
}

// Obtener peliculas trending preview (Falta series)
async function getTrendingPreview(url) {
    const { data } = await api(url)
    const programs = data.results
    mainPoster.innerHTML = ""
    // console.log(programs);

    programs.forEach(program => {
        const posterContainer = document.createElement('div')
        posterContainer.classList.add('trending-poster')
        posterContainer.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${program.backdrop_path}')`

        const posterTitle = document.createElement('h3')
        posterTitle.classList.add('trending-poster--title')
        if (program.title) {
            posterTitle.textContent = `${program.title}`
        } else {
            posterTitle.textContent = `${program.name}`
        }

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
        if (movie.poster_path) {
            posterContainer.style.backgroundImage = `url('https://image.tmdb.org/t/p/w300${movie.poster_path}')`
        } else {
            const posterTitle = document.createElement('h3')
            posterTitle.classList.add('titlePosterMissingImg')
            if (movie.title) {
                posterTitle.textContent = `${movie.title}`
            } else {
                posterTitle.textContent = `${movie.name}`
            }
            posterContainer.appendChild(posterTitle)
        }

        container.appendChild(posterContainer)
    }  

    sectionPreviewContainer.append(sectionTitleAndButton, container)
    movieSectionContainer.appendChild(sectionPreviewContainer)
}

// Más populares
async function getMostPopularPreview(url, x) {
    getMoviesPreviewList(url, 'popularContainer', 'popular', 'popular-container', '#morePopular', 'seeMoreButtonPopular', x, 0)
}

// Top peliculas mejor calificadas
async function getTopRatePreview(url, x) {
    getMoviesPreviewList(url, 'topRateContainer', 'top-rate', 'top-rate-container', '#moreTopRate', 'seeMoreButtonTopRate', x, 0, { params: { 'sort_by': 'vote_count.desc' } } ) 
}

// Upcoming movies
async function getUpcomingPreview(url, x) {
    getMoviesPreviewList(url, 'upcomingContainer', 'upcoming', 'upcoming-container', '#moreUpcoming', 'seeMoreButtonUpcoming', x, 0)
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
            if (movie.poster_path) {
                posterContainer.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${movie.poster_path}')`
            } else {
                const posterTitle = document.createElement('h3')
                posterTitle.classList.add('titlePosterMissingImg')
                if (movie.title) {
                    posterTitle.textContent = `${movie.title}`
                } else {
                    posterTitle.textContent = `${movie.name}`
                }
                posterContainer.appendChild(posterTitle)
            }
            
            container.appendChild(posterContainer)
    });
}

function getTrendingSearchPage(url) {
    getMoviesCompleteView(url, completeMovieListSection)
}

function getMorePopular(url, x) {
    getMoviesCompleteView(url, completeMovieListSection, x)
}

function getMoreTopRate(url, x) {
    getMoviesCompleteView(url, completeMovieListSection, x, { params: { 'sort_by': 'vote_count.desc' } })
}

function getMoreUpcoming(url, x) {
    getMoviesCompleteView(url, completeMovieListSection, x)
}

function getBySearch(url, query) {

    getMoviesCompleteView(url, completeMovieListSection, 0, { params: { query, 'sort_by': 'vote_count.desc' } })
}

searchButton.addEventListener('click', ()=> {
    location.hash = `#search=${search.value}`
} ) 

document.addEventListener('keypress', (event) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
        location.hash = `#search=${search.value}`
    }
})

backButton.addEventListener( 'click', () => {
    history.back()
} )
