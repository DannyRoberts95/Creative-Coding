"use strict";

document.title = "thick_lines_square";

let tileNumX = 12;
let tileNumY = 12;
let tileWidth = 250;
let gutterX = 0;
let gutterY = 0;
let sw = 22;
let rSeed = 1;
let spacing = 0;

function setup() {
  // A4 - 3508 x 2480
  // A3 - 4961 x 3605
  // A2 - 7016 x 4961
  createCanvas(3508, 3508);

  //SQUARE
  // createCanvas(windowHeight, windowHeight);
  //FULLSCREEN
  // createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  noFill();
  fill(0, 10);
  strokeCap(PROJECT);
  strokeWeight(sw);

  gutterX =
    (width - (spacing + tileWidth) * tileNumX) / 2 + (tileWidth + spacing) / 2;
  gutterY =
    (height - (spacing + tileWidth) * tileNumY) / 2 + (tileWidth + spacing) / 2;
}

function draw() {
  background(100);
  randomSeed(rSeed);
  noFill();
  stroke(0, 100);

  if (mouseIsPressed) {
    stroke(0, 33);
    ellipse(width / 2, height / 2, 10, 10);
  } else noLoop();

  push();
  translate(gutterX, gutterY);

  for (let i = 0; i < tileNumX; i++) {
    for (let j = 0; j < tileNumY; j++) {
      const x = i * tileWidth + spacing * i;
      const y = j * tileWidth + spacing * j;
      let r = random();
      let thresh = 0.5;

      r > thresh
        ? tileLined(x, y, tileWidth, 90, 8)
        : tileLined(x, y, tileWidth, 0, 8);
    }
  }
  pop();
}

//CODE TO COMPUTE AND RENDER A TILE
function tile(x, y, w, aor = 0) {
  push();
  translate(x, y);
  rotate(aor);
  rectMode(CENTER);
  rect(0, 0, w, w);
  pop();
}

function tileLined(x, y, w, aor = 0, res) {
  push();
  translate(x, y);
  rotate(aor);
  for (let i = 0; i < res; i++) {
    push();
    let yOff = map(i, 0, res - 1, -w / 2, w / 2);
    translate(0, 0 + yOff);
    line(-w / 2, 0, w / 2, 0);
    pop();
  }
  pop();
}

function mosaic(x, y, w, aor = 0, res) {
  push();
  translate(x, y);
  rotate(aor);
  translate(-w / 2, -w / 2);
  rectMode(CENTER);
  const subW = w / res;
  const cols = w / (subW + sw);
  const rows = w / (subW + sw);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * subW + subW / 2;
      const y = j * subW + subW / 2;
      push();
      translate(x, y);
      random() > 0.5
        ? tile(0, 0, subW)
        : tileLined(0, 0, subW - sw, random() > 0.5 ? 90 : 0, 10);
      pop();
    }
  }
  pop();
}

function mousePressed() {
  rSeed++;
  loop();
}

function keyPressed() {
  let saveStr = `${document.title}-${new Date().getTime()}`;
  if (key == "s" || key == "S") saveCanvas(saveStr, "png");
  if (key == "q" || key == "Q") noLoop();
}
