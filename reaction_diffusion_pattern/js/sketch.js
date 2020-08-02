"use strict";

let grid;
let next;

const DA = 1;
const DB = 0.5;
const FEED = 0.055;
const K = 0.062;

function setup() {
  createCanvas(window.innerWidth/2, window.innerWidth/2);  
  pixelDensity(1);

  grid = [];
  next = [];
  for (let x = 0; x < width; x++) {
    grid[x] = [];
    next[x] = [];
    for (let y = 0; y < height; y++) {
      grid[x][y] = { a: 1, b: 0 };
      next[x][y] = { a: 1, b: 0 };
    }
  }

  for (let x = 100; x < 110; x++) {
    for (let y = 100; y < 110; y++) {
      grid[x][y].b = 1;
    }
  }
}

function draw() {
  noLoop();
  background(51);

  for (let x = 1; x < width - 1; x++) {
    for (let y = 1; y < height - 1; y++) {
      const a = grid[x][y].a;
      const b = grid[x][y].b;
      
      //formaula for B
      next[x][y].a = a + 
      (DA * laplaceA(x, y)) - 
      (a * b * b) + 
      (FEED * (1 - a));

      //formula for B
      next[x][y].b = b + 
      (DB * laplaceB(x, y)) + 
      (a * b * b) - 
      ((K + FEED) * b);

      next[x][y].a = constrain(next[x][y].a, 0, 1)
      next[x][y].b = constrain(next[x][y].b, 0, 1)
    }
  }

  loadPixels();
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var pix = (x + y * width) * 4;
      var a = next[x][y].a;
      var b = next[x][y].b;
      var c = floor((a - b) * 255);
      c = constrain(c, 0, 255);
      pixels[pix + 0] = c;
      pixels[pix + 1] = c;
      pixels[pix + 2] = c;
      pixels[pix + 3] = 255;
    }
  }

  updatePixels();
  swapGrids();

  fill(255,0,0)
  text(10,10,frameRate())
}

function laplaceA(x, y) {
  var sum = 0;
  sum += grid[x][y].a * -1;
  sum += grid[x - 1][y].a * 0.2;
  sum += grid[x + 1][y].a * 0.2;
  sum += grid[x][y + 1].a * 0.2;
  sum += grid[x][y - 1].a * 0.2;
  sum += grid[x - 1][y - 1].a * 0.05;
  sum += grid[x + 1][y + 1].a * 0.05;
  sum += grid[x - 1][y + 1].a * 0.05;
  sum += grid[x + 1][y - 1].a * 0.05;
  return sum;
}
function laplaceB(x, y) {
  var sum = 0;
  sum += grid[x][y].b * -1;
  sum += grid[x - 1][y].b * 0.2;
  sum += grid[x + 1][y].b * 0.2;
  sum += grid[x][y + 1].b * 0.2;
  sum += grid[x][y - 1].b * 0.2;
  sum += grid[x - 1][y - 1].b * 0.05;
  sum += grid[x + 1][y + 1].b * 0.05;
  sum += grid[x - 1][y + 1].b * 0.05;
  sum += grid[x + 1][y - 1].b * 0.05;
  return sum;
}

function swapGrids() {
  let temp = grid;
  grid = next;
  next = temp;
}

function keyPressed() {
  let saveStr = `${new Date()}`;
  if (key == "s" || key == "S") saveCanvas(saveStr, "png");
}
