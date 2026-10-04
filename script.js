import {
  Stopwatch,
  Countdown,
  durationFromFields,
  formatTime,
} from "./timekeeper.mjs";

const $ = (id) => document.getElementById(id);
const stopwatch = new Stopwatch();
const countdown = new Countdown();
const themeNames = [
  "neutral",
  "matcha",
  "berry",
  "ocean",
  "sunset",
  "lavender",
];
const inputs = [$("input-h"), $("input-m"), $("input-s")];
let activeTab = "stopwatch";
let animationFrame = 0;
let timerInterval = 0;
let audioContext;
let soundEnabled = readPreference("timekeep-sound") !== "off";

function readPreference(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Timing works with storage disabled. */
  }
}
function announce(message) {
  $("live-status").textContent = message;
}
function setIcon(button, name) {
  button.querySelector("use").setAttribute("href", `assets/icons.svg#${name}`);
}
function setButton(button, label, icon) {
  button.querySelector("span").textContent = label;
  setIcon(button, icon);
}
function setState(element, state, label) {
  element.dataset.state = state;
  element.lastElementChild.textContent = label;
}
function setTheme(theme, save = true) {
  const selected = themeNames.includes(theme) ? theme : "neutral";
  document.body.dataset.theme = selected;
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.themeChoice === selected),
    );
  });
  document.querySelector('meta[name="theme-color"]').content = getComputedStyle(
    document.body,
  )
    .getPropertyValue("--canvas")
    .trim();
  if (save) {
    savePreference("timekeep-theme", selected);
    announce(
      `${selected[0].toUpperCase() + selected.slice(1)} theme selected.`,
    );
  }
}
// Only this version's explicit theme choices opt a user into color.
setTheme(readPreference("timekeep-theme"), false);
document
  .querySelectorAll("[data-theme-choice]")
  .forEach((button) =>
    button.addEventListener("click", () =>
      setTheme(button.dataset.themeChoice),
    ),
  );

function switchTab(tab, focus = false) {
  activeTab = tab;
  for (const name of ["stopwatch", "timer"]) {
    const selected = name === tab;
    $("tab-" + name).setAttribute("aria-selected", String(selected));
    $("tab-" + name).tabIndex = selected ? 0 : -1;
    $("view-" + name).hidden = !selected;
  }
  $("lap-panel").hidden = tab !== "stopwatch";
  $("preset-panel").hidden = tab !== "timer";
  if (focus) $("tab-" + tab).focus();
  if (tab === "timer") document.title = "TimeKeep — A little space to focus";
  renderStopwatch();
  renderTimer();
}
for (const name of ["stopwatch", "timer"]) {
  $("tab-" + name).addEventListener("click", () => switchTab(name));
  $("tab-" + name).addEventListener("keydown", (event) => {
    if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      switchTab(
        event.key === "Home"
          ? "stopwatch"
          : event.key === "End"
            ? "timer"
            : name === "timer"
              ? "stopwatch"
              : "timer",
        true,
      );
    }
  });
}
function drawTicks(id) {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < 60; index++) {
    const angle = (index / 60) * Math.PI * 2 - Math.PI / 2;
    const major = index % 5 === 0;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    const inner = major ? 139 : 144;
    line.setAttribute("x1", 180 + Math.cos(angle) * inner);
    line.setAttribute("y1", 180 + Math.sin(angle) * inner);
    line.setAttribute("x2", 180 + Math.cos(angle) * 149);
    line.setAttribute("y2", 180 + Math.sin(angle) * 149);
    if (major) line.classList.add("major-tick");
    fragment.append(line);
  }
  $(id).append(fragment);
}
drawTicks("sw-ticks");
drawTicks("tm-ticks");

