"use strict";

//how many tiles will be displayed
let tileNumber = 30;
let tileSize;
let img;

let radSmall = 5;
let radBig = 10;

let col1, col2, backgroundColor;

let rSeed = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  rectMode(CENTER);
  imageMode(CENTER);
  randomSeed(rSeed);
  col1 = color(random(45, 195), 50, 100);
  col2 = color(random(150, 300), 90, 25);
  tileSize = width / tileNumber;
  radSmall = tileSize * 0.25;
  radBig = tileSize * 0.5;
}

function draw() {
  background(col2);
  randomSeed(rSeed);
  for (let i = 0; i < tileNumber; i++) {
    for (let ii = 0; ii < tileNumber; ii++) {
      let x = tileSize * ii;
      let y = tileSize * i;
      let maxOffset = constrain(map(mouseX, 0, width, 0, 100), 0, 100);
      let xOffset = random(-maxOffset, maxOffset);
      let yOffset = random(-maxOffset, maxOffset);
      x += xOffset;
      y += yOffset;
      push();
      translate(x + tileSize / 2, y + tileSize / 2);
      fill(col1);
      noStroke();
      ellipse(0, 0, radBig * 2, radBig * 2);
      pop();
    }
  }

  for (let i = 0; i < tileNumber; i++) {
    for (let ii = 0; ii < tileNumber; ii++) {
      let x = tileSize * ii;
      let y = tileSize * i;
      push();
      translate(x + tileSize / 2, y + tileSize / 2);
      fill(col2);
      noStroke();
      ellipse(0, 0, radSmall * 2, radSmall * 2);
      pop();
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
}

function mousePressed() {
  rSeed++;
  col1 = color(random(45, 125), 50, 100);
  col2 = color(random(200, 360), random(45, 90), 25);
}
