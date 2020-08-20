let mic;
let walkers = [];
let radius = 100;

// ---------------------------------------------------------------------------
// SETUP
// ---------------------------------------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  strokeCap(ROUND);
  colorMode(HSB, 360, 100, 100, 100);

  for (let i = 0; i < 10; i++) {
    // const x = width / 2;
    // const y = 0;
    // const sw = 5;
    // const stepSize = 25;
    // const stepNum = 50;
    // const col = color(100);
    // let walker = new Walker(x, y, sw, stepNum, stepSize, col);
    // walkers.push(walker);
  }

  // //create mic object and pass it to the FFT object for analysis
  mic = new p5.AudioIn();
  fft = new p5.FFT();
  fft.setInput(mic);
}

// ---------------------------------------------------------------------------
// DRAW
// ---------------------------------------------------------------------------
function draw() {
  background(0, 15);

  // for (let i = walkers.length - 1; i >= 0; i--) {
  //   const w = walkers[i];
  //   w.stepNum === 0 ? walkers.splice(i, 1) : w.run();
  // }

  fill(255);
  level = mic.getLevel();

  let bins = 16;
  let waveform = fft.waveform(bins);
radius = mouseX

  //waveform
  push();
  translate(width / 2, height / 2);
  for (let i = 0; i < bins; i++) {
    const aor = map(i, 0, bins, 0, 360);
    rotate(aor);
    push();
    const x = sin(aor) ;
    const y = cos(aor) ;
    const sw = 5;
    const stepSize = 10;
    const stepNum = 10;
    const col = color(100);
    let walker = new Walker(x, y, sw, stepNum, stepSize, aor, col);
    walkers.push(walker);
    pop();
  }
  for (let i = walkers.length - 1; i >= 0; i--) {
    const w = walkers[i];

    w.stepNum === 0 ? walkers.splice(i, 1) : w.run();
  }
  pop();

  // constructor(x, y, sw, stepNum, stepSize, col) {

  // //Frequency Analysis Visualisation
  // lineHeight = map(level, 0, 1, maxLineHeight * 0.1, maxLineHeight);
  // let bins = 8 * 64;
  // let spectrum = fft.analyze(bins);
  // noStroke();
  // fill(0);
  // push();
  // translate(width / 2, height / 2);
  // rotate(frameCount / 5);
  // for (let i = 0; i < bins; i++) {
  //   //the lower i, the deeper the frequency
  //   const aor = map(i, 0, bins, 0, 1440);
  //   let h = map(spectrum[i], 0, 255, 0, lineHeight);
  //   let sw = map(spectrum[i], 0, 255, 10, 2);
  //   let a = map(spectrum[i], 0, 255, 100, 33);
  //   let h1 = (frameCount / 2) % 360;
  //   let h2 = h1 - 180
  //   let c1 = color(h1, 75, 66, a);
  //   let c2 = color(h2, 0, 360, 100, a);
  //   let col = lerpColor(c1, c2, map(spectrum[i], 0, 255, 0, 1));
  //   rotate(aor);
  //   push();
  //   translate(0, -innerRadius);
  //   stroke(col, a);
  //   strokeWeight(sw);
  //   h > 0 && line(0, h * 0.1, 0, -h);
  //   pop();
  // }
  // pop();
}

function keyPressed() {
  if (key == "s" || key == "S") mic.start();
  if (key == "q" || key == "Q") noLoop();
  if (key == "f" || key == "f") {
    fullscreen(true);
    resizeCanvas(windowWidth, windowHeight);
  }
}

class Walker {
  constructor(x, y, sw, stepNum, stepSize, aor, col) {
    this.x = x;
    this.y = y;
    this.sw = sw;
    this.maxStepNum = stepNum;
    this.stepNum = stepNum;
    this.stepSize = stepSize;
    this.aor = aor;
    this.col = col;
  }

  run() {
    this.render();
  }

  render() {
    push();
    rotate(this.aor);
    translate(0,radius);
    // translate(this.x,this.y)
    const r = floor(random(3));
    const prevX = this.x;
    const prevY = this.y;
    switch (r) {
      case 0:
        this.x -= this.stepSize;
        break;
      case 1:
        this.x += this.stepSize;
        break;
      case 2:
        this.y += this.stepSize;
        break;
      default:
        break;
    }
    strokeWeight(this.stepNum);
    stroke(this.col);    
    line(prevX, prevY, this.x, this.y);
    pop();
    this.stepNum--;
  }
}
