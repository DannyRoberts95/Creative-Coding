'use strict';
function setup() {
  //Create the canvas
  createCanvas(720, 720);
  //Set cursor type to a CROSS
  cursor(CROSS);
  //Change the color mode from RGB default to HSB
  colorMode(HSB, 360, 100, 100);
  //Set rects to render form the center
  rectMode(CENTER);
  //Render shapes without a stroke
  noStroke();
}
