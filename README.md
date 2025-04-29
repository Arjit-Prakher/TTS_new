# To use the application.

Create a file called authTokenTTS.js in the routes folder and paste the following, and replace your API_KEY
```
let apiToken = '';
let tokenExpiry = 0;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();
urlencoded.append("grant_type", "urn:ibm:params:oauth:grant-type:apikey");
urlencoded.append("apikey", "Your API_KEY here");

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
};

async function getTokenTTS() {

    if (Date.now() >= tokenExpiry) {
        // console.log("Token expired. Requesting new token...");
        try {
            const response = await fetch("https://iam.cloud.ibm.com/identity/token#apikey", requestOptions);
            const result = await response.json();
    
            apiToken = result.access_token;
            tokenExpiry = Date.now() + result.expires_in * 1000;
            // console.log("Token expiry: ", tokenExpiry);
            // console.log("Date.now()  : ", Date.now());
        } catch (error) {
            console.error(error);
        }
    } 
    return apiToken;
}

module.exports =  getTokenTTS ;
```
