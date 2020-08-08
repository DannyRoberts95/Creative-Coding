let mic;
let innerRadius = 100;
let maxInnerRadius = 500;
let lineHeight;
let maxLineHeight = 5000;
function preload() {
  mic = new p5.AudioIn();
}

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

function draw() {
  background(0, 15);
  background(0);
  fill(255);
  level = mic.getLevel();

  // innerRadius = ;
  lineHeight = map(level, 0, 0.25, maxLineHeight * 0.1, maxLineHeight);
  let bins = 8 * 64;
  let spectrum = fft.analyze(bins);
  noStroke();
  fill(0);

  push();
  translate(width / 2, height / 2);
  rotate(frameCount / 5);

  let c1 = color((frameCount/2) % 360, 75, 66);
  let c2 = color(((frameCount/2) % 360) - 180, 0, 360, 100, 99);

  for (let i = 0; i < bins; i++) {
    //the lower i, the deeper the frequency
    const aor = map(i, 0, bins, 0, 1440);
    let h = map(spectrum[i], 0, 255, 0, lineHeight);
    let sw = map(spectrum[i], 0, 255, 10, 3);
    let a = map(i, 0, bins, 20, 99);
    let col = lerpColor(color(c1,a), color(c2,a), map(i, 0, bins, 0, 1));

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
