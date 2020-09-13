let song;
let radius;
let ampScaleFactor = 0.5;
let songName = "FourTet";
// let songName = "tool";

function preload() {
  soundFormats("mp3", "ogg");
  // song = loadSound("../data/song");
  // song = loadSound("../data/tool-lateralus-audio");
  song = loadSound("../../data/" + songName);
  song.play();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  strokeCap(ROUND);
  colorMode(HSB, 360, 100, 100, 100);

  songLength = song.duration();
  console.log(`Song Length: ${songLength}`);
  fft = new p5.FFT();
  amplitude = new p5.Amplitude();
  song.amp(0.2);
  radius = 300;
  amp = 1000;
  strokeW = 12;
  ringNum = 1;
  ringGap = 20;
  alpha = 50;

  background(0);
}

function draw() {
  fill(0, 5);
  noStroke();
  rect(0, 0, width, height);
  strokeCap(SQUARE);

  let level = amplitude.getLevel();
  innerRadius = map(level, 0, 1, 150, 500);
  ringOffset = map(level, 0, 1, 0, 360);
  // sw = map(level, 0, 1, 0, strokeW);

  push();  
  translate(width / 2, height / 2);
  stroke(0, 0, 100, alpha*0.85);
  strokeWeight(strokeW*0.25);
  displaySongData(0, 0, radius, 64*4, amp, true);
 
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

const displaySongData = (x, y, r, bins, a, inverted) => {
  let waveform = fft.waveform(bins);
  push();
  translate(x, y);
  for (let i = 0; i < bins; i++) {
    const aor = map(i, 0, bins, 0, 360);
    push();
    rotate(aor);
    translate(0, r);
    let h = map(waveform[i], -1, 1, -a, a);
    // line(0, -h, 0, h);
    inverted ? line(0, 0, 0, -abs(h)) : line(0, 0, 0, abs(h));
    // line(0, 0, 0, abs(h));

    pop();
  }
  pop();
};
