'use strict';

var img;
var colors = [];

// add a variable to hold the current color sort mode
var sortMode = null;

function preload() {
  img = loadImage('../data/pic1.jpg');
}

function setup() {
  createCanvas(600, 600);
  noCursor();
  noStroke();
}

function draw() {
  var tileCount = floor(width / max(mouseX, 5));
  var rectSize = width / tileCount;

  img.loadPixels();
  colors = [];

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      var px = int(gridX * rectSize);
      var py = int(gridY * rectSize);
      var i = (py * img.width + px) * 4;
      var c = color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3]);
      colors.push(c);
    }
  }

  //implement the GD library sort colors function to sort the colors array
  //based on the sortMode variable
  gd.sortColors(colors, sortMode);

  var i = 0;
  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      fill(colors[i]);
      rect(gridX * rectSize, gridY * rectSize, rectSize, rectSize);
      i++;
    }
  }
}

//When the key is pressed...
function keyReleased() {

  //execute code based on the key pressed
  if (key == 'c' || key == 'C') writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  //load alternative images
  if (key == '1') img = loadImage('../data/pic1.jpg');
  if (key == '2') img = loadImage('../data/pic2.jpg');
  if (key == '3') img = loadImage('../data/pic3.jpg');
  if (key == '4') img = loadImage('../data/pic4.jpg');

  //change the value of the sortMode Var passed into the gd.sortcolor function
  if (key == '5') sortMode = null;
  if (key == '6') sortMode = gd.HUE;
  if (key == '7') sortMode = gd.SATURATION;
  if (key == '8') sortMode = gd.BRIGHTNESS;
  if (key == '9') sortMode = gd.GRAYSCALE;
}
