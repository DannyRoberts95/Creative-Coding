"use strict";

let tileNumber = 50;
let tileSize;
let aor;
let col, col2;
let seed = 1;

function setup() {
  createCanvas(1200 , 628);
  angleMode(DEGREES);
  rectMode(CENTER);
  ellipseMode(CENTER);
  strokeCap(ROUND);

  col2 = color(7, 191, 165, 255);
  col = color(255);
  // noLoop();
}

function draw() {
  background(3, 105, 122, 255);

  randomSeed(seed);

  tileSize = width / tileNumber;
  let sw1 = map(mouseX, 0, width, 0, 20);
  let sw2 = map(mouseY, 0, width, 0, 20);

  for (let x = 0; x <= width; x += tileSize) {
    for (let y = 0; y <= height; y += tileSize) {
      let size = tileSize;

      push();
      translate(x + size / 2, y + size / 2);
      let r = floor(random(0, 2));
      if (r === 0) {
        rotate(90);
        stroke(col2);
        strokeWeight(sw1);
        line(-size / 2, 0, size / 2, 0);
      } else {
        stroke(col);
        strokeWeight(sw2);
        line(-size / 2, 0, size / 2, 0);
      }
      pop();
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
  if (key == "1") strokeCap(ROUND);
  if (key == "2") strokeCap(PROJECT);
  if (key == "3") strokeCap(SQUARE);
}

function mousePressed() {
  // col = color(random(360), random(45, 100), 80, 100);
  seed++;
}
