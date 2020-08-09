"use strict";

let tileNumX = 32;
let tileNumY = 16;
let tileWidth = 20;
let gutter = 100;
let spacing = 3;

let sw = 1;
let distortionFactor = 0.25;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(90);
  randomSeed(1);
  noFill();
  strokeCap(ROUND);
  strokeJoin(ROUND);
  strokeWeight(sw);

  push();
  translate(gutter, gutter);

  for (let i = 0; i < tileNumX; i++) {
    for (let j = 0; j < tileNumY; j++) {
      const x = i * tileWidth + spacing*i;
      const y = j * tileWidth + spacing*j;
      tile(x, y, tileWidth,i*distortionFactor);
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
  rotate(random(-distortion, distortion));
  beginShape();
  //Outer perimater
  points.forEach((item) => {
    vertex(item.x, item.y);
  });
  endShape(CLOSE);
  //INNER CROSS
  const crossPointIndexs = [1, 3, 5, 7];
  beginShape();
  crossPointIndexs.forEach((index) => {
    vertex(0, 0);
    vertex(points[index].x, points[index].y);
  });
  endShape();
  pop();
}

function keyPressed() {
  let saveStr = `${new Date()}`;
  if (key == "s" || key == "S") saveCanvas(saveStr, "png");
}
