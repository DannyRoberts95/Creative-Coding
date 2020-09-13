disableFriendlyErrors = true; // disables FES

let xspacing = 15; // Distance between each horizontal location
let w; // Width of entire wave
let t1 = 0.0; // Start angle at 0
let t2 = 0.0;
let t3 = 0.0;
let period = 850.0; // How many pixels before the sine ripples repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave
let backgroundCol, waveCol; // colors

setup = () => {
  createCanvas(windowWidth, windowHeight < 800 ? 800 : windowHeight); //limit sketch height to 800px
  w = width*1.1;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
  backgroundCol = color(0, 86, 98, 100);
  waveCol = color(38,198,218, 66);
  frameRate(30);
};

windowResized = () => {
  resizeCanvas(windowWidth, windowHeight * 0.8);
  setup();
};

draw = () => {
  background(0,105,120);
  frameRate(30);

  t1 += 0.0125;
  t2 += 0.01;
  t3 += 0.0075;

  wave(0, height * 0.25, 70, t1, color(1, 125, 121));
  wave(2, height * 0.5, 60, t2, color(1, 145, 135));
  wave(3, height * 0.65, 30, t3, color(1, 158, 143));
};

function wave(offset, cy, amp, t, col) {
  let x = t + offset;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = Math.sin(x) * amp;
    x += dx;
  }
  strokeWeight(2);
  stroke(93,222,244,80);
  fill(waveCol);
  //draw waves
  beginShape();
  for (let x = 0; x < yvalues.length; x++) {
    vertex(x * xspacing, cy + yvalues[x]);
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  //draw points
  for (let x = 0; x < yvalues.length; x++) {
    if (x % 10 === 0) {
      stroke(93,222,244,95);
      strokeWeight(10);
      point(x * xspacing, cy + yvalues[x]);       
      strokeWeight(2);
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") mic.start();
  if (key == "q" || key == "Q") noLoop();
  if (key == "f" || key == "f") {
    fullscreen(true);
    resizeCanvas(windowWidth, windowHeight);
  }
}
