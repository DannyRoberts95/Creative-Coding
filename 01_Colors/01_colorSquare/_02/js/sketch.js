'use strict';

function setup() {
  createCanvas(720, 720);
  cursor(CROSS);

  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  //the background hue is based off the mouse Y value
  background(mouseY / 2, 100, 100);
  // the fill for the rect is scaled inversely to the mouseY value
  fill(360 - mouseY / 2, 100, 100);
  //draw the rect at the center of the screen and set its widtha nd height based off the
  //mouseX pos
  rect(width/2, height/2, mouseX + 1, mouseX + 1);
}
