"use strict";

let tileNumX = 24;
let tileNumY = 16;
let tileWidth = 32;
let spacing =10;
let gutterX = 0;
let gutterY = 0;

let sw = 3;
let distortionFactor = 0.0004;
let rSeed = 1;

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
  randomSeed(rSeed);

  distortionFactor = map(mouseX, 0, width, 0, 5);

  push();
  translate(gutterX, gutterY);

  for (let i = 0; i < tileNumX; i++) {
    for (let j = 0; j < tileNumY; j++) {
      const x = i * tileWidth + spacing * i;
      const y = j * tileWidth + spacing * j;
      tile(x, y, tileWidth, i * distortionFactor*(i*1.0005));
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
  stroke(100, 100);
  strokeWeight(sw);
  beginShape();
  //Outer perimater
  points.forEach((item) => {
    vertex(item.x, item.y);
  });
  endShape(CLOSE);
  // //INNER CROSS
  // const crossPointIndexs = [1, 3, 5, 7];
  // beginShape();
  // crossPointIndexs.forEach((index) => {
  //   vertex(0, 0);
  //   vertex(points[index].x, points[index].y);
  // });
  // endShape();
  pop();
}

function mousePressed(){
  rSeed++
}

function keyPressed() {
  let saveStr = `${document.title}-${new Date().getTime()}`;
  if (key == "s" || key == "S") saveCanvas(saveStr, "png");
  if (key == "q" || key == "Q") noLoop();
}
