const dotenv = require('dotenv');
dotenv.config()

let apiToken = null;
let tokenExpiry = null;

const API_KEY_STT = process.env.API_KEY_STT;


const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();
urlencoded.append("grant_type", "urn:ibm:params:oauth:grant-type:apikey");
urlencoded.append("apikey", `${API_KEY_STT}`);

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow"
};

async function getTokenSTT() {

    if (!apiToken || Date.now() >= tokenExpiry) {
        console.log("Token expired, generating new...");
        const response = await fetch("https://iam.cloud.ibm.com/identity/token#apikey", requestOptions);
        const result = await response.json();

        apiToken = result.access_token;
        tokenExpiry = Date.now() + result.expires_in * 1000;
    } else {
        console.log("Token is fresh", apiToken);
    }
    return apiToken;
}
module.exports = { getTokenSTT };