// --- THEME MANAGEMENT ---
function setTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('soft-chrono-theme', themeName);
}

// Load saved theme
const savedTheme = localStorage.getItem('soft-chrono-theme');
if (savedTheme) setTheme(savedTheme);


// --- TAB MANAGEMENT ---
function switchTab(tab) {
    const swView = document.getElementById('view-stopwatch');
    const tmView = document.getElementById('view-timer');
    const swTab = document.getElementById('tab-stopwatch');
    const tmTab = document.getElementById('tab-timer');

    if (tab === 'stopwatch') {
        swView.classList.remove('hidden');
        tmView.classList.add('hidden');
        swTab.classList.replace('tab-inactive', 'tab-active');
        tmTab.classList.replace('tab-active', 'tab-inactive');
    } else {
        tmView.classList.remove('hidden');
        swView.classList.add('hidden');
        tmTab.classList.replace('tab-inactive', 'tab-active');
        swTab.classList.replace('tab-active', 'tab-inactive');
    }
}


// --- STOPWATCH LOGIC ---
let swInterval;
let swStartTime = 0;
let swElapsedTime = 0;
let swRunning = false;
let swLaps = [];

function formatTime(ms) {
    let date = new Date(ms);
    let h = String(Math.floor(ms / (1000 * 60 * 60))).padStart(2, '0');
    let m = String(date.getUTCMinutes()).padStart(2, '0');
    let s = String(date.getUTCSeconds()).padStart(2, '0');
    let mil = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return { h, m, s, mil };
}

function updateStopwatchDisplay() {
    const { h, m, s, mil } = formatTime(swElapsedTime);

    // Format HH:MM only if hours > 0
    if (h === '00') {
        document.getElementById('sw-display-main').textContent = `${m}:${s}`;
        document.getElementById('sw-display-seconds').textContent = "";
        document.getElementById('sw-display-ms').textContent = mil;
        document.querySelector('.opacity-50').style.display = 'inline'; // dot
    } else {
        document.getElementById('sw-display-main').textContent = `${h}:${m}`;
        document.getElementById('sw-display-seconds').textContent = s;
        document.getElementById('sw-display-seconds').style.display = 'inline';
        document.getElementById('sw-display-ms').textContent = mil;
    }
}

function toggleStopwatch() {
    const btnIcon = document.getElementById('sw-icon-toggle');

    if (swRunning) {
        // Pause
        clearInterval(swInterval);
        swRunning = false;
        btnIcon.classList.replace('ph-pause-fill', 'ph-play-fill');
    } else {
        // Start
        const now = Date.now();
        const startPoint = now - swElapsedTime;

        swInterval = setInterval(() => {
            swElapsedTime = Date.now() - startPoint;
            updateStopwatchDisplay();
        }, 10);

        swRunning = true;
        btnIcon.classList.replace('ph-play-fill', 'ph-pause-fill');
    }
}

function resetStopwatch() {
    clearInterval(swInterval);
    swRunning = false;
    swElapsedTime = 0;
    swLaps = [];

    document.getElementById('sw-display-main').textContent = "00:00";
    document.getElementById('sw-display-seconds').textContent = "00";
    document.getElementById('sw-display-ms').textContent = "00";
    document.getElementById('sw-icon-toggle').classList.replace('ph-pause-fill', 'ph-play-fill');

    renderLaps();
}

function lapStopwatch() {
    if (!swRunning) return;
    const { h, m, s, mil } = formatTime(swElapsedTime);
    swLaps.unshift(`${h !== '00' ? h + ':' : ''}${m}:${s}.${mil}`);
    renderLaps();
}

function renderLaps() {
    const container = document.getElementById('sw-laps');
    container.innerHTML = swLaps.map((lap, index) => `
        <div class="flex justify-between px-4 py-2 bg-[var(--bg-color)] rounded-lg">
            <span>Lap ${swLaps.length - index}</span>
            <span class="font-mono font-bold">${lap}</span>
        </div>
    `).join('');
}


// --- TIMER LOGIC ---
let tmInterval;
let tmTotalTime = 0;
let tmRemaining = 0;
let tmRunning = false;
let tmEndTime = 0;

function setPreset(m, s) {
    document.getElementById('input-h').value = '';
    document.getElementById('input-m').value = m;
    document.getElementById('input-s').value = s === 0 ? '' : s;
}

function startTimer() {
    const h = parseInt(document.getElementById('input-h').value) || 0;
    const m = parseInt(document.getElementById('input-m').value) || 0;
    const s = parseInt(document.getElementById('input-s').value) || 0;

    const totalMs = (h * 3600 + m * 60 + s) * 1000;
    if (totalMs <= 0) return;

    tmTotalTime = totalMs;
    tmRemaining = totalMs;
    tmEndTime = Date.now() + tmRemaining;

    // UI Switch
    document.getElementById('timer-setup').classList.add('hidden');
    document.getElementById('timer-running').classList.replace('hidden', 'flex');

    runTimerLoop();
}

function runTimerLoop() {
    tmRunning = true;
    document.getElementById('tm-btn-pause').textContent = "Pause";

    // Update immediately to avoid lag
    updateTimerDisplay();

    tmInterval = setInterval(() => {
        const now = Date.now();
        tmRemaining = tmEndTime - now;

        if (tmRemaining <= 0) {
            tmRemaining = 0;
            finishTimer();
        }
        updateTimerDisplay();
    }, 100); // 100ms is enough for timer
}

function updateTimerDisplay() {
    // Calculate text first to determine length
    let seconds = Math.ceil(tmRemaining / 1000);
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;

    const format = (num) => String(num).padStart(2, '0');
    let timeString = "";
    let isShort = false;

    if (h > 0) {
        timeString = `${format(h)}:${format(m)}:${format(s)}`;
    } else {
        timeString = `${format(m)}:${format(s)}`;
        isShort = true;
    }

    document.getElementById('tm-display').textContent = timeString;

    // Calculate progress circle adaptive radius
    const circle = document.getElementById('timer-progress');
    // Base radius 130 is good for HH:MM:SS (8 chars)
    // For MM:SS (5 chars), we can shrink it to keep it "adaptive" / tight

    const radius = isShort ? 100 : 130;
    const circumference = 2 * Math.PI * radius;

    // We also need to update the background circle if we want it to match...
    const bgCircle = circle.previousElementSibling;
    if (bgCircle) bgCircle.setAttribute('r', radius);
    circle.setAttribute('r', radius);

    const progress = tmRemaining / tmTotalTime;
    const dashoffset = circumference - (progress * circumference);
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = dashoffset;
}

function toggleTimerPause() {
    if (tmRunning) {
        // Pause
        clearInterval(tmInterval);
        tmRunning = false;
        document.getElementById('tm-btn-pause').textContent = "Resume";
    } else {
        // Resume
        tmEndTime = Date.now() + tmRemaining;
        runTimerLoop();
    }
}

function resetTimer() {
    clearInterval(tmInterval);
    tmRunning = false;
    document.getElementById('timer-running').classList.replace('flex', 'hidden');
    document.getElementById('timer-setup').classList.remove('hidden');

    // Stop sound if playing
    const audio = document.getElementById('alarm-sound');
    audio.pause();
    audio.currentTime = 0;
}

function finishTimer() {
    clearInterval(tmInterval);
    tmRunning = false;
    updateTimerDisplay(); // Show 00:00:00

    // Play sound
    const audio = document.getElementById('alarm-sound');
    audio.play().catch(e => console.log("Audio play failed req interaction", e));

    document.getElementById('tm-btn-pause').textContent = "Finished";
}

// Initialize display for Stopwatch
updateStopwatchDisplay();