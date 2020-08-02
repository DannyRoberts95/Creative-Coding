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
  song = loadSound("../data/song");
  // song = loadSound("data/tool-lateralus-audio");
}

function setup() {
  createCanvas(windowHeight, windowHeight);
  angleMode(DEGREES);
  strokeCap(ROUND);
  colorMode(HSB, 360, 100, 100, 100);

  songLength = song.duration();
  console.log(`Song Length: ${songLength}`);
  amplitude = new p5.Amplitude();
  song.amp(1);

  fft = new p5.FFT();
  

  sampleRateMilliseconds = 250;
  strokeW = 2;
  innerRadius = 100;
  maxLineHeight = 200;

  background(0);
}

function draw() {
  let level = amplitude.getLevel();
  noStroke();
  fill(255, 0, 255);
  
  let h = map(level, 0, ampScaleFactor, 0, maxLineHeight);

  push();
  translate(width / 2, height / 2);
  const aor = map(timer, 0, songLength, 0, 360);
  rotate(aor);

  strokeWeight(strokeW);
  push();
  translate(0, -innerRadius);
  stroke(100);
  line(0, 0, 0, -h);
  pop();

  pop();

  if (!song.isPlaying()) stopSong();
}

function keyPressed() {
  let saveStr = `${new Date()}`;
  if (key == "s" || key == "S") saveCanvas(saveStr, "png");

  if (key == "p" || key == "P") {
    if (playing) {
      playSong();
    } else {
      stopSong();
    }
    playing = !playing;
  }
}

const playSong = () => {
  console.log("PLAY SONG");
  song.play();
  timerInterval = setInterval(function () {
    timer += sampleRateMilliseconds / 1000;
  }, sampleRateMilliseconds);
  timer = 0;
};

const stopSong = () => {
  console.log("STOP SONG");
  song.stop();
  clearInterval(timerInterval);
};
