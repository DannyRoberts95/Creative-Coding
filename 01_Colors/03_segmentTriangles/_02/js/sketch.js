'use strict';

let w = 750;
let h = 750;

let aor;

function setup(){
    createCanvas(w,h);
    smooth();
    colorMode(HSB,360,w,h);
    noStroke();
}

function draw(){
    // set the number steps, which defines how many triangles fans will be used
    // to create the circle
    let stepNumber = 20;
    //the angle increment for each step of the loop based on 360/stepNumber
    let angInc = 360/stepNumber;
    //The radius of the circle to be drawn
    let radius = 250;
}
