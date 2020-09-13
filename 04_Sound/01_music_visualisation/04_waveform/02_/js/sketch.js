let song;
let playing = false;
let songLength;
let amplitude;
let sampleR;
let timerInterval;
let timer = 0;
let strokeW;
let radius;
let maxLineHeight;
let ampScaleFactor = 0.5;

// let songName = "FourTet";
// let songName = "Mount Kimbie - Carbonated";
let songName = "Mount Kimbie - Before I Move Off (Official Video)";

function preload() {
  soundFormats("mp3", "ogg");
  // song = loadSound("../data/song");
  // song = loadSound("../data/tool-lateralus-audio");
  song = loadSound("../../data/" + songName);
  song.play()
}

function setup() {
  createCanvas(windowHeight, windowHeight);
  angleMode(DEGREES);
  strokeCap(ROUND);
  colorMode(HSB, 360, 100, 100, 100);

  songLength = song.duration();
  console.log(`Song Length: ${songLength}`);
  fft = new p5.FFT();
  song.amp(0.2);
  radius = 1000;
  amp = radius;
  strokeW = 10;
}

function draw() {
  fill(0);
  rect(0, 0, width, height);

  displaySongData();

  let bins = 64;
  let waveform = fft.waveform(bins);
  amp = width;

  let vertical = false;

  push();
  vertical ? translate(width / 2, 0) : translate(0, height / 2);
  for (let i = 0; i < bins; i++) {
    const off = vertical
      ? map(i, 0, bins, 0, height)
      : map(i, 0, bins, 0, width);
    push();
    vertical ? translate(0, off) : translate(off, 0);
    let h = map(waveform[i], -1, 1, -amp, amp);
    stroke(100, 20);
    strokeWeight(strokeW);
    vertical ? line(-h, 0, h, 0) : line(0, -h, 0, h);
    pop();
  }
  pop();
}

function keyPressed() {
  let saveStr = songName;
  if (key == "s" || key == "S") saveCanvas(saveStr, "png");

  if (key == "p" || key == "P") {
    if (song.isPlaying()) {
      song.stop();
    } else {
      song.play();
    }
  }
}

const displaySongData = () => {};
