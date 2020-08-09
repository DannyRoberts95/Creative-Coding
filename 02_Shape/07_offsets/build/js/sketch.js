"use strict";

let img;
//how many tiles will be displayed
let tileNumber = 20;
let tileSize;

let minModuleRadius = 5;
let maxModuleRadius = 50;
let minStrokeWeight = 1;
let maxStrokeWeight = 25;
let strokeCol, fillColor, backgroundColor;

let rSeed = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  rectMode(CENTER);
  randomSeed(rSeed);
  strokeCol = color(random(45, 125), 50, 100);
  backgroundColor = color(random(200, 300), 90, 25);
  tileSize = width / tileNumber;
  // noLoop();
}

function draw() {
  background(backgroundColor);
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
      let sw = map(
        abs(xOffset + yOffset) / 2,
        0,
        200,
        minStrokeWeight,
        maxStrokeWeight
      );
      let r = constrain(
        map(mouseY, 0, width, minModuleRadius, maxModuleRadius),
        minModuleRadius,
        maxModuleRadius
      );

      push();
      translate(x + tileSize / 2, y + tileSize / 2);
      rotate(random(-maxOffset, maxOffset));
      noFill();
      stroke(strokeCol);
      strokeWeight(sw);
      rect(0, 0, r * 2, r * 2);
      pop();
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
}

function mousePressed() {
  strokeCol = color(random(45, 125), 50, 100);
  backgroundColor = color(random(200, 300), 90, 25);
  rSeed++;
}
