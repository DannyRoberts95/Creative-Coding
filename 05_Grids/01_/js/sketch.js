"use strict";

let tileNumX = 4;
let tileNumY = 4;
let tileWidth = 150;
let spacing = 20;
let gutterX = 0;
let gutterY = 0;

let sw = 1;
let distortionFactor = 0.0004;
let rSeed = 1;

function setup() {
  // A4/4
  // createCanvas(877,620);
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  noFill();
  fill(0, 10);
  strokeCap(ROUND);
  strokeJoin(ROUND);
  strokeWeight(sw);
  stroke(100);

  gutterX = (width - (spacing + tileWidth) * tileNumX) / 2 + tileWidth / 2;
  gutterY = (height - (spacing + tileWidth) * tileNumY) / 2 + tileWidth / 2;
}

function draw() {
  background(0);
  randomSeed(rSeed);
  stroke(100, 100);
  noFill();
  strokeWeight(sw);

  ellipse(width / 2, height / 2, 10, 10);

  push();
  translate(gutterX, gutterY);

  for (let i = 0; i < tileNumX; i++) {
    for (let j = 0; j < tileNumY; j++) {
      const x = i * tileWidth + spacing * i;
      const y = j * tileWidth + spacing * j;

      // (i + j) % 2 === 0
      //   ? tileLined(x, y, tileWidth, 90,5)
      //   : tile(x, y, tileWidth, 0);

      mosaic(x, y, tileWidth, 0, 4);
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
  pop();

  for (let i = 0; i <= res; i++) {
    push();
    let yOff = map(i, 0, res, -w / 2, w / 2);
    translate(x, y + yOff);
    line(-w / 2, 0, w / 2, 0);
    pop();
  }
}

function mosaic(x, y, w, aor = 0, res) {
  push();
  translate(x - w/2 , y - w/2);
  rotate(aor);
  rect(0, 0, w, w);

  const subW = w / res;

  const cols = w / subW;
  const rows = w / subW;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * subW;
      const y = j * subW;
      push();
      translate(x, y);
      rect(0, 0, subW);
      pop();
    }
  }
  pop();
}

function mousePressed() {
  rSeed++;
}

function keyPressed() {
  let saveStr = `${document.title}-${new Date().getTime()}`;
  if (key == "s" || key == "S") saveCanvas(saveStr, "png");
  if (key == "q" || key == "Q") noLoop();
}
