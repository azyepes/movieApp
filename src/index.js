async function getTrendingMoviesPreview(i) {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
    const data = await res.json()
    
    const movies = data.results[i]
    const mainPoster = document.getElementById('mainPoster')

    if (mainPoster.childElementCount !== 0) {
        cleaner(mainPoster, i)
    } else {
        const posterContainer = document.createElement('div')
        posterContainer.classList.add('popular-poster')
    
        const  posterImg = document.createElement('img')
        posterImg.classList.add('popular-img')
        posterImg.setAttribute('src', `https://image.tmdb.org/t/p/w500${movies.backdrop_path}`)
        posterImg.setAttribute('alt', `${movies.title}`)

        const posterTitle = document.createElement('h3')
        posterTitle.classList.add('popular-img-title')
        posterTitle.textContent = `${movies.title}`

        // const posterDescription = document.createElement('p')
        // posterDescription.classList.add('popular-img-description')
        // posterDescription.textContent =`${movies.overview}`

        posterContainer.append(posterImg, posterTitle)
        mainPoster.appendChild(posterContainer)
    }
}
let i = 0
getTrendingMoviesPreview(i)

const nextMovieArrow = document.getElementById('nextMovie')
nextMovieArrow.addEventListener('click', nextMovie)
function nextMovie() {
    if (i === 19) {
        i = 0
    } else {
        i += 1
    }
    getTrendingMoviesPreview(i)
}

const previuosMovieArrow = document.getElementById('previuosMovie')
previuosMovieArrow.addEventListener('click', previuosMovie)
function previuosMovie() {
    if (i === 0) {
        i = 19
    } else {
        i -= 1
    }
    getTrendingMoviesPreview(i)
}

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