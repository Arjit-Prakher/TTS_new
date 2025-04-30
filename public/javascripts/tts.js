async function getAllVoices() {
    const voices = document.getElementById('voices');
    const url = "http://localhost:3000/api/voices";
    // const allVoiceNames = [];
    const response = await fetch(url);
    const result = await response.json();

    // console.log(result.voices);

    result.voices.forEach(element => {
        const options = document.createElement('option');
        options.value = element.name;
        options.textContent = element.name;
        voices.appendChild(options);
    });

}
getAllVoices();

const submitbtn = document.getElementById("submitbtn");

submitbtn.addEventListener("click", async function () {
  const text = document.getElementById("textarea").value;
  const selectedVoice = document.getElementById("voices").value;

  submitbtn.innerHTML = "Going...";

  try {
    const response = await fetch("http://localhost:3000/api/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, selectedVoice }),
    });

    console.log("Response from backend:", response);

    if (response.ok) {
      const audioBlob = await response.blob();

      console.log("Audio blob:", audioBlob);

      const audioUrl = URL.createObjectURL(audioBlob);

      const audioPlayer = document.getElementById("audioPlayer");
      audioPlayer.src = audioUrl;
      await audioPlayer.play();

      submitbtn.innerHTML = "Let's go!";
    } else {
      console.error("Error in TTS response:", response.statusText);
      submitbtn.innerHTML = "Try Again";
    }
  } catch (err) {
    console.error("Error during fetch:", err);
    submitbtn.innerHTML = "Error!";
  }
});

