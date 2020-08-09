"use strict";

document.title = "01_innerTiles";

let tileC1, tileC2, backgroundCol;

let tileNumX = 23;
let tileNumY = 7;
let tileWidth = 52;
let spacing = 8
let gutterX = 0;
let gutterY = 0;

let innerTileNum = 8;
let innerTileMinScale = 0.1
let sw = 1;
let distortionFactor = 0.05;

function setup() {
  createCanvas(windowWidth, windowWidth/3);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  noFill();
  strokeCap(ROUND);
  strokeJoin(ROUND);
  strokeWeight(sw);
  stroke(100);

  // //awesome color combo
  // backgroundCol = color(240, 66, 35);
  // tileC1 = color(75,30,100,100,66);
  // tileC2 = color(275,90,100,100,66);

  //awesome color combo
  backgroundCol = color(190, 66, 35);
  tileC1 = color(25,30,100,100,66);
  tileC2 = color(325,90,100,100,66);
  
  gutterX = (width - (spacing + tileWidth) * tileNumX) / 2 + tileWidth / 2;
  gutterY = (height - (spacing + tileWidth) * tileNumY) / 2 + tileWidth / 2;
}

function draw() {
  background(backgroundCol);
  randomSeed(1);

  distortionFactor = map(mouseX, 0, width, 0, 5);

  push();
  translate(gutterX, gutterY);

  for (let i = 0; i < tileNumX; i++) {
    for (let j = 0; j < tileNumY; j++) {
      const x = i * tileWidth + spacing * i;
      const y = j * tileWidth + spacing * j;
      tile(x, y, tileWidth, i * distortionFactor);
    }
  }
  pop();
}

//CODE TO COMPUTE AND RENDER A TILE
function tile(x, y, w, distortion) {
  const points = [
    {
      x: -w / 2 + random(-distortion, distortion),
      y: -w / 2 + random(-distortion, distortion),
    },
    {
      x: 0 + random(-distortion, distortion),
      y: -w / 2 + random(-distortion, distortion),
    },
    {
      x: w / 2 + random(-distortion, distortion),
      y: -w / 2 + random(-distortion, distortion),
    },
    {
      x: w / 2 + random(-distortion, distortion),
      y: 0 + random(-distortion, distortion),
    },
    {
      x: w / 2 + random(-distortion, distortion),
      y: w / 2 + random(-distortion, distortion),
    },
    {
      x: 0 + random(-distortion, distortion),
      y: w / 2 + random(-distortion, distortion),
    },
    {
      x: -w / 2 + random(-distortion, distortion),
      y: w / 2 + random(-distortion, distortion),
    },
    {
      x: -w / 2 + random(-distortion, distortion),
      y: 0 + random(-distortion, distortion),
    },
  ];

  push();
  translate(
    x + random(-distortion, distortion),
    y + random(-distortion, distortion)
  );
  rotate(distortion);
  // stroke(100, 100 - distortion);
  // strokeWeight(sw - distortion/100);
  for (let i = 0; i < innerTileNum; i++) {
    const scale = map(i, 0, innerTileNum-1, innerTileMinScale, 1);
    let interCol = lerpColor(tileC1, tileC2, scale)
    let a = 100-distortion*4
    stroke(hue(interCol),saturation(interCol),brightness(interCol),a);
    beginShape();
    points.forEach((item) => {
      vertex(item.x * scale, item.y * scale);
    });
    endShape(CLOSE);
  }
  pop();
}

function keyPressed() {
  let saveStr = `${document.title}-${new Date().getTime()}`;
  if (key == "s" || key == "S") saveCanvas(saveStr, "png");
  if (key == "q" || key == "Q") noLoop();
}
