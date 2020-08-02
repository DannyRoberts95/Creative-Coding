"use strict";

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {}

function keyPressed() {
  let saveStr = `${new Date()}`
  if (key == "s" || key == "S") saveCanvas(saveStr, "png");
}
