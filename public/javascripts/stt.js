const submitbtn = document.getElementById("submitbtn");
const textarea = document.getElementById("textarea");

submitbtn.addEventListener("click", async function() {
    const audioFile = document.getElementById('audioFile').files[0];
    if(!audioFile) {
        console.log("No file was selected");
        return;
    }
    const formData = new FormData();
    formData.append("audioFile", audioFile);

    try {
        const response = await fetch("http://localhost:3000/api/stt", {
            method: "POST",
            body: formData
        });

        const result = await response.text();
        textarea.value = result;
    } catch (error) {
        console.log("Error sending the files");
    }
})