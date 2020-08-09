"use strict";

let w, h;

let aor;

function setup() {
  w = windowWidth;
  h = windowHeight;
  createCanvas(w, h);
  smooth();
  colorMode(HSB, 360, w, h);
  noStroke();
}

function draw() {
  background(h);
  let stepNumber = map(mouseX, 0, width, 5, 360);
  let angInc = floor(360 / stepNumber);
  let radius = height / 2.5;

  // save the matrix state to revert to later
  push();
  // translate to the middle of the screen
  translate(width / 2, height / 2);
  // begin rendering the triangle fan shape
  beginShape(TRIANGLE_FAN);
  // 0,0 equates to the screen center since translating there.
  // place the first vertex.
  vertex(0, 0);

  //for as many segments as we will need in the triangle...
  for (let angle = 0; angle <= 360; angle += angInc) {
    //Passing the angle (converted into radians), into the COS function and multiplying it
    //by radius gives us the X value along the circles perimeter.
    let vx = radius * cos(radians(angle));
    //the same is done for the Y value, except using SIN instead of COS
    let vy = radius * sin(radians(angle));
    //the segments fill corresponds to its angle in the circle, and it's S & B values are mapped to the mouse.
    fill(angle, mouseX, h);
    //place the vertex
    vertex(vx, vy);
  }
  // end vertex shape
  endShape();
  //return to matrix state saved by push
  pop();
}

//on key press, if the key is 'S' save the canvas using the gd timestamp function. file saves as a png
function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
}
