window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

function navigator() {
    console.log( { location } );

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
    categoriesList()
    getTrendingMoviesPreview(i)
    getMostPopularMoviesPreview()
    getTopRateMoviesPreview()
    getUpcomingMoviesPreview()
    console.log('Home!');
}

function categoriesPage() {
    console.log('Categories!');
}

function moviePage() {
    console.log('Movies!');
}

function searchPage() {
    console.log('Search!');
}

function trendPage() {
    console.log('Trends!');
}