document.addEventListener("DOMContentLoaded", async function() {
    // Get the film ID from the URL parameters
    const FILM_ID = parseInt(new URLSearchParams(window.location.search).get("id"), 10);


    // Fetch film details by ID
    const film = await API.getFilm(FILM_ID);

    // Display film details
    const filmDetailsDiv = document.getElementById("film");
    filmDetailsDiv.innerHTML = `
        <p>Title: ${film.title}</p>
        <p>Release Year: ${film.releaseYear}</p>
        <p>Genre: ${film.genre}</p>
        <hr>`;

    // Set the film title in the update form
    document.querySelector("h2").textContent = `Update ${film.title}`;

    // Populate the form with current values
    document.getElementById("title").value = film.title;
    document.getElementById("genre").value = film.genre;

    // Add event listener for form submission
    const updateForm = document.getElementById("update-Film");
    updateForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        // Get updated values from the form
        const updatedTitle = document.getElementById("title").value;
        const updatedGenre = document.getElementById("genre").value;

        try {
            // Call the API to update the film
            await API.updateFilm(FILM_ID, updatedTitle, updatedGenre );

            // Redirect to the main films page after successful update
            window.location.href = "index.html";
        } catch (error) {
            console.error(error);
            // Display an error message (modify based on your needs)
            alert(`Error updating film: ${error}`);
        }
    });
});
document.getElementById('putButton').addEventListener('click', function() {
    // Antag att vi behöver skicka uppdaterad data och en ID-parameter
    const updatedData = {data: 'Uppdaterad data'};
    const dataId = '123'; // Exempel-ID

    fetch(`${apiUrl}/${dataId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('apiResponse').textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => console.error('Error:', error));
});