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
        location.hash = '#home'
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

    if (options.value === 'tv') {
        getTrendingPreview(trending_day.tv)
        getMostPopularPreview(popular.tv, 0)
        getTopRatePreview(discover.tv, 1)
        getUpcomingPreview(upcoming.tv, 3)
        categoriesList(genre.tv)
    } else if (options.value === 'movie') {
        getTrendingPreview(trending_day.movie)
        getMostPopularPreview(popular.movie, 0)
        getTopRatePreview(discover.movie, 1)
        getUpcomingPreview(upcoming.movie, 2)
        categoriesList(genre.movie)
    } else {
        getTrendingPreview(trending_day.all)
    }
}

function categoriesPage() {
    // console.log('Categories!');
    navCategories.classList.remove('inactive')
    trending.classList.add('inactive')
    searchBar.classList.add('inactive')
    completeMovieListSection.classList.remove('inactive')
    backButton.classList.remove('inactive')
    navTitleSection.classList.add('inactive')
    movieSectionContainer.classList.add('inactive')
    
    // getByCategories
    if (options.value === 'tv') {
        getByCategories(genre.tv, discover.tv)
    } else if (options.value === 'movie') {
        getByCategories(genre.movie, discover.movie)
    } 

    // getMoviesByCategories()
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

    if (options.value === 'tv') {
        getTrendingSearchPage(trending_day.tv)
    } else if (options.value === 'movie') {
        getTrendingSearchPage(trending_day.movie)
    } 
    // getTrendingMoviesSearchPage()
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
        if (options.value === 'tv') {
            getMorePopular(popular.tv, 0)
        } else if (options.value === 'movie') {
            getMorePopular(popular.movie, 0)
        } 
    } else if (location.hash === '#moreTopRate') {
        if (options.value === 'tv') {
            getMoreTopRate(discover.tv, 1)
        } else if (options.value === 'movie') {
            getMoreTopRate(discover.movie, 1)
        } 
    } else if (location.hash === '#moreUpcoming') {
        if (options.value === 'tv') {
            getMoreUpcoming(upcoming.tv, 3)
        } else if (options.value === 'movie') {
            getMoreTopRate(upcoming.movie, 2)
        } 
    } 
}