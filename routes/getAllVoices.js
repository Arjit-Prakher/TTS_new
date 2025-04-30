const getTokenTTS = require('./authTokenTTS');

// const allVoiceNames = [];
let result;
async function getAllVoices() {
  try {
    const token = await getTokenTTS();
    const myHeaders = {
      Authorization: `Bearer ${token}`,
    };

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      "https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/6902873c-cd8a-44ed-a634-473967bb5df6/v1/voices",
      requestOptions
    );
    result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getAllVoices };