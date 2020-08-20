"use strict";

let tileNumX = 2;
let tileNumY = 2;
let tileWidth = 200;
let gutterX = 0;
let gutterY = 0;
let sw = 8;
let rSeed = 1;

let tiles = [];
let c1, c2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  // gutterX = (width - (spacing + tileWidth) * tileNumX) / 2 + tileWidth / 2;
  gutterX = tileWidth / 2 + sw;
  gutterY = tileWidth / 2 + sw;

  c1 = color(0);
  c2 = color(100);

  for (let i = 0; i < tileNumX; i++) {
    for (let j = 0; j < tileNumY; j++) {
      const x = i * tileWidth;
      const y = j * tileWidth;
      tiles.push(new Tile(x, y, tileWidth));
    }
  }
}

function draw() {
  background(c1);
  randomSeed(rSeed);
  noFill();
  fill(c1);
  strokeCap(ROUND);
  strokeJoin(ROUND);
  strokeWeight(sw);
  stroke(100);

  push();
  translate(gutterX, gutterY);
  tiles.forEach((item) => item.render());
  pop();
}

class Tile {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.drawMode = 0;
    this.aor = 0;
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
    rectMode(CENTER);
    rect(0, 0, this.w, this.w);
    rotate(this.aor);
    stroke(c2);
    strokeWeight(sw);
    beginShape();
    //Outer perimater
    switch (this.drawMode) {
      case 0:
        break;
      case 1:
        this.points.forEach((item) => {
          vertex(item.x, item.y);
        });
        break;
      case 2:
        vertex(this.points[2].x, this.points[2].y);
        vertex(this.points[3].x, this.points[3].y);
        vertex(this.points[4].x, this.points[4].y);
        vertex(this.points[5].x, this.points[5].y);
        vertex(this.points[6].x, this.points[6].y);
        break;
      case 3:
        this.aor = 90;
        vertex(this.points[2].x, this.points[2].y);
        vertex(this.points[3].x, this.points[3].y);
        vertex(this.points[4].x, this.points[4].y);
        vertex(this.points[5].x, this.points[5].y);
        vertex(this.points[6].x, this.points[6].y);
        break;
      case 4:
        fill(c2);
        vertex(this.points[2].x, this.points[2].y);
        vertex(this.points[3].x, this.points[3].y);
        vertex(this.points[4].x, this.points[4].y);
        vertex(this.points[5].x, this.points[5].y);
        vertex(this.points[6].x, this.points[6].y);
        break;

      default:
        break;
    }

    endShape(CLOSE);
    pop();
  }
}

function mousePressed() {
  console.log('jbaskjhc,a')
  rSeed++;
  tiles.forEach((item) => {
    if (
      mouseX < item.x + item.w / 2 &&
      mouseX > item.x - item.w / 2 &&
      mouseY < item.y - item.w / 2 &&
      mouseY > item.y + item.w / 2
    ) {
      item.drawMode++;
    }
  });
}

function keyPressed() {
  let saveStr = `${document.title}-${new Date().getTime()}`;
  if (key == "s" || key == "S") saveCanvas(saveStr, "png");
  if (key == "q" || key == "Q") noLoop();
}
