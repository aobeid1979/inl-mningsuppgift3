document.getElementById("login-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{
        const response = await API.login(email, password);

        

        AUTH.handleAuthResponse(response);

        window.location.href = "/";

    }catch(error){
        document.getElementById("error").innerHTML = error;
    }
})
