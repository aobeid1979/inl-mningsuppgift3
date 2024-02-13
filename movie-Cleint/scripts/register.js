const  register = async (email, password) =>  {
    const response = await fetch(ENDPOINTS.register, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    return response.ok;
}


// Event listener for register form submission
document.getElementById("register-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;


    try {
        // Call register function with provided email and password
        const response = await register(email, password);
        
        window.location.href = "/";
        // Handle success response
        alert("Registration successful! Please log in.");
        // Redirect to login page or perform other actions as needed
    } catch (error) {
        // Handle error response
        console.error("Error during registration:", error);
        alert("Registration failed. Please try again.");
    }
});
