const SVG = false;

let song;
let playing = false;
let songLength;
let amplitude;
let sampleR;
let timerInterval;

let timer = 0;
let strokeW = 0.75;
let innerRadius = 100;
let maxLineHeight = 270;
let ampScaleFactor = 1.5;
let sampleRateMilliseconds = 500;
let alpha = 5;

let backgroundCol;
let strokeCol;
let strokeCol2;

// let songName = "FourTet";
// let songName = "Mount Kimbie - Carbonated";
// let songName = "Mount Kimbie - Before I Move Off (Official Video)";
let songName = "Daft Punk - Technologic";

function preload() {
  soundFormats("mp3", "ogg");
  song = loadSound("../data/"+songName);
}

function setup() {
  SVG
    ? createCanvas(windowHeight, windowHeight, SVG)
    : createCanvas(windowHeight, windowHeight);
  angleMode(DEGREES);
  strokeCap(ROUND);
  colorMode(HSB, 360, 100, 100, 100);

  songLength = song.duration();
  console.log(`Song Length: ${songLength}`);
  amplitude = new p5.Amplitude();
  fft = new p5.FFT();
  song.amp(ampScaleFactor);

  backgroundCol = color(0, 100, 0);
  strokeCol2 = color(125, 50, 100, alpha);
  strokeCol = color(0,100,66, alpha);
  // strokeCol2 = color(100, alpha);

  background(backgroundCol);
}

function draw() {
  let level = amplitude.getLevel();
  let lerpAmm = map(level, 0, 0.5, 0, 1);
  let h = map(lerpAmm, 0, 1, 0, maxLineHeight);
  let interCol = lerpColor(strokeCol, strokeCol2, lerpAmm);

  push();
  translate(width / 2, height / 2);
  const aor = map(timer, 0, songLength, 0, 360);
  rotate(aor);

  strokeWeight(strokeW);
  push();
  translate(0, -innerRadius);
  stroke(interCol);
  line(0, 0, 0, -h);
  pop();

  pop();

  if (!song.isPlaying()) stopSong();
}

function keyPressed() {
  let saveStr = `${songName}`;
  if (key == "s" || key == "S") SVG ? save(saveStr) : saveCanvas(saveStr);

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
