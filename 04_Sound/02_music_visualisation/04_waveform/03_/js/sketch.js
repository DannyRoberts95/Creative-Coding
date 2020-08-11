
let song;
let radius;
let ampScaleFactor = 0.5;
// let songName = "FourTet";
let songName = "Mount Kimbie - Carbonated";

function preload() {
  soundFormats("mp3", "ogg");
  // song = loadSound("../data/song");
  // song = loadSound("../data/tool-lateralus-audio");
  song = loadSound("../../data/" + songName);
  song.play();
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
  radius = 250;
  amp = width;
  strokeW = 5;
}

function draw() {
  fill(0, 10);
  noStroke();
  rect(0, 0, width, height);
  stroke(100, 40);
  strokeWeight(strokeW);

  displaySongData();

  amp = mouseX;
  let bins = 64*4;
  let waveform = fft.waveform(bins);

  push();
  translate(width / 2, height / 2);

  for (let i = 0; i < bins; i++) {
    const aor = map(i, 0, bins, 0, 360);    
    push()
    rotate(aor);
    translate(0,radius)
    let h = map(waveform[i],-1,1,-amp,amp);
    line(0,-h,0,h);
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
