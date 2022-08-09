window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

function navigator() {
    if (location.hash.startsWith('#trends')) {
        trendPage()
    } else if (location.hash.startsWith('#search=')) {
        searchPage()
    } else if (location.hash.startsWith('#movie=')) {
        moviePage()
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage()
    } else if (location.hash.startsWith('#more')) {
        morePage()
    } else {
        homePage()
    }
    window.scrollTo(0,0)
}

function homePage() {
    navCategories.classList.remove('inactive')
    trending.classList.remove('inactive')
    searchBar.classList.add('inactive')
    completeMovieListSection.classList.add('inactive')
    backButton.classList.add('inactive')
    navTitleSection.classList.add('inactive')
    movieSectionContainer.classList.remove('inactive')

    categoriesList()
    getTrendingMoviesPreview()
    getMostPopularMoviesPreview()
    getTopRateMoviesPreview()
    getUpcomingMoviesPreview()
}

function categoriesPage() {
    // console.log('Categories!');
    navCategories.classList.remove('inactive')
    trending.classList.add('inactive')
    searchBar.classList.remove('inactive')
    completeMovieListSection.classList.remove('inactive')
    backButton.classList.remove('inactive')
    navTitleSection.classList.add('inactive')
    movieSectionContainer.classList.add('inactive')

    getMoviesByCategories()
}

function moviePage() {
    console.log('Movies!');
}

function searchPage() {
    navCategories.classList.add('inactive')
    trending.classList.add('inactive')
    searchBar.classList.remove('inactive')
    completeMovieListSection.classList.remove('inactive')
    backButton.classList.remove('inactive')
    navTitleSection.classList.add('inactive')
    movieSectionContainer.classList.add('inactive')

    getTrendingMoviesSearchPage()
}

function trendPage() {
    console.log('Trends!');
}

function morePage() {

    navCategories.classList.add('inactive')
    trending.classList.add('inactive')
    searchBar.classList.add('inactive')
    completeMovieListSection.classList.remove('inactive')
    backButton.classList.remove('inactive')
    navTitleSection.classList.remove('inactive')
    movieSectionContainer.classList.add('inactive')

    if (location.hash === '#morePopular') {
        seeMorePopularMovies()
    } else if (location.hash === '#moreTopRate') {
        seeMoreTopRateMovies()
    } else if (location.hash === '#moreUpcoming') {
        seeMoreUpcomingMovies()
    } 
}