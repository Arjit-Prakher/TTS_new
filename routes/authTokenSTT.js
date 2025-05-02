const dotenv = require('dotenv');
dotenv.config()

let apiToken = null;
let tokenExpiry = null;

const API_KEY_STT = process.env.API_KEY_STT;

async function generateNewToken() {
    try {

        const formData = new URLSearchParams({
        grant_type: "urn:ibm:params:oauth:grant-type:apikey",
        apikey: API_KEY_STT,
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

async function getTokenSTT() {
  if (!apiToken || Date.now() >= tokenExpiry) {
    console.log("Token expired, requesting new...");
    const newToken = await generateNewToken();
    apiToken = newToken?.access_token;
    tokenExpiry = newToken?.expiration;
    // console.log("API_Token:", apiToken);
  }
  return apiToken;
}

module.exports = getTokenSTT;































// const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

// const urlencoded = new URLSearchParams();
// urlencoded.append("grant_type", "urn:ibm:params:oauth:grant-type:apikey");
// urlencoded.append("apikey", `${API_KEY_STT}`);

// const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: urlencoded,
//     redirect: "follow"
// };

// async function getTokenSTT() {

//     if (!apiToken || Date.now() >= tokenExpiry) {
//         console.log("Token expired, generating new...");
//         const response = await fetch("https://iam.cloud.ibm.com/identity/token#apikey", requestOptions);
//         const result = await response.json();

//         apiToken = result.access_token;
//         tokenExpiry = Date.now() + result.expires_in * 1000;
//     } 
//     return apiToken;
// }
// module.exports = getTokenSTT ;