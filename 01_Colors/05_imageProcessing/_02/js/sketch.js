'use strict'

let img;
let colors = [];
let tilecount;

function preload() {
  img = loadImage('../data/pic1.jpg');
}

function setup() {
  //make the canvas size equal to the image size
  createCanvas(img.width, img.height);
  noStroke();
}

function draw() {
  //define how many tiles across the X & Y
  tilecount = 10;
  //define the tile size
  let rectSize = width / tilecount;
  // empty the color arrat each frame
  let colors = [];
  //load img pixels into an array
  img.loadPixels();
  //loop through the pixels array...
  for (let gridX = 0; gridX < tilecount; gridX++) {
    for (let gridY = 0; gridY < tilecount; gridY++) {
      // define the X any Y position
      let posX = int(gridX * rectSize);
      let posY = int(gridY * rectSize);
      //use the pixel array formulae to create an index value
      var index = (posY * img.width + posX) * 4;
      // store the color of the pixel at the index value
      var col = color(img.pixels[index], img.pixels[index + 1], img.pixels[index + 2], img.pixels[index + 3]);
      colors.push(col);
    }
  }
  //create an external counter for loop
  let i = 0;
  //iterate through the grid
  for (let gridX = 0; gridX < tilecount; gridX++) {
    for (let gridY = 0; gridY < tilecount; gridY++) {
      //fill this rect with the corresponding value in the colors array
      fill(colors[i]);
      //draw rect
      rect(gridX * rectSize, gridY * rectSize, rectSize, rectSize);
      // increment the counter
      i++;
    }
  }
} //end of draw
