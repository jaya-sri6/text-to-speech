// Fetch all voices and populate the voice options
const synth = window.speechSynthesis;
let voices = [];

const textArea = document.querySelector('textarea');
const voiceSelect = document.querySelector('select');
const convertBtn = document.getElementById('convert_speech');
const clearBtn = document.getElementById('clearBtn');

function populateVoices() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach((voice, i) => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerHTML = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
}

// Convert text to speech
convertBtn.addEventListener('click', () => {
    const text = textArea.value;
    const utterThis = new SpeechSynthesisUtterance(text);
    const selectedVoiceName = voiceSelect.selectedOptions[0].value;
    utterThis.voice = voices.find(voice => voice.name === selectedVoiceName);
    synth.speak(utterThis);

    // Show clear button after speaking
    clearBtn.classList.remove('hide');
});

// Clear the text area
clearBtn.addEventListener('click', () => {
    textArea.value = '';
    clearBtn.classList.add('hide');
});

// Disable the Convert button if there's no text
textArea.addEventListener('input', () => {
    convertBtn.disabled = textArea.value.trim() === '';
});

// Initially disable the Convert button
convertBtn.disabled = true;
