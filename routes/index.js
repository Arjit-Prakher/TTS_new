var express = require('express');
const { getTokenTTS } = require("./authTokenTTS");
const { getTokenSTT } = require("./authTokenSTT");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// TEXT TO SPEECH

router.get('/tts', function (req, res) {
  res.render('tts');
})

// router.get('/tts', async function (req, res) {
//   try {
//     const token = await getTokenTTS();
//     // console.log(token);
//     res.send("Token was generated, check the console");
//   } catch (error) {
//     console.log("Token not generated");
//     res.send("nothing")
//   }
// });




// SPEECH TO TEXT

router.get('/stt', function (req, res) {
  res.render('stt');
})

// router.get('/stt', async function (req, res) {
//   try {
//     const token = await getTokenSTT();
//     // console.log(token);
//     res.send("Token was generated, check the console");
//   } catch (error) {
//     console.log("Token not generated");
//     res.send("nothing")
//   }
// });

module.exports = router;