function renderStopwatch() {
  const elapsed = stopwatch.elapsed();
  const time = formatTime(elapsed, { hundredths: true }).split(".");
  $("sw-display-main").textContent = time[0];
  $("sw-display-ms").textContent = "." + time[1];
  $("sw-caption").textContent =
    elapsed >= 3600000 ? "hours · minutes · seconds" : "minutes · seconds";
  $("sw-dial").classList.toggle("long-time", elapsed >= 3600000);
  $("sw-hand").style.transform =
    `rotate(${((elapsed % 60000) / 60000) * 360}deg)`;
  setState(
    $("sw-state"),
    stopwatch.running ? "running" : elapsed > 0 ? "paused" : "idle",
    stopwatch.running ? "Running" : elapsed > 0 ? "Paused" : "Ready",
  );
  setButton(
    $("sw-toggle"),
    stopwatch.running
      ? "Pause stopwatch"
      : elapsed > 0
        ? "Resume stopwatch"
        : "Start stopwatch",
    stopwatch.running ? "pause" : "play",
  );
  $("sw-reset").disabled = !stopwatch.running && elapsed === 0;
  $("sw-lap").disabled = !stopwatch.running;
}
function stopwatchFrame() {
  renderStopwatch();
  if (stopwatch.running) animationFrame = requestAnimationFrame(stopwatchFrame);
}
function toggleStopwatch() {
  cancelAnimationFrame(animationFrame);
  if (stopwatch.running) {
    stopwatch.pause();
    announce(`Stopwatch paused at ${formatTime(stopwatch.elapsed())}.`);
  } else {
    stopwatch.start();
    announce("Stopwatch running.");
    animationFrame = requestAnimationFrame(stopwatchFrame);
  }
  renderStopwatch();
}
function resetStopwatch() {
  cancelAnimationFrame(animationFrame);
  stopwatch.reset();
  renderStopwatch();
  renderLaps();
  announce("Stopwatch and laps reset.");
}
function renderLaps() {
  $("lap-count").textContent = String(stopwatch.laps.length);
  $("laps-empty").hidden = stopwatch.laps.length > 0;
  $("lap-table-wrap").hidden = stopwatch.laps.length === 0;
  $("sw-laps").replaceChildren();
  $("sw-laps")
    .closest("table")
    .classList.toggle("long-laps", stopwatch.elapsed() >= 3600000);
  for (const lap of [...stopwatch.laps].reverse()) {
    const row = document.createElement("tr");
    for (const text of [
      String(lap.number).padStart(2, "0"),
      formatTime(lap.split, { hundredths: true }),
      formatTime(lap.total, { hundredths: true }),
    ]) {
      const cell = document.createElement("td");
      cell.textContent = text;
      row.append(cell);
    }
    $("sw-laps").append(row);
  }
  $("lap-table-wrap").scrollTop = 0;
}
function recordLap() {
  const lap = stopwatch.lap();
  if (!lap) return;
  renderLaps();
  announce(
    `Lap ${lap.number}: ${formatTime(lap.split, { hundredths: true })}.`,
  );
}
$("sw-toggle").addEventListener("click", toggleStopwatch);
$("sw-reset").addEventListener("click", resetStopwatch);
$("sw-lap").addEventListener("click", recordLap);

