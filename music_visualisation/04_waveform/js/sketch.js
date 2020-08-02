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
  radius=200
  amp = 150;
}

function draw() {
  background(220);
  stroke(0);
  strokeWeight(2)
  noFill();

  let waveform = fft.waveform();

  
  push();
  translate(width / 2, height / 2);
  rotate(frameCount / 10);
  beginShape(LINES);
  for (let i = 0; i < waveform.length; i++) {
    const aor = map(i, 0, waveform.length, 0, 360);
    rotate(aor);
    push();
    translate(0, -radius);
    let r = map(waveform[i], -1, 1, -amp, amp);
    //cool effect
    // let x = sin(aor)*(r*radius);
    // let y = cos(aor)*(r*radius);
    
    let x = sin(aor)*(r+radius);
    let y = cos(aor)*(r+radius);
    vertex(x, y);
    pop();
  }
  endShape();
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
  }
}
