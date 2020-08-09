'use strict';

//how many tiles will be displayed
let tileNumber = 10;
let tileSize;

function setup() {
  createCanvas(500, 500);
  noLoop();
  //how big the tiles are is based on the number and the width
  tileSize = width / tileNumber;
  //for each horizontal tile...
  for(let i = 0; i<tileNumber; i++){
    // for each verticle tile...
    for(let ii = 0; ii < tileNumber; ii++){
      //define this tiles X and Y
      let x = tileSize*ii-(tileSize/2);
      let y = tileSize*i-(tileSize/2);

      //draw an ellipse
      fill(0);
      ellipse(x,y,tileSize,tileSize);
    }
  }
}

function draw() {

}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
