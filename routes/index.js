var express = require('express');
const multer = require('multer');
const { getAllVoices } = require('./getAllVoices');
const getTokenTTS = require("./authTokenTTS");
const getTokenSTT = require("./authTokenSTT");
const axios = require('axios');
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
  const token = await getTokenTTS();

  const API_URL =
    "https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/6902873c-cd8a-44ed-a634-473967bb5df6/v1/synthesize";

  try {
    const response = await axios.post(
      `${API_URL}?voice=${selectedVoice}`,
      {
        text: JSON.stringify(text),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "audio/wav",
        },
        responseType: "arraybuffer",
      }
    );

    res.setHeader(
      "Content-Type",
      response.headers["content-type"] || "application/octet-stream"
    );

    res.send(response.data); // Send the audio data to the frontend
  } catch (error) {
    console.error("Error in TTS:", error);
    res.status(500).send("Error generating speech");
  }
});

// router.post('/api/tts', async function (req, res) {
//   const { text, selectedVoice } = req.body;
//   const token = await getTokenTTS();
//   const API_URL = 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/6902873c-cd8a-44ed-a634-473967bb5df6/v1/synthesize';
//   try {
//     const response = await fetch(`${API_URL}?voice=${selectedVoice}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify({ text })
//     });
//     console.log(response.headers)
//     res.send(response.headers.Headers);
//   } catch (error) {
//     console.error('Error in TTS: ', error);
//     res.status(500).send('Error in TTS');
//   }
// });


// SPEECH TO TEXT

router.get('/stt', function (req, res) {
  res.render('stt');
})

const upload = multer({
  storage: multer.memoryStorage()
});
router.post('/api/stt', upload.single('audioFile'), async function (req, res) {
  try {
    const token = await getTokenSTT();
    const API_URL = "https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/b25d8218-1d27-4830-910d-919709db0c3b/v1/recognize";

    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Authorization': `Bearer ${token}`
      },
      body: req.file.buffer
    });

    const result = await response.json();
    const transcript = result.results.map(r => r.alternatives[0].transcript).join(' ');
    // res.json({ transcript });
    res.send(transcript);
    // console.log(transcript);
  } catch (error) {
    console.log("Nothing at backend");
  }

});


module.exports = router;