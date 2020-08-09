'use strict';

let w = 750;
let h = 750;

function setup(){
    createCanvas(w,h);
    //enables anti aliasing for geometry. smooth is enabled by default.
    smooth();
    //Set color mode to HSB, and set S range to the width and S range to the B.
    colorMode(HSB,360,w,h);
    noStroke();
}
