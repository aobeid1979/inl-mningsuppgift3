// film.html?id=123 <-- hämta 123
// get url query parameter javascript

const FILM_ID = new URLSearchParams(window.location.search).get("id");

(async () => {
    const film = await API.getFilm(FILM_ID);

    document.querySelector("h2").textContent = film.title;

    const filmDiv = document.getElementById("film");

    filmDiv.innerHTML = `    
    <p> <i> ${film.releaseYear} </i> </p>
    <p> <i> ${film.genre} </i> </p>
    <hr> `
    console.log(FILM_ID);
})();

const form = document.getElementById("add-Review");

console.log(form);

form.addEventListener("submit", async function(e) {
    console.log(e);
    e.preventDefault();

    const rate = document.getElementById("rate").value;

    const comments = document.getElementById("comments").value;

    try {
        await API.addReview(FILM_ID, rate, comments);
        const successMessage = document.createElement("p");
        successMessage.innerHTML = "<b>Thanks for the Review</b>";
        form.appendChild(successMessage);

        // Redirect to the main films page after successful review submission
        window.location.href = "index.html";
    } catch (error) {
        console.log(error);
        const errorMessage = document.createElement("p");
        errorMessage.innerHTML = `<b>${error}</b>`;
        form.appendChild(errorMessage);
    }
});
async function reloadAllFilms() {
    try {
        // Check if FILM_ID is available
        if (FILM_ID) {
            const film = await API.getFilm(FILM_ID);
            console.log("Film details:", film);
        }

        // Reload all films
        const films = await API.getFilms();
        console.log("All films:", films);
    } catch (error) {
        console.error("Error reloading films:", error);

        // If an error occurs, log it to the console and display an error message to the user
        const errorElement = document.createElement("p");
        errorElement.innerHTML = `<b>Error reloading films: ${error.message}</b>`;
        document.body.appendChild(errorElement);
    }
}