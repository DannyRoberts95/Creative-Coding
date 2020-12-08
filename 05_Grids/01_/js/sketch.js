"use strict";

let tileNumX = 7;
let tileNumY = 7;
let tileWidth = 100;
let gutterX = 0;
let gutterY = 0;

let sw = 2;
let distortionFactor = 0.0004;
let rSeed = 1;
let spacing = 15;

function setup() {
  // A4/4
  // createCanvas(877,620);
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  noFill();
  fill(0, 10);
  strokeCap(PROJECT);
  strokeJoin(ROUND);
  strokeWeight(sw);
  stroke(100,100);

  gutterX =
    (width - (spacing + tileWidth) * tileNumX) / 2 + (tileWidth + spacing) / 2;
  gutterY =
    (height - (spacing + tileWidth) * tileNumY) / 2 + (tileWidth + spacing) / 2;
}

function draw() {
  background(0);
  randomSeed(rSeed);
  stroke(100, 100);
  noFill();
  strokeWeight(sw);

  if (mouseIsPressed) {
    stroke(100, 33);
    ellipse(width / 2, height / 2, 10, 10);
  } else noLoop();

  push();
  translate(gutterX, gutterY);

  for (let i = 0; i < tileNumX; i++) {
    for (let j = 0; j < tileNumY; j++) {
      const x = i * tileWidth + spacing * i;
      const y = j * tileWidth + spacing * j;

      let r = random();
      if (r > 0.8) {
        tile(x, y, tileWidth, 0);
      } else if (r > 0.3) {
        mosaic(x, y, tileWidth, random() > 0.5 ? 90 : 0, 4);
      } else if (r > 0.1) {
        tileLined(x, y, tileWidth, random() > 0.5 ? 90 : 0, 5);
      } else if (r > 0.5) {
        
      }
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

  for (let i = 0; i <= res; i++) {
    push();
    let yOff = map(i, 0, res, -w / 2+sw/2, w / 2+sw/2);
    translate(0, 0 + yOff);
    line((-w / 2), 0, (w / 2), 0);
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
  // rect(0, 0, w, w);

  const subW = w / res;
  const cols = w / subW;
  const rows = w / subW;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * subW + subW / 2;
      const y = j * subW + subW / 2;
      push();
      translate(x, y);
      
  

      random() > 0.5
        ? tile(0, 0, subW)
        : tileLined(0, 0, subW - sw, random() > 0.5 ? 90 : 0, 5);
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
