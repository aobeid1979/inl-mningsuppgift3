const BASE_URL = "https://localhost:7221/"
const Films_URL = BASE_URL + "api/Films"
const LOGIN_URL = BASE_URL + "login"

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const token = await login(email, password);
        await fetchAndDisplayFilms(token);
    } catch (error) {
        console.log(error);
        document.getElementById("output").textContent = error.message;
    }
});

async function login(email , password){
    const response = await fetch(LOGIN_URL , {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });

    if(!response.ok){
        throw new Error("Login Failed");
    }

    const data = await response.json();
    return data.accessToken;
}

async function fetchAndDisplayFilms(token){
    const response = await fetch(Films_URL, {
        headers : {
            Authorization: `Bearer ${token}`
        }
    });

    if(!response.ok){
        throw new Error("Fetch Films Failed");
    }

    const films = await response.json();

    document.getElementById("output").textContent = JSON.stringify(films);
}