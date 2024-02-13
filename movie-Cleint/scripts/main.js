const API_BASE_URL = "https://localhost:7221/";

const ENDPOINTS = {
    films: API_BASE_URL + "api/Films/",
    login: API_BASE_URL + "login",
    reviews : API_BASE_URL + "api/Reviews/",
    userInfo : API_BASE_URL + "manage/info",
    register : API_BASE_URL + "register"
}

const API = {

    getFilms: async () => {
        
        const response = await fetch(ENDPOINTS.films);

        return response.json();
    },

    getReviews: async () => {

                
        const response = await fetch(ENDPOINTS.reviews);

        return response.json();
    },


    getFilm : async (id) => {
        

        const response = await fetch(ENDPOINTS.films + id);

        return response.json();
    },

    getReview : async (id) => {
        

        const response = await fetch(ENDPOINTS.reviews + id);

        return response.json();
    },

    login : async ( email, password ) =>{
        

        const response = await fetch(ENDPOINTS.login, {
            method : "POST", 
            headers : {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify({  email, password})
        });
        return response.json();
    },
    getUserInfo : async ()=> {
        

        const accessToken = await AUTH.getAccessToken();

        const response = await fetch(ENDPOINTS.userInfo, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        return response.json();
    },
    addReview : async ( filmId, rate , comments ) =>{
        

        const response = await fetch(ENDPOINTS.reviews , {
            method : "POST", 
            headers : {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify({ filmId, rate , comments})
        });
        return response.json();
    },
    addFilm : async( title, genre ) => {
        const accessToken = await AUTH.getAccessToken();

        const response = await fetch(ENDPOINTS.films, {
            method : "POST", 
            headers : {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            body: JSON.stringify({title, genre})
        });
        return response.json();
    },
    deletefilm: async (filmId) => {
        const accessToken = await AUTH.getAccessToken();
    
        const response = await fetch(`${ENDPOINTS.films}${filmId}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
        });
    
        // Check if the response has a JSON content type
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        } else {
            // If not JSON, return the status text or status code
            return { status: response.statusText, code: response.status };
        }},
    deletereview: async (reviewId) => {
        const accessToken = await AUTH.getAccessToken();

        const response = await fetch(`${ENDPOINTS.reviews}${reviewId}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
        });
        // Check if the response has a JSON content type
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        } else {
            // If not JSON, return the status text or status code
            return { status: response.statusText, code: response.status };
        }},
    

    updateFilm: async (filmId, title, genre, releaseYear) => {
            const accessToken = await AUTH.getAccessToken();
    
            const response = await fetch(`${ENDPOINTS.films}${filmId}`, {
                method: "PUT", 
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: JSON.stringify({
                    id: filmId,
                    title,
                    genre,
                    releaseYear
                    }),
            });
            console.log('Response:', response);

            if (!response.ok) {
                // Handle non-successful responses
                throw new Error(`Failed to update film: ${response.statusText}`);
            }
        
            // Assuming the server returns updated film details in the response
            return response.ok;
            },

    updateReview: async (filmId, rate , comments) => {
        const accessToken = await AUTH.getAccessToken();

        const response = await fetch(`${ENDPOINTS.reviews}${filmId}`, {
            method: "PUT", 
            headers : {
                'Content-type': 'application/json',
                'Authorization': 'Bearer' + accessToken,
            }, 
            body: JSON.stringify({ 
                
                rate,
                comments
            }),
        });
        console.log('Response:', response);

      if (!response.ok) {
                // Handle non-successful responses
                throw new Error(`Failed to update review: ${response.statusText}`);
            }
        
            // Assuming the server returns updated film details in the response
            return response.ok;
            },  
    
    }

    
    
    


const AUTH = {
    async getAccessToken() {
        const accessToken = localStorage.getItem("accessToken");
        const expiration = localStorage.getItem("expiration");

        if (accessToken && expiration > Date.now()) {
            return accessToken;
        }

        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
            throw new Error("Logged out")
        }

        const response = await API.refreshAccessToken(refreshToken);

        AUTH.handleAuthResponse(response);

        return response.accessToken;
    },
    async refreshAccessToken(refreshToken){
        const response = await fetch(ENDPOINTS.refresh, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ refreshToken })
        });

        return response.json();
    },

    handleAuthResponse(response) {
        const accessToken = response.accessToken;
        const refreshToken = response.refreshToken;
        const expiration = Date.now() + (response.expiresIn * 1000);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("expiration", expiration);
    },

    async showUserInfo() {
        try {
            const userInfo = await API.getUserInfo();
            
            const p = document.createElement("p");
            p.textContent = `Logged in as ${userInfo.email}`;

            const button = document.createElement("button");
            button.textContent = "Log out";
            button.onclick = AUTH.logout;

            p.appendChild(button);
            document.body.appendChild(p);
            
            const loginLink = document.getElementById("login-link");

            if(loginLink){
                loginLink.style.display = "none"
            }
        }
        catch (error) {
            document.body.innerHTML += `<p>Not logged in</p>`;
        }
    },

    logout(){
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expiration");

        window.location.href = "/";
    }
};

AUTH.showUserInfo();