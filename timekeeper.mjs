// Pure timing state. UI refresh frequency never determines elapsed time.
export class Stopwatch {
  running = false;
  accumulated = 0;
  startedAt = 0;
  laps = [];

  elapsed(now = performance.now()) {
    return (
      this.accumulated + (this.running ? Math.max(0, now - this.startedAt) : 0)
    );
  }
  start(now = performance.now()) {
    if (this.running) return;
    this.startedAt = now;
    this.running = true;
  }
  pause(now = performance.now()) {
    this.accumulated = this.elapsed(now);
    this.running = false;
  }
  reset() {
    this.running = false;
    this.accumulated = 0;
    this.startedAt = 0;
    this.laps = [];
  }
  lap(now = performance.now()) {
    if (!this.running) return null;
    const total = this.elapsed(now);
    const previous = this.laps.at(-1)?.total ?? 0;
    const lap = {
      number: this.laps.length + 1,
      split: total - previous,
      total,
    };
    this.laps.push(lap);
    return lap;
  }
}

export class Countdown {
  state = "idle";
  duration = 0;
  pausedRemaining = 0;
  deadline = 0;

  remaining(now = Date.now()) {
    if (this.state === "running") return Math.max(0, this.deadline - now);
    if (this.state === "paused") return this.pausedRemaining;
    return 0;
  }
  start(duration, now = Date.now()) {
    if (!Number.isFinite(duration) || duration <= 0) return false;
    this.duration = duration;
    this.pausedRemaining = duration;
    this.deadline = now + duration;
    this.state = "running";
    return true;
  }
  update(now = Date.now()) {
    if (this.state !== "running" || this.remaining(now) > 0) return false;
    this.state = "finished";
    this.pausedRemaining = 0;
    return true;
  }
  pause(now = Date.now()) {
    if (this.state !== "running") return;
    if (this.update(now)) return;
    this.pausedRemaining = this.remaining(now);
    this.state = "paused";
  }
  resume(now = Date.now()) {
    if (this.state !== "paused") return false;
    this.deadline = now + this.pausedRemaining;
    this.state = "running";
    return true;
  }
  reset() {
    this.state = "idle";
    this.duration = 0;
    this.pausedRemaining = 0;
    this.deadline = 0;
  }
}

export function durationFromFields(hours, minutes, seconds) {
  const values = [hours, minutes, seconds].map((value) =>
    value === "" ? 0 : Number(value),
  );
  if (
    values.some(
      (value, index) =>
        !Number.isInteger(value) ||
        value < 0 ||
        value > (index === 0 ? 99 : 59),
    )
  )
    return null;
  return (values[0] * 3600 + values[1] * 60 + values[2]) * 1000;
}

export function formatTime(
  milliseconds,
  { countdown = false, hundredths = false } = {},
) {
  const ms = Math.max(0, milliseconds);
  const totalSeconds = countdown ? Math.ceil(ms / 1000) : Math.floor(ms / 1000);
  const pad = (value) => String(value).padStart(2, "0");
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = totalSeconds % 60;
  const time = `${hours > 0 ? pad(hours) + ":" : ""}${pad(minutes)}:${pad(seconds)}`;
  return time + (hundredths ? `.${pad(Math.floor(ms / 10) % 100)}` : "");
}
