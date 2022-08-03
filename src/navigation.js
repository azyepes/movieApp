window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

function navigator() {
    // console.log( { location } );

    if (location.hash.startsWith('#trends')) {
        trendPage()
    } else if (location.hash.startsWith('#search=')) {
        searchPage()
    } else if (location.hash.startsWith('#movie=')) {
        moviePage()
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage()
    } else {
        homePage()
    }

    location.hash
}

function homePage() {

    navCategories.classList.remove('inactive')
    trending.classList.remove('inactive')
    popular.classList.remove('inactive')
    topRate.classList.remove('inactive')
    upcoming.classList.remove('inactive')
    trendingSearchPage.classList.add('inactive')
    searchBar.classList.add('inactive')
    backButton.classList.add('inactive')

    categoriesList()
    getTrendingMoviesPreview()
    getMostPopularMoviesPreview()
    getTopRateMoviesPreview()
    getUpcomingMoviesPreview()
    // console.log('Home!');
}

function categoriesPage() {
    console.log('Categories!');
}

function moviePage() {
    console.log('Movies!');
}

function searchPage() {
    navCategories.classList.add('inactive')
    trending.classList.add('inactive')
    popular.classList.add('inactive')
    topRate.classList.add('inactive')
    upcoming.classList.add('inactive')
    searchBar.classList.remove('inactive')
    trendingSearchPage.classList.remove('inactive')
    backButton.classList.remove('inactive')

    getTrendingMoviesSearchPage()
}

function trendPage() {
    console.log('Trends!');
}