let song;
let playing = false;
let songLength;
let amplitude;
let sampleR;
let timerInterval;
let timer = 0;
let strokeW;

let innerRadius;
let maxInnerRadius = 300;

let lineHeight;
let maxLineHeight = 2000;

function preload() {
  soundFormats("mp3", "ogg");
  // song = loadSound("../data/song");
  song = loadSound("../dapta/tool-lateralus-audio");
  // song = loadSound("../data/FourTet");
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
  innerRadius = 100;
  maxLineHeight = 3550;
}

function draw() {
  background(0, 15);

  let level = amplitude.getLevel();
  // innerRadius = map(level, 0, 0.25, maxInnerRadius * 0.1, maxInnerRadius);

  lineHeight = map(level, 0, 0.25, maxLineHeight * 0.1, maxLineHeight);

  let bins = 8 * 64;
  let spectrum = fft.analyze();
  noStroke();
  fill(0);

  push();
  translate(width / 2, height / 2);
  rotate(frameCount / 5);
  for (let i = 0; i < bins; i++) {
    //the lower i, the deeper the frequency
    const aor = map(i, 0, bins, 0, 1440);

    let h = map(spectrum[i], 0, 255, 0, lineHeight * 0.01 * i);

    let sw = map(i, 0, bins, 15, 1);
    let a = map(i, 0, bins, 20, 99);
    let c1 = color(map(mouseX,0,width,0,360), 75, 66);
    let c2 = color(map(mouseY,0,height,0,360), 100, 99);
    let col = lerpColor(c1, c2, map(i, 0, bins, 0, 1));

    rotate(aor);
    push();
    translate(0, -innerRadius);
    stroke(col, a);
    strokeWeight(sw);
    line(0, h * 0.1, 0, -h);
    pop();
  }
  pop();
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
