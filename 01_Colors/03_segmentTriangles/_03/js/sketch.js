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
    let stepNumber = 360;
    let angInc = 360/stepNumber;
    let radius = 250;

    // save the matrix state to revert to later
    push();
    // translate to the middle of the screen
    translate(width/2,height/2);
    // begin rendering the triangle fan shape
    beginShape(TRIANGLE_FAN);
    // 0,0 equates to the screen center since translating there.
    // place the first vertex.
    vertex(0,0);

    //for as many segments as we will need in the triangle...
    for(let angle = 0; angle<=360; angle += angInc){
      //Passing the angle (converted into radians), into the COS function and multiplying it
      //by radius gives us the X value along the circles perimeter.
      let vx = radius * cos(radians(angle));
      //the same is done for the Y value, except using SIN instead of COS
      let vy = radius * sin(radians(angle));
      //the segments fill corresponds to its angle in the circle, and it's S & B values are mapped to the mouse.
      fill(angle,mouseX,mouseY);
      //place the vertex
      vertex(vx,vy);
    }
    // end vertex shape
    endShape();
    //return to matrix state saved by push
    pop();
}
