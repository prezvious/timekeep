import test from "node:test";
import assert from "node:assert/strict";
import {
  Stopwatch,
  Countdown,
  durationFromFields,
  formatTime,
} from "../timekeeper.mjs";

test("stopwatch preserves elapsed time across pause/resume and a delayed refresh", () => {
  const watch = new Stopwatch();
  watch.start(100);
  assert.equal(watch.elapsed(2100), 2000);
  watch.pause(2500);
  assert.equal(watch.elapsed(10000), 2400);
  watch.start(10000);
  assert.equal(watch.elapsed(3610000), 3602400);
});

test("laps record split and total time, excluding paused time", () => {
  const watch = new Stopwatch();
  assert.equal(watch.lap(0), null);
  watch.start(0);
  assert.deepEqual(watch.lap(1000), { number: 1, split: 1000, total: 1000 });
  watch.pause(2000);
  assert.equal(watch.lap(3000), null);
  watch.start(10000);
  assert.deepEqual(watch.lap(11000), { number: 2, split: 2000, total: 3000 });
  watch.reset();
  assert.equal(watch.elapsed(12000), 0);
  assert.deepEqual(watch.laps, []);
  assert.equal(watch.running, false);
});

test("starting an already-running stopwatch does not lose elapsed time", () => {
  const watch = new Stopwatch();
  watch.start(100);
  watch.start(1000);
  assert.equal(watch.elapsed(1100), 1000);
});

test("countdown uses its deadline and finishes exactly once after delayed updates", () => {
  const timer = new Countdown();
  timer.start(5000, 1000);
  assert.equal(timer.remaining(2000), 4000);
  assert.equal(timer.update(5000), false);
  assert.equal(timer.update(8000), true);
  assert.equal(timer.remaining(8000), 0);
  assert.equal(timer.state, "finished");
  assert.equal(timer.update(9000), false);
  assert.equal(timer.resume(9000), false);
});

test("countdown pause and resume preserve exact remaining milliseconds", () => {
  const timer = new Countdown();
  timer.start(5000, 1000);
  timer.pause(2200);
  assert.equal(timer.remaining(50000), 3800);
  assert.equal(timer.resume(50000), true);
  assert.equal(timer.remaining(51000), 2800);
  timer.reset();
  assert.equal(timer.state, "idle");
  assert.equal(timer.remaining(52000), 0);
  assert.equal(timer.resume(52000), false);
});

test("pausing an expired countdown cannot create a resumable zero timer", () => {
  const timer = new Countdown();
  timer.start(1000, 0);
  timer.pause(1500);
  assert.equal(timer.state, "finished");
  assert.equal(timer.resume(2000), false);
});

test("invalid durations do not start the countdown", () => {
  const timer = new Countdown();
  for (const duration of [0, -1, NaN, Infinity]) {
    assert.equal(timer.start(duration, 0), false);
    assert.equal(timer.state, "idle");
  }
});

test("duration fields enforce whole numbers and supported ranges", () => {
  assert.equal(durationFromFields("", "", ""), 0);
  assert.equal(durationFromFields("1", "2", "3"), 3723000);
  assert.equal(durationFromFields("99", "59", "59"), 359999000);
  for (const fields of [
    ["100", "0", "0"],
    ["0", "60", "0"],
    ["0", "0", "60"],
    ["-1", "0", "0"],
    ["0", "1.5", "0"],
    ["0", "no", "0"],
  ]) {
    assert.equal(durationFromFields(...fields), null);
  }
});

test("formatting handles hour boundaries, long durations, and countdown rounding", () => {
  assert.equal(formatTime(59999, { hundredths: true }), "00:59.99");
  assert.equal(formatTime(3600000), "01:00:00");
  assert.equal(formatTime(360000000), "100:00:00");
  assert.equal(formatTime(1, { countdown: true }), "00:01");
  assert.equal(formatTime(-1, { countdown: true }), "00:00");
});
