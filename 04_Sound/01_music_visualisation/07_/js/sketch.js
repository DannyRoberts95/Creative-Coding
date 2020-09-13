let mic;
let fft;

const margin = { top: 25, right: 25, bottom: 25, left: 25 };
const spacing = 25;

// amp vars
let amp_x = margin.top;
let amp_y = margin.left;
let amp_w = 300;
let amp_h = 300;
let amp_maxR = amp_w;
let amp_peak = 0;

//waveform vars
let wave_x = amp_w + spacing * 2;
let wave_y = margin.left;
let wave_w = 525;
let wave_h = 300;
let wave_maxLineHeight = 200;
let wave_bins = 64;
let wave_peaks = [];

// ---------------------------------------------------------------------------
// SETUP
// ---------------------------------------------------------------------------
function setup() {
  createCanvas(900, 900);
  angleMode(DEGREES);
  strokeCap(SQUARE);
  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100, 100);

  //create mic object and pass it to the FFT object for analysis
  
  mic = new p5.AudioIn();
  mic.getSources(gotSources);

  fft = new p5.FFT();
  fft.setInput(mic);

  mic.start();
  for (let i = 0; i < wave_bins; i++) {
    wave_peaks[i] = 0;
  }
  background(0);
}

// ---------------------------------------------------------------------------
// DRAW
// ---------------------------------------------------------------------------
function draw() {
  level = mic.getLevel();
  background(0)

  // amp code
  // ---------------------------------------------------------------------------
  push();
  translate(amp_x + amp_w / 2, amp_y + amp_h / 2);
  fill(0, 10);
  stroke(100);
  rect(0, 0, amp_w, amp_h);
  fill(255);
  stroke(100);
  const r = map(level, 0, 1, 0, amp_maxR);
  push();
  translate(0, 0);
  rect(0, 0, r * 2, r * 2);
  line(amp_w / 2, amp_w / 2, -amp_w / 2, -amp_w / 2);
  line(amp_w / 2, -amp_w / 2, -amp_w / 2, amp_w / 2);
  pop();
  pop();
  // ---------------------------------------------------------------------------

  //Frequency Analysis Visualisation
  // ---------------------------------------------------------------------------
  push();
  translate(wave_x, wave_y);
  fill(0, 20);
  stroke(100);
  rect(wave_w / 2, wave_h / 2, wave_w, wave_h);

  let spectrum = fft.analyze(wave_bins);
  let sw = wave_w / wave_bins;

  for (let i = 0; i < wave_bins; i++) {
    let x = map(i, 0, wave_bins, 0, wave_w);
    let h = map(spectrum[i], 0, 200, 0, wave_maxLineHeight);
    push();
    stroke(100);
    strokeWeight(sw);

    translate(x + sw / 2, wave_h);
    line(0, 0, 0, -h);
    h > wave_peaks[i] ? (wave_peaks[i] = h) : wave_peaks[i];
    noStroke();
    fill(100);
    rect(0, -wave_peaks[i] - sw, sw, sw);
    pop();
    wave_peaks[i] -= 0.66;
  }
  pop();
  // ---------------------------------------------------------------------------

  push()
  translate(0,450+spacing)
  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(100);
  strokeWeight(2);
  for (let i = 0; i < wave_bins; i++) {    
    let x = map(i, 0, wave_bins, spacing, 900-spacing);
    let y = map(waveform[i], -1, 1, -150, 150);
    vertex(x, y);
  }
  endShape();
  pop()
}

function keyPressed() {
  if (key == "s" || key == "S") mic.start();
  if (key == "q" || key == "Q") noLoop();
  if (key == "f" || key == "f") {
    fullscreen(true);
    resizeCanvas(windowWidth, windowHeight);
  }
}
function gotSources(deviceList) {
  if (deviceList.length > 0) {
    //set the source to the first item in the deviceList array
    audioIn.setSource(0);
    let currentSource = deviceList[audioIn.currentSource];
    console.log('set source to: ' + currentSource.deviceId, 5, 20, width);
  }
}