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
        <p> <a href="EditThisFilm.html?id=${film.id}">Update Film</a> </p>
        <p> <a href="DeleteFilm.html?id=${film.id}">Delete Film</a> </p>
        <hr>`;

        filmsDiv.appendChild(filmDiv)

    }
})();