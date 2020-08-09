'use strict';

let tileNumber = 50;
let tileSize;

function setup() {
  createCanvas(750, 750);
  angleMode(DEGREES);
  colorMode(HSB,360,100,100,100);
  frameRate(5);

  rectMode(CENTER);
  ellipseMode(CENTER);

  noLoop();

  tileSize = width / tileNumber;
}

function draw() {
  background(45,100,75,100);

  //while the tiles x pos is less than width...
  for(let x = 0; x<=width; x+=tileSize){
    //and while the tiles y pos is less than height...
    for(let y = 0; y<=height; y+=tileSize){

      //set the render size
      let size = tileSize;
      //save matrix state
      push();
      //move to the center of the tile
      translate(x-size/2,y-size/2);
      //rotate randomly
      rotate(random(-45,45));

      //draw the rect and fill within a given ruleset
      stroke(45,100,75,100);
      strokeWeight(1);
      fill(random(270,360),100,50,random(25,100));
      rect(0,0,size,size);
      // return to saved matrix state
      pop();

    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
