let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn'); // Added lap button reference
const lapsList = document.getElementById('lapsList');

function startPause() {
    if (isRunning) {
        clearInterval(timer);
        startPauseBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        startPauseBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    isRunning = false;
    display.textContent = '00:00:00';
    startPauseBtn.textContent = 'Start';
    lapsList.innerHTML = '';
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    const time = new Date(elapsedTime);
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(time.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function addLap() {
    const lapItem = document.createElement('li');
    lapItem.textContent = display.textContent;
    lapsList.appendChild(lapItem);
}

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', addLap); // Added event listener for lap button

document.addEventListener('keydown', (event) => {
    if (event.key === 'l') {
        addLap();
    }
});
