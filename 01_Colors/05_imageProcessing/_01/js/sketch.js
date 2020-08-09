'use strict'

let img;

function preload(){
  //loads an image from a path and creates a p5.js image from it
  img = loadImage('../data/pic1.jpg');
}

function setup(){
  createCanvas(600,600);
  noCursor();
  noStroke();
  //Causes the draw function to only execute once
  noLoop();
}

function draw(){
  //loads the pixel data for this image into the [pixels] array
  img.loadPixels();
  //console.log the img object
  console.log(img);

}
