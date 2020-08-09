'use strict';

var stepX;
var stepY;

function setup() {
  createCanvas(800, 400);
  noStroke();
  colorMode(HSB, width, height, 100);
}

function draw() {

  // set the step value as 15 pixels so each grid square will end up as 15px wide
  stepX = 15;
  stepY = 15;

  //create a verticle colum of boxes
  for (var gridY = 0; gridY < height; gridY += stepY) {
    // for every box in the verticle colum create a row of boxes
    for (var gridX = 0; gridX < width; gridX += stepX) {
      //fill the boxes with their positional values which correspond to their space in the color spectrum
      fill(gridX, height - gridY, 100);
      //draw the box
      rect(gridX, gridY, stepX, stepY);
    }
  }
}
