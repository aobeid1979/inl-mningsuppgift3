(async () => {
    const films = await API.getFilms();
    console.log(films);

    const filmsDiv = document.getElementById("films");

    for ( const film of films ) {

        const filmDiv = document.createElement("div");
        
        filmDiv.className = "film";

        filmDiv.innerHTML = `
        <h3>${film.title}</h3>
        <p> <i> ${film.releaseYear} </i> </p>
        <p> <i> ${film.genre} </i> </p>
        <p> <a href="film.html?id=${film.id}">Show Film</a> </p>
        <hr>`;

        filmsDiv.appendChild(filmDiv)

    }
})();
(async () => {
    const reviews = await API.getReviews();
    console.log(reviews);    

    const reviewsDiv = document.getElementById("reviews");

    for ( const review of reviews ) {

        const reviewDiv = document.createElement("div");
        
        reviewDiv.className = "review";

        reviewDiv.innerHTML = `
        <h3> Film Id = ${review.filmId }</h3>
        <h3>${review.rate}</h3>
        <p> <i> ${review.comments} </i> </p>
        
        
        <hr>`;

        reviewsDiv.appendChild(reviewDiv)

    }
})();
