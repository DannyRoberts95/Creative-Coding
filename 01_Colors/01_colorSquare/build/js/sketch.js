"use strict";

function setup() {
  createCanvas(windowWidth, windowHeight);
  cursor(CROSS);

  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background(mouseY / 2, 100, 100);

  fill(360 - mouseY / 2, 100, 100);
  rect(width / 2, height / 2, mouseX + 1, mouseY + 1);
}

function keyPressed() {
  //On pressing the S key the canvas will be saved as a png,
  //using the generative design timestamp function to name it
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
}
