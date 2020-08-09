'use strict'

let tileCountX = 50;
let tileCountY = 10;

let hueVals = [];
let satVals = [];
let brightVals = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  for (let i = 0; i < tileCountX; i++) {
    hueVals[i] = random(360);
    satVals[i] = random(100);
    brightVals[i] = random(100);
  }
}

function draw() {
  background(0, 0, 100);

  let counter = 0;

  // Map the tiles resolution to the mouse X & Y
  let mX = constrain(mouseX, 0, width);
  let mY = constrain(mouseY, 0, height);
  // Current tile counts are products of mX mapped to the tileCount, returned as INTs
  let currentTileCountX = int(map(mX, 0, width, 1, tileCountX));
  let currentTileCountY = int(map(mY, 0, height, 1, tileCountY));
  let tileWidth = width / currentTileCountX;
  let tileHeight = height / currentTileCountY;

  for (let gridY = 0; gridY < currentTileCountY; gridY++) {
    for (let gridX = 0; gridX < currentTileCountX; gridX++) {
      let posX = gridX * tileWidth;
      let posY = gridY * tileHeight;

      let index = counter % tileCountX;

      fill(hueVals[index], satVals[index], brightVals[index]);
      rect(posX, posY, tileWidth, tileHeight);
      counter++;
    }
  }
}
