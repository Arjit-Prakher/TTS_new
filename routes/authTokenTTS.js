const dotenv = require('dotenv');
dotenv.config();

let apiToken = null;
let tokenExpiry = null;

//getting api key from .env file,
const API_KEY_TTS = process.env.API_KEY_TTS;

async function generateNewToken() {
    try {

        const formData = new URLSearchParams({
        grant_type: "urn:ibm:params:oauth:grant-type:apikey",
        apikey: API_KEY_TTS,
        });
        
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
        };

    
    const response = await fetch(
      "https://iam.cloud.ibm.com/identity/token#apikey",
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
        console.error("Error fetching token : ",error.message);
  }
}

async function getTokenTTS() {
  if(Date.now() >= tokenExpiry * 1000) {
    console.log("Token Expired, generating new..");
    const newToken = await generateNewToken();
    apiToken = newToken?.access_token;
    tokenExpiry = newToken?.expiration;
  } else {
    console.log("Token is fresh");
  }
  return apiToken;
}

module.exports = getTokenTTS;
