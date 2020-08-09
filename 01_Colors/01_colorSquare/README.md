# Color_01_colorSquare

This sketch creates a scalable square that mapped to the Mouse X. The fill of the background and the square are also mapped to the mouseY, although they are mapped inversely to each other.

## Sketch Iterations

1. [01](_01)
2. [02](_02)
3. [03](_03)

## Step 1

```js
function setup() {
  //Create the canvas
  createCanvas(720, 720);
  //Set cursor type to a CROSS
  cursor(CROSS);
  //Change the color mode from RGB default to HSB
  colorMode(HSB, 360, 100, 100);
  //Set rects to render form the center
  rectMode(CENTER);
  //Render shapes without a stroke
  noStroke();
}
```

## Step 2

```js
f'use strict';

function setup() {
  createCanvas(720, 720);
  cursor(CROSS);

  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  //the background hue is based off the mouse Y value
  background(mouseY / 2, 100, 100);
  // the fill for the rect is scaled inversely to the mouseY value
  fill(360 - mouseY / 2, 100, 100);
  //draw the rect at the center of the screen and set its widtha nd height based off the
  //mouseX pos
  rect(width/2, height/2, mouseX + 1, mouseX + 1);
}
```

## Step 3

```js
"use strict";

function setup() {
  createCanvas(720, 720);
  cursor(CROSS);

  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background(mouseY / 2, 100, 100);

  fill(360 - mouseY / 2, 100, 100);
  rect(width / 2, height / 2, mouseX + 1, mouseX + 1);
}

function keyPressed() {
  //On pressing the S key the canvas will be saved as a png,
  //using the generative design timestamp function to name it
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
}
```
