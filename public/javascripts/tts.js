async function getAllVoices() {
    const voices = document.getElementById('voices');
    const url = "http://localhost:3000/api/voices";
    // const allVoiceNames = [];
        const response = await fetch(url);
        const result = await response.json();
        
        console.log(result.voices);

        result.voices.forEach(element => {
            const options = document.createElement('option');
            options.value = element.name;
            options.textContent = element.name;
            voices.appendChild(options);
        });
    
}
getAllVoices();