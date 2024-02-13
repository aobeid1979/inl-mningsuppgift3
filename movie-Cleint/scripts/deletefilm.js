const FILM_ID = new URLSearchParams(window.location.search).get("id");

(async () => {
    const film = await API.getFilm(FILM_ID);

    document.querySelector("h2").textContent = film.title;

    const filmDiv = document.getElementById("film");

    filmDiv.innerHTML = `    
        <p> <i> ${film.releaseYear} </i> </p>
        <p> <i> ${film.genre} </i> </p>
        <hr>`;

    // Add a button for film deletion
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Film";
    deleteButton.addEventListener("click", async () => {
        try {
            await API.deletefilm(FILM_ID);
            // Redirect to the main films page after successful deletion
            window.location.href = "index.html";
        } catch (error) {
            console.error(error);
            // Display an error message (modify based on your needs)
            alert(`Error deleting film: ${error}`);
        }
    });

    filmDiv.appendChild(deleteButton);
})();
