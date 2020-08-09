let song;
let playing = false;
let songLength;
let amplitude;
let sampleR;
let timerInterval;
let timer = 0;
let strokeW;
let innerRadius;
let maxLineHeight;
let ampScaleFactor = 0.5;

function preload() {
  soundFormats("mp3", "ogg");
  // song = loadSound("../data/song");
  // song = loadSound("../data/tool-lateralus-audio");
  song = loadSound("../data/song-for-the-dead");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  strokeCap(ROUND);
  colorMode(HSB, 360, 100, 100, 100);

  songLength = song.duration();
  console.log(`Song Length: ${songLength}`);
  fft = new p5.FFT();
  song.amp(0.2);

  innerRadius = 50;
  maxLineHeight = 250;
}

function draw() {
  background(220);

  let bins = 64 * 8;
  let spectrum = fft.analyze(bins);
  noStroke();
  fill(0);

  push();
  translate(width / 2, height / 2);
  rotate(frameCount / 10);
  for (let i = 0; i < bins; i++) {
    const aor = map(i, 0, bins, 0,720);
    rotate(aor);
    push();
    translate(0, -innerRadius);
    let h = map(spectrum[i], 0, 255, 0, maxLineHeight);
    stroke(0);
    strokeWeight(2);
    if (h > 0) line(0, h * 0.1, 0, -h);
    pop();
  }
  pop();

  // let waveform = fft.waveform();
  // noFill();
  // beginShape();
  // stroke(20);
  // for (let i = 0; i < waveform.length; i++) {
  //   let x = map(i, 0, waveform.length, 0, width);
  //   let y = map(waveform[i], -1, 1, 0, height);
  //   vertex(x, y);
  // }
  // endShape();
}

function keyPressed() {
  let saveStr = `${new Date()}`;
  if (key == "s" || key == "S") saveCanvas(saveStr, "png");

  if (key == "p" || key == "P") {
    if (song.isPlaying()) {
      song.stop();
    } else {
      song.play();
    }
    playing = !playing;
  }
}
