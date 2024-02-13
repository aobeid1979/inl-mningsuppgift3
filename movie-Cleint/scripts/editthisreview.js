document.addEventListener("DOMContentLoaded", async function() {
    // Get the Review ID from the URL parameters
    const REVIEW_ID = parseInt(new URLSearchParams(window.location.search).get("id"), 10);

    // Fetch review details by ID
    const review = await API.getReview(REVIEW_ID);

    // Display review details
    const reviewDiv = document.getElementById("review");
    reviewDiv.innerHTML = `
        <h3> Film Id = ${review.filmId}</h3>
        <h3>${review.rate}</h3>
        <p> <i> ${review.comments} </i> </p>
        <hr>`;

    // Set the rate value in the update form
    document.getElementById("rate").value = review.rate;

    // Set the comments in the comments field
    document.getElementById("comments").value = review.comments;

    // Add event listener for form submission
    const updateForm = document.getElementById("update-Review");
    updateForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        // Get updated values from the form
        const updatedRate = document.getElementById("rate").value;
        const updatedComments = document.getElementById("comments").value;

        try {
            // Call the API to update the review
            await API.updateReview(REVIEW_ID, updatedRate,updatedComments );

            // Redirect to the main reviews page after successful update
            window.location.href = "index.html";
        } catch (error) {
            console.error(error);
            alert(`Error updating review: ${error}`);
        }
    });
});document.addEventListener("DOMContentLoaded", async function() {
    // Get the Review ID from the URL parameters
    const REVIEW_ID = parseInt(new URLSearchParams(window.location.search).get("id"), 10);

    // Fetch review details by ID
    const review = await API.getReview(REVIEW_ID);

    // Display review details
    const reviewDiv = document.getElementById("review");
    reviewDiv.innerHTML = `
        <h3> Film Id = ${review.filmId}</h3>
        <h3>${review.rate}</h3>
        <p> <i> ${review.comments} </i> </p>
        <hr>`;

    // Set the rate value in the update form
    document.getElementById("rate").value = review.rate;

    // Set the comments in the comments field
    document.getElementById("comments").value = review.comments;

    // Add event listener for form submission
    const updateForm = document.getElementById("update-Review");
    updateForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        // Get updated values from the form
        const updatedRate = document.getElementById("rate").value;
        const updatedComments = document.getElementById("comments").value;

        try {
            // Call the API to update the review
            await API.updateReview(REVIEW_ID, updatedRate,updatedComments );

            // Redirect to the main reviews page after successful update
            window.location.href = "index.html";
        } catch (error) {
            console.error(error);
            alert(`Error updating review: ${error}`);
        }
    });
});

