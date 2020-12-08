"use strict";

let tileNumX = 12;
let tileNumY = 6;
let tileWidth = 50;
let spacing = 10;
let gutterX = 0;
let gutterY = 0;

let sw = 3;
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

  // distortionFactor = map(mouseX, 0, width, 0, 2);

  push();
  translate(gutterX, gutterY);

  for (let i = 0; i < tileNumX; i++) {
    for (let j = 0; j < tileNumY; j++) {
      const x = i * tileWidth + spacing * i;
      const y = j * tileWidth + spacing * j;
      tile(x, y, tileWidth);
    }
  }
  pop();
}

//CODE TO COMPUTE AND RENDER A TILE
function tile(x, y, w) {
  push();
  translate(x, y);
  stroke(100, 100);
  strokeWeight(sw);
  beginShape();
  //Outer perimater
  rectMode(CENTER);
  rect(0, 0, w);
  endShape(CLOSE);
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
