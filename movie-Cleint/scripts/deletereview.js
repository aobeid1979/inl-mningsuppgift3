document.addEventListener("DOMContentLoaded", async function() {
    // Get the Review ID from the URL parameters
    const REVIEW_ID = parseInt(new URLSearchParams(window.location.search).get("id"), 10);

    // Fetch review details by ID
    const review = await API.getReview(REVIEW_ID);

    // Display review details
    const reviewDiv = document.getElementById("rreview");
    reviewDiv.innerHTML = `
        <h3> Film Id = ${review.filmId}</h3>
        <h3>${review.rate}</h3>
        <p> <i> ${review.comments} </i> </p>
        <hr>`;

    // Add a button for film deletion
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Review";
    deleteButton.addEventListener("click", async () => {
        try {
            await API.deletereview(REVIEW_ID);
            // Redirect to the main review page after successful deletion
            window.location.href = "index.html";
        } catch (error) {
            console.error(error);
            // Display an error message (modify based on your needs)
            alert(`Error deleting review: ${error}`);
        }
    });

    reviewDiv.appendChild(deleteButton);
})();
