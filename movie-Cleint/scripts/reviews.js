

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
        <p> <a href="EditThisreview.html?id=${review.id}">Update Review</a> </p>
        <p> <a href="DeleteReview.html?id=${review.id}">Delete Review</a> </p>
        
        <hr>`;

        reviewsDiv.appendChild(reviewDiv)

    }
})();