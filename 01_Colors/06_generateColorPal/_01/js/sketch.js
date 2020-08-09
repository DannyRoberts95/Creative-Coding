'use strict'

let tileCountX = 50;
let tileCountY = 10;

let hueVals = [];
let satVals = [];
let brightVals = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB,360,100,100);
  noStroke();

  for (let i = 0; i < tileCountX; i++) {
    hueVals[i] = random(360);
    satVals[i] = random(100);
    brightVals[i] = random(100);
  }
}
