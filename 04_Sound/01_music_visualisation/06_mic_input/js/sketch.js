let mic;
let maxLineHeight = 2500;
let innerRadius = maxLineHeight / 50;
let maxInnerRadius = maxLineHeight / 10;
let lineHeight;

//waveform Vars
let radius = innerRadius;
let waveformAmp = 250;

// ---------------------------------------------------------------------------
// SETUP
// ---------------------------------------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  strokeCap(ROUND);
  colorMode(HSB, 360, 100, 100, 100);

  //create mic object and pass it to the FFT object for analysis
  mic = new p5.AudioIn();
  fft = new p5.FFT();
  fft.setInput(mic);
}

// ---------------------------------------------------------------------------
// DRAW
// ---------------------------------------------------------------------------
function draw() {
  background(0, 15);
  background(0);
  fill(255);
  level = mic.getLevel();
  let waveform = fft.waveform();

  //waveform
  stroke(100, 33);
  strokeWeight(2);
  noFill();
  push();
  translate(width / 2, height / 2);

  fill(100,66);
  ellipse(0,0,innerRadius*2);

  // rotate(frameCount / 20);
  beginShape(LINES);
  for (let i = 0; i < waveform.length; i++) {
    const aor = map(i, 0, waveform.length, 0, 360);
    rotate(aor);
    push();
    translate(0, -radius);
    let r = map(waveform[i], -1, 1, -waveformAmp, waveformAmp);

    // cool effect
    let x = sin(aor) * (r * radius/2);
    let y = cos(aor) * (r * radius/2);

    //Basic radial wave form
    // let x = sin(aor)*(r+radius);
    // let y = cos(aor)*(r+radius);

    vertex(x, y);
    pop();
  }
  endShape();
  pop();

  //Frequency Analysis Visualisation
  lineHeight = map(level, 0, 1, maxLineHeight * 0.1, maxLineHeight);
  let bins = 8 * 64;
  let spectrum = fft.analyze(bins);
  noStroke();
  fill(0);

  push();
  translate(width / 2, height / 2);
  rotate(frameCount / 5);

  for (let i = 0; i < bins; i++) {
    //the lower i, the deeper the frequency
    const aor = map(i, 0, bins, 0, 1440);
    let h = map(spectrum[i], 0, 255, 0, lineHeight);
    let sw = map(spectrum[i], 0, 255, 10, 2);
    let a = map(spectrum[i], 0, 255, 100, 33);

    let h1 = (frameCount / 2) % 360;
    let h2 = h1 - 180
    let c1 = color(h1, 75, 66, a);
    let c2 = color(h2, 0, 360, 100, a);
    let col = lerpColor(c1, c2, map(spectrum[i], 0, 255, 0, 1));

    rotate(aor);
    push();
    translate(0, -innerRadius);
    stroke(col, a);
    strokeWeight(sw);
    h > 0 && line(0, h * 0.1, 0, -h);
    pop();
  }
  pop();
}

function keyPressed() {
  if (key == "s" || key == "S") mic.start();
  if (key == "q" || key == "Q") noLoop();
  if (key == "f" || key == "f") {
    fullscreen(true);
    resizeCanvas(windowWidth, windowHeight);
  }
}
