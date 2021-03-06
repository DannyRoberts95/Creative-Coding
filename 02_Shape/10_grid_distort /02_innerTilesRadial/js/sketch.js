"use strict";

document.title = "01_innerTiles";

let tileNumX = 20;
let tileNumY = 12;
let tileWidth = 40;
let spacing = 0;

let gutterX = 0;
let gutterY = 0;

let sw = 2;
let innserSW = 1;
let distortionFactor = 0.2;

function setup() {
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

  stroke(100,100-distortion*2)

  //OUTER PERIMETER
  beginShape();
  strokeWeight(sw);
  points.forEach((item) => {
    vertex(item.x, item.y);
  });
  endShape(CLOSE);

  //RADIAL LINES
  beginShape();
  strokeWeight(innserSW);
  points.forEach((item) => {
    vertex(0, 0);
    vertex(item.x, item.y);
  });
  endShape();

  pop();
}

function keyPressed() {
  let saveStr = `${document.title}-${new Date().getTime()}`;
  if (key == "s" || key == "S") saveCanvas(saveStr, "png");
  if (key == "q" || key == "Q") noLoop();
}
