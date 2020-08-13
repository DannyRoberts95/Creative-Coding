"use strict";

let tileNumX = 1;
let tileNumY = 1;
let tileWidth = 200;
let spacing = 0;
let gutterX = 0;
let gutterY = 0;
let sw = 1;
let rSeed = 1;

let tiles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);


  // gutterX = (width - (spacing + tileWidth) * tileNumX) / 2 + tileWidth / 2;
  gutterX = tileWidth / 2 + sw;
  gutterY = tileWidth / 2 + sw;

  for (let i = 0; i < tileNumX; i++) {
    for (let j = 0; j < tileNumY; j++) {
      const x = i * tileWidth + spacing * i;
      const y = j * tileWidth + spacing * j;
      tiles.push(new Tile(x, y, tileWidth));
    }
  }
}

function draw() {
  background(0);
  randomSeed(rSeed);
  noFill();
  fill(0, 10);
  strokeCap(ROUND);
  strokeJoin(ROUND);
  strokeWeight(sw);
  stroke(100);

  push();
  translate(gutterX, gutterY);
  tiles.forEach(item=>item.render())
  pop()
  
}

class Tile {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.points = [
      {
        x: -w / 2,
        y: -w / 2,
      },
      {
        x: 0,
        y: -w / 2,
      },
      {
        x: w / 2,
        y: -w / 2,
      },
      {
        x: w / 2,
        y: 0,
      },
      {
        x: w / 2,
        y: w / 2,
      },
      {
        x: 0,
        y: w / 2,
      },
      {
        x: -w / 2,
        y: w / 2,
      },
      {
        x: -w / 2,
        y: 0,
      },
    ];
  }

  render() {
    push();
    translate(this.x, this.y);
    stroke(100, 100);
    strokeWeight(sw);
    beginShape();
    //Outer perimater
    this.points.forEach((item) => {
      vertex(item.x, item.y);
    });
    endShape(CLOSE);

    pop();
  }
}

function mousePressed() {
  rSeed++;
}

function keyPressed() {
  let saveStr = `${document.title}-${new Date().getTime()}`;
  if (key == "s" || key == "S") saveCanvas(saveStr, "png");
  if (key == "q" || key == "Q") noLoop();
}
