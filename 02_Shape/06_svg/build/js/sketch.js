"use strict";

let tileNumber = 25;
let tileSize;
let aor;
let shapes;

function preload() {
  shapes = [];
  shapes.push(loadImage(`data/data.svg`));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  ellipseMode(CENTER);
  strokeCap(ROUND);
  angleMode(DEGREES);
  noCursor();
}

function draw() {
  background(0, 0, 100, 100);
  randomSeed(1);

  tileSize = width / tileNumber;
  let sWidth = 5;

  for (let x = 0; x <= width; x += tileSize) {
    for (let y = 0; y <= height; y += tileSize) {
      let size = tileSize / 2;
      let posX = x;
      let posY = y;
      let angle = atan2(mouseY - posY, mouseX - posX) - 90;
      let d = dist(posX, posY, mouseX, mouseY);
      let renderSize = map(d, 0, width, tileSize, tileSize * 4);

      push();
      translate(posX, posY);
      rotate(angle);
      imageMode(CENTER);

      image(shapes[0], 0, 0, renderSize, renderSize);
      pop();
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
}
