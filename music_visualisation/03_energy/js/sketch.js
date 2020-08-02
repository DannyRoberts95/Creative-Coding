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

let ranges = [
  { min: "bass", max: "lowMid" },
  { min: "lowMid", max: "mid" },
  { min: "highMid", max: "treble" },
];

function preload() {
  soundFormats("mp3", "ogg");
  // song = loadSound("../data/song");
  song = loadSound("../data/tool-lateralus-audio");
  // song = loadSound("../data/song-for-the-dead");
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

  let spectrum = fft.analyze();

  push();
  translate(0, height / 2);
  // rotate(frameCount / 10);
  
  let radi = [];
  for (let i = 0; i < ranges.length; i++) {
    const energy = fft.getEnergy(ranges[i].min, ranges[i].max);
    const r = map(energy, 0, 255, 0, 100 * i);
    stroke(0)
    fill(0);
    ellipse(100+(100*i), 0, r * 2); 
  }
  

  pop();

  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(20);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    vertex(x, y);
  }
  endShape();
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
