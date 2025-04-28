var express = require('express');
const { getAllVoices } = require('./getAllVoices');
// const { getTokenTTS } = require("./authTokenTTS");
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
router.get('/api/voices', async function(req, res) {
  try {
    const voices = await getAllVoices();
    res.send(voices);
    // res.json(voices);
  } catch (error) {
    console.error('Error fetching voices: ', error);
    res.status(500).send('unable to fetch voices.')
  }
});


// SPEECH TO TEXT

router.get('/stt', function (req, res) {
  res.render('stt');
})


module.exports = router;
