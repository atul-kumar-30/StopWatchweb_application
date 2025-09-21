// Get DOM elements
const displayHours = document.getElementById('display-hours');
const displayMinutes = document.getElementById('display-minutes');
const displaySeconds = document.getElementById('display-seconds');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapList = document.getElementById('lap-list');

// Variables
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let lapNumber = 1;

// Event listeners
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTimer, 1000); // Update every second
        isRunning = true;
        startBtn.textContent = "Pause"; // Change button text
        startBtn.style.backgroundColor = '#ffc107'; // Change button color
        startBtn.removeEventListener('click', startTimer);
        startBtn.addEventListener('click', pauseTimer);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
        startBtn.textContent = "Resume";
        startBtn.style.backgroundColor = '#28a745';
        startBtn.removeEventListener('click', pauseTimer);
        startBtn.addEventListener('click', startTimer);
    }
}

function stopTimer() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
        startBtn.textContent = "Start";
        startBtn.style.backgroundColor = '#28a745';
        startBtn.removeEventListener('click', pauseTimer);
        startBtn.addEventListener('click', startTimer);
    }
}

function resetTimer() {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    lapNumber = 1;
    displayHours.textContent = '00';
    displayMinutes.textContent = '00';
    displaySeconds.textContent = '00';
    lapList.innerHTML = ''; // Clear lap list
    startBtn.textContent = "Start";
    startBtn.style.backgroundColor = '#28a745';
    startBtn.removeEventListener('click', pauseTimer);
    startBtn.addEventListener('click', startTimer);
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    displaySeconds.textContent = pad(seconds);
    displayMinutes.textContent = pad(minutes);
    displayHours.textContent = pad(hours);
}

function recordLap() {
    if (isRunning) {
        let lapTime = `${pad(parseInt(displayHours.textContent))}:${pad(parseInt(displayMinutes.textContent))}:${pad(parseInt(displaySeconds.textContent))}`;
        const listItem = document.createElement('li');
        listItem.textContent = `Lap ${lapNumber++}: ${lapTime}`;
        lapList.appendChild(listItem);
    }
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}