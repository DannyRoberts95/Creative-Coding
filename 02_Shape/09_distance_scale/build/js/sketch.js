"use strict";

let tileNumber = 50;
let tileSize;
let aor;

let backgroundCol, col1, col2, col3;

let rSeed = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  ellipseMode(CENTER);
  strokeCap(ROUND);
  angleMode(DEGREES);
  cursor(CROSS);

  backgroundCol = color(10);
  col1 = color(0, 75, 100, 100);
  col2 = color(45, 90, 90, 100);
  col3 = color(200, 25, 45, 100);
}

function draw() {
  background(backgroundCol);
  randomSeed(rSeed);

  tileSize = width / tileNumber;

  for (let x = 0; x <= width; x += tileSize) {
    for (let y = 0; y <= height; y += tileSize) {
      let posX = x;
      let posY = y;

      let angle = atan2(mouseY - posY, mouseX - posX);
      let d = dist(mouseX, mouseY, posX, posY);
      let size = map(d, 0, width / 5, tileSize, 0);
      size = constrain(size, 0, tileSize * 1.5);

      angle = atan2(mouseY - posY, mouseX - posX);

      push();
      translate(posX, posY);
      // rotate(angle);
      noStroke();

      fill(col1);
      if (random() < 0.33) {
        rotate(angle);
        stroke(col1);
        strokeWeight(size);
        line(0 - size / 2, 0 - size / 2, size / 2, size / 2);
      } else if (random() < 0.66) {
        rotate(-angle);
        stroke(col2);
        strokeWeight(size);
        line(0 - size / 2, 0 - size / 2, size / 2, size / 2);
      } else {
        rotate(angle);
        stroke(col3);
        strokeWeight(size);
        line(0 - size / 2, 0 - size / 2, size / 2, size / 2);
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
  rSeed++;
  col1 = color(random(180), 30, random(75, 100), 100);
  col2 = color(random(180), 100, random(45, 60), 100);
  col2 = color(random(200, 360), 35, 70, 100);
}
