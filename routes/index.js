var express = require('express');
const { getAllVoices } = require('./getAllVoices');
const getTokenTTS = require("./authTokenTTS");
// const { getTokenSTT } = require("./authTokenSTT");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// TEXT TO SPEECH

router.get('/tts', function (req, res) {
  res.render('tts');
});

// API endpoint for fetching voices
router.get('/api/voices', async function (req, res) {
  try {
    const voices = await getAllVoices();
    res.send(voices);
  } catch (error) {
    console.error('Error fetching voices: ', error);
    res.status(500).send('unable to fetch voices.')
  }
});

router.post('/api/tts', async function (req, res) {
  const { text, selectedVoice } = req.body;


  const API_URL = 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/6902873c-cd8a-44ed-a634-473967bb5df6/v1/synthesize';
  const token = await getTokenTTS();
  try {
    const response = await fetch(`${API_URL}?voice=${selectedVoice}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text })
    });
    res.send(response);
  } catch (error) {
    console.error('Error in TTS: ', error);
    res.status(500).send('Error in TTS');
    
  }

  

});


// SPEECH TO TEXT

router.get('/stt', function (req, res) {
  res.render('stt');
})


module.exports = router;