function clearTimerError() {
  $("timer-error").hidden = true;
  inputs.forEach((input) => input.removeAttribute("aria-invalid"));
}
function updatePresetSelection() {
  const duration = durationFromFields(...inputs.map((input) => input.value));
  document.querySelectorAll("[data-minutes]").forEach((button) => {
    const selected = duration === Number(button.dataset.minutes) * 60000;
    button.setAttribute("aria-pressed", String(selected));
    setIcon(button, selected ? "check" : "arrow-up-right");
  });
}
inputs.forEach((input) =>
  input.addEventListener("input", () => {
    clearTimerError();
    updatePresetSelection();
  }),
);
inputs.forEach((input) =>
  input.addEventListener("blur", () => {
    if (input.value !== "" && input.validity.valid)
      input.value = String(Number(input.value)).padStart(2, "0");
  }),
);
document.querySelectorAll("[data-minutes]").forEach((button) =>
  button.addEventListener("click", () => {
    if (countdown.state !== "idle") return;
    inputs[0].value = "00";
    inputs[1].value = button.dataset.minutes.padStart(2, "0");
    inputs[2].value = "00";
    clearTimerError();
    updatePresetSelection();
    announce(`Duration set to ${button.dataset.minutes} minutes.`);
  }),
);
function renderTimer() {
  const state = countdown.state;
  const idle = state === "idle";
  const finished = state === "finished";
  const remaining = countdown.remaining();
  $("timer-setup").hidden = !idle;
  $("tm-display").hidden = idle;
  $("tm-display").textContent = formatTime(remaining, { countdown: true });
  $("tm-dial").classList.toggle("long-time", remaining >= 3600000);
  $("tm-label").textContent = idle
    ? "Set your duration"
    : finished
      ? "Time’s up"
      : state === "paused"
        ? "Take your time"
        : "Time remaining";
  $("tm-caption").textContent = idle
    ? "A small commitment to your focus."
    : finished
      ? "A moment well spent. Ready for the next?"
      : state === "paused"
        ? "Your countdown is paused."
        : "One thing at a time.";
  $("timer-progress").style.strokeDashoffset = String(
    idle ? 0 : 100 - (remaining / countdown.duration) * 100,
  );
  setState(
    $("tm-state"),
    state,
    idle
      ? "Ready"
      : finished
        ? "Complete"
        : state === "paused"
          ? "Paused"
          : "Running",
  );
  setButton(
    $("tm-toggle"),
    idle
      ? "Start countdown"
      : finished
        ? "Start again"
        : state === "paused"
          ? "Resume countdown"
          : "Pause countdown",
    state === "running" ? "pause" : "play",
  );
  $("tm-reset").querySelector("span").textContent =
    idle || finished ? "Reset" : "Cancel";
  document.querySelectorAll("[data-minutes]").forEach((button) => {
    button.disabled = !idle;
  });
}
function unlockAudio() {
  if (!soundEnabled) return;
  try {
    audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
    audioContext.resume().catch(() => {});
  } catch {
    /* Visible completion works without audio. */
  }
}
function playChime() {
  if (!soundEnabled || !audioContext || audioContext.state !== "running")
    return;
  const now = audioContext.currentTime;
  [659.25, 783.99, 987.77].forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = now + index * 0.16;
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.1, start + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.65);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.7);
  });
}
function updateTimer(now = Date.now()) {
  if (countdown.update(now)) {
    clearInterval(timerInterval);
    playChime();
    announce("Time’s up. Your countdown is complete.");
    if (activeTab !== "timer") document.title = "Time’s up — TimeKeep";
  }
  renderTimer();
}
function startTimer() {
  const duration = durationFromFields(...inputs.map((input) => input.value));
  if (duration === null || duration === 0) {
    $("timer-error").textContent =
      duration === null
        ? "Use whole numbers: 0–99 hours and 0–59 minutes or seconds."
        : "Set a duration of at least one second to get started.";
    $("timer-error").hidden = false;
    const invalid = inputs.find((input) => !input.validity.valid) || inputs[1];
    invalid.setAttribute("aria-invalid", "true");
    invalid.focus();
    return;
  }
  clearTimerError();
  unlockAudio();
  countdown.start(duration);
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 100);
  announce(`Countdown started for ${formatTime(duration)}.`);
  renderTimer();
}
function toggleTimer() {
  // Preserve an expired timer's completion event before changing its state.
  const now = Date.now();
  const previousState = countdown.state;
  updateTimer(now);
  if (previousState === "running" && countdown.state === "finished") return;
  if (countdown.state === "running") {
    countdown.pause(now);
    clearInterval(timerInterval);
    announce("Countdown paused.");
  } else if (countdown.state === "paused") {
    unlockAudio();
    countdown.resume();
    timerInterval = setInterval(updateTimer, 100);
    announce("Countdown resumed.");
  } else {
    startTimer();
  }
  renderTimer();
}
function resetTimer() {
  clearInterval(timerInterval);
  const wasIdle = countdown.state === "idle";
  countdown.reset();
  if (wasIdle) {
    inputs[0].value = "00";
    inputs[1].value = "25";
    inputs[2].value = "00";
  }
  clearTimerError();
  updatePresetSelection();
  renderTimer();
  document.title = "TimeKeep — A little space to focus";
  announce("Countdown reset. Choose a duration to start again.");
}
$("tm-toggle").addEventListener("click", toggleTimer);
$("tm-reset").addEventListener("click", resetTimer);
function renderSound() {
  $("sound-toggle").setAttribute("aria-pressed", String(soundEnabled));
  setIcon($("sound-toggle"), soundEnabled ? "volume-2" : "volume-x");
}
$("sound-toggle").addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  savePreference("timekeep-sound", soundEnabled ? "on" : "off");
  renderSound();
  if (soundEnabled) unlockAudio();
  announce(`Completion sound ${soundEnabled ? "on" : "off"}.`);
});

document.addEventListener("keydown", (event) => {
  if (
    event.repeat ||
    event.ctrlKey ||
    event.altKey ||
    event.metaKey ||
    event.shiftKey ||
    event.target.closest("input, textarea, select, [contenteditable]") ||
    document.querySelector("[popover]:popover-open")
  )
    return;
  const key = event.key.toLowerCase();
  if (key === " " && !event.target.closest("button, a")) {
    event.preventDefault();
    activeTab === "stopwatch" ? toggleStopwatch() : toggleTimer();
  } else if (key === "l" && activeTab === "stopwatch") {
    recordLap();
  } else if (key === "r") {
    activeTab === "stopwatch" ? resetStopwatch() : resetTimer();
  } else if (key === "1" || key === "2") {
    switchTab(key === "1" ? "stopwatch" : "timer", true);
  }
});
document.addEventListener("visibilitychange", () => {
  renderStopwatch();
  updateTimer();
});
const today = new Date();
$("today").dateTime =
  `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
$("today").textContent = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  month: "short",
  day: "numeric",
}).format(today);
renderStopwatch();
renderTimer();
renderSound();
