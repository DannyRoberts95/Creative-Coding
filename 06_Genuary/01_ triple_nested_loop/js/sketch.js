"use strict";

document.title = "Triple Nested Loop";

let tileNumX = 6;
let tileNumY = 6;
let tileWidth = 100;
let gutterX = 0;
let gutterY = 0;
let sw = 2;
let rSeed = 1;
let spacing = 5;

let c1, c2, cBg;

function setup() {
  // A4 - 3508 x 2480
  // A3 - 4961 x 3605
  // A2 - 7016 x 4961
  // createCanvas(3508, 3508);

  //SQUARE
  // createCanvas(windowHeight, windowHeight);
  //FULLSCREEN
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  noFill();
  fill(0, 10);
  strokeCap(PROJECT);
  strokeWeight(sw);

  c1 = color(45, 100, 100, 100);
  c2 = color(125, 100, 100, 100);
  cBg = color(225, 100, 33, 100);

  gutterX =
    (width - (spacing + tileWidth) * tileNumX) / 2 + (tileWidth + spacing) / 2;
  gutterY =
    (height - (spacing + tileWidth) * tileNumY) / 2 + (tileWidth + spacing) / 2;
}

function draw() {
  c1 = color(map(mouseX, 0, width, 0, 360), saturation(c1), brightness(c1));
  c2 = color(map(mouseY, 0, height, 0, 360), saturation(c2), brightness(c2));

  background(cBg);
  randomSeed(rSeed);
  noFill();
  stroke(c1, 100);

  // if (mouseIsPressed) {
  //   stroke(c1);
  //   ellipse(width / 2, height / 2, 10, 10);
  // } else noLoop();

  push();
  translate(gutterX, gutterY);

  for (let i = 0; i < tileNumX; i++) {
    for (let j = 0; j < tileNumY; j++) {
      const x = i * tileWidth + spacing * i;
      const y = j * tileWidth + spacing * j;

      let r = random();
      if (r > 0.9) {
        tile(x, y, tileWidth, random(1,8));
      } else if (r > 0.6) {
        tileLined(
          x,
          y,
          tileWidth,
          random() > 0.5 ? 90 : 0,
          floor(random(4, 16))
        );
      } else if (r > 0.4) {
        circle(x, y, tileWidth, 0, random(2, 8));
      } else if (r > 0.1) {
        mosaic(x, y, tileWidth, 90, 6);
      } else if (r > 0) {
        mosaic(x, y, tileWidth, 90, 2);
      }
    }
  }
  pop();
}

//CODE TO COMPUTE AND RENDER A TILE

function tile(x, y, w, aor = 0, res) {
  push();
  translate(x, y);
  rotate(aor);
  for (let i = 1; i <= res; i++) {
    let w= (w * (i / res));
    let interCol = lerpColor(c1, c2, map(i, 0, res - 1, 0, 1));
    stroke(interCol);
    rect(0, 0, w, w);
  }
  pop();
}
function circle(x, y, w, aor = 0, res) {
  push();
  translate(x, y);
  rotate(aor);
  for (let i = 1; i <= res; i++) {
    let r = (w * (i / res)) / 2;
    let interCol = lerpColor(c1, c2, map(i, 0, res - 1, 0, 1));
    stroke(interCol);
    ellipse(0, 0, r * 2, r * 2);
  }
  pop();
}

function tileLined(x, y, w, aor = 0, res) {
  push();
  translate(x, y);
  rotate(aor);
  for (let i = 0; i < res; i++) {
    let interCol = lerpColor(c1, c2, map(i, 0, res - 1, 0, 1));
    stroke(interCol);

    push();
    let yOff = map(i, 0, res - 1, -w / 2, w / 2);
    translate(0, 0 + yOff);
    line(-w / 2 - sw / 2, 0, w / 2 + sw / 2, 0);
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
  const subW = (w / res)-(sw);
  const cols = w / subW;
  const rows = w / subW;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let interCol = lerpColor(c1, c2, map(i, 0, res - 1, 0, 1));
      stroke(interCol);
      const x = i * subW + subW / 2;
      const y = j * subW + subW / 2;
      push();
      translate(x, y);
      // strokeWeight(sw / 2);
      random() > 0.65
        ? tile(0, 0, subW)
        : tileLined(0, 0, subW, random() > 0.5 ? 90 : 0, 4);
      pop();
    }
  }
  pop();
}

function cluster(x, y, w, aor = 0, res) {
  push();
  translate(x, y);
  rotate(aor);
  rectMode(CENTER);
  // rect(0,0,w,w)

  let range = w / 5;

  for (let i = 0; i < res; i++) {
    push();
    const size = w / random(2, 6);
    let x = randomGaussian() * range;
    let y = randomGaussian() * range;
    x = constrain(x, -w - size / 2, w - size / 2);
    y = constrain(y, -w - size / 2, w - size / 2);
    translate(x, y);
    // noStroke()
    // i % 2 === 0 ? fill(0, 20) : noFill();
    strokeWeight(sw / 2);
    rect(0, 0, size, size);
    pop();
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
