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

let totalFrames = 30 * 3;
let counter = 0;

setup = () => {
  createCanvas(windowWidth, windowHeight < 800 ? 800 : windowHeight); //limit sketch height to 800px
  w = width * 1.1;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));

  backgroundCol = color(0, 86, 98, 100);
  waveCol = color(0, 191, 165, 45);
  frameRate(30);
};

windowResized = () => {
  resizeCanvas(windowWidth, windowHeight * 0.8);
  setup();
};

draw = () => {
  frameRate(30);
  let percent =frameCount/ totalFrames;
  render(percent);
};

render = (percent) => {
  background(backgroundCol);

  // t1 += 0.0125;
  // t2 += 0.01;
  // t3 += 0.0075;

  if(percent < 100){
    t1 = 11.249999999999895 * percent;
    t2 = 8.999999999999853 * percent;
    t3 = 6.750000000000067 * percent;
  }else{
    t1 = (percent%100) - (11.249999999999895/10) * percent;
    t2 = (percent%100) - (8.999999999999853/10) * percent;
    t3 = (percent%100) - ( 6.750000000000067/10) * percent
  }

  // after 30 seconds
  // t1:11.249999999999895
  // t2:8.999999999999853
  // t3:6.750000000000067

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
  stroke(1, 188, 173);
  fill(col);
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
      strokeWeight(10);
      stroke(1, 188, 173);
      point(x * xspacing, cy + yvalues[x]);
      strokeWeight(1);
      //  stroke(0, 191, 165, 20);
      //  line(x* xspacing,0,x* xspacing, height)
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
