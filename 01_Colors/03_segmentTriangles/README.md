# Color_03_segmentedTriangles

In this sketch the triangle fan shape is used to make a segmented circle, whose segments' colors correspond to their angle in the circle. The Saturation and Brightness of the colors are mapped to the mouse position.

## Step 1

```js
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
```

## Step 2

```js
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

```

## Step 3

```js
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


```
