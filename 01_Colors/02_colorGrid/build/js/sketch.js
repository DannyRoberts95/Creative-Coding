"use strict";

var stepX;
var stepY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  colorMode(HSB, width, height, 100);
  cursor(CROSS);
}

function draw() {
  //using the mouseX and mouseY to define the size of each box in the grid
  //the max function will choose the higher of the two arguments passed to it so that
  //a negative value is not passed as the step
  stepX = max(mouseX, 2);
  stepY = max(mouseY, 2);

  for (var gridY = 0; gridY < height; gridY += stepY) {
    for (var gridX = 0; gridX < width; gridX += stepX) {
      fill(gridX, height - gridY, 100);
      rect(gridX, gridY, stepX, stepY);
    }
  }
}

//on key press, if the key is 'S' save the canvas using the gd timestamp function. file saves as a png
function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
}
