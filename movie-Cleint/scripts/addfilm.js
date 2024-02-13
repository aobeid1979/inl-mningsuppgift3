document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("add-Film");

    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const genre = document.getElementById("Genre").value;

        try {
            await API.addFilm(title, genre);
            const successMessage = document.createElement("p");
            successMessage.innerHTML = "<b>Thanks for adding the film!</b>";
            form.appendChild(successMessage);

            // Redirect to the main films page after successful addition
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            console.log(error);
            const errorMessage = document.createElement("p");
            errorMessage.innerHTML = `<b>Error: ${error}</b>`;
            form.appendChild(errorMessage);
        }
    });
});
