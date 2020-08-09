# Color_02_colorGrid

This sketch illustrates the HSB color system using a grid layout that scales the tiles in the grid using the mouse location.

## Step 1

```js
'use strict';

function setup() {
  createCanvas(800, 400);
  noStroke();
  //Set the color mode to HSB using Width as the maxHue value, height as the maxSat value
  //and maintaining brightness at 100
  colorMode(HSB, width, height, 100);
}

function draw() {
}

```

## Step 2

```js
'use strict';

var stepX;
var stepY;

function setup() {
  createCanvas(800, 400);
  noStroke();
  colorMode(HSB, width, height, 100);
}

function draw() {

  // set the step value as 15 pixels so each grid square will end up as 15px wide
  stepX = 15;
  stepY = 15;

  //create a vertical column of boxes
  for (var gridY = 0; gridY < height; gridY += stepY) {
    // for every box in the vertical column create a row of boxes
    for (var gridX = 0; gridX < width; gridX += stepX) {
      //fill the boxes with their positional values which correspond to their space in the vertical spectrum
      fill(gridX, height - gridY, 100);
      //draw the box
      rect(gridX, gridY, stepX, stepY);
    }
  }
}

```

## Step 3

```js

'use strict';

var stepX;
var stepY;

function setup() {
  createCanvas(800, 400);
  noStroke();
  colorMode(HSB, width, height, 100);
}

function draw() {

  //using the mouseX and mouseY to define the size of each box in the grid
  //the max function will choose the higher of the two arguments passed to it so that
  //a negative value is not passed as the step
  stepX = max(mouseX,2);
  stepY = max(mouseY,2);

  for (var gridY = 0; gridY < height; gridY += stepY) {
    for (var gridX = 0; gridX < width; gridX += stepX) {
      fill(gridX, height - gridY, 100);
      rect(gridX, gridY, stepX, stepY);
    }
  }
}
```

## Step 4

```js
'use strict';

var stepX;
var stepY;

function setup() {
  createCanvas(800, 400);
  noStroke();
  colorMode(HSB, width, height, 100);
}

function draw() {

  //using the mouseX and mouseY to define the size of each box in the grid
  //the max function will choose the higher of the two arguments passed to it so that
  //a negative value is not passed as the step
  stepX = max(mouseX,2);
  stepY = max(mouseY,2);

  for (var gridY = 0; gridY < height; gridY += stepY) {
    for (var gridX = 0; gridX < width; gridX += stepX) {
      fill(gridX, height - gridY, 100);
      rect(gridX, gridY, stepX, stepY);
    }
  }
}

//on key press, if the key is 'S' save the canvas using the gd timestamp function. file saves as a png
function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
```
