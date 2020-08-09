# Color_08_alphaFragments

This sketch builds on sketch 07 by adding alpha transparency, overlap and linear gradients to the fragments.

## Step 1

```js

'use strict'

let colorCount = 100;

let hueVals = [];
let satVals = [];
let brightVals = [];

// define an alpha value for the fragments
let alphaVal = 22;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //define the alpha range as a 100
  colorMode(HSB, 360, 100, 100, 100);
  randomSeed(10);
  noStroke();
}

function draw() {
  noLoop();
  background(0);
  for (let i = 0; i < colorCount; i++) {
    if (i % 2 == 0) {
      hueVals[i] = random(360);
      satVals[i] = 100;
      brightVals[i] = random(100);
    } else {
      hueVals[i] = 195;
      satVals[i] = random(100);
      brightVals[i] = 100;
    }
  }

  let counter = 0;
  let rowCount = int(random(5, 30));
  let rowHeight = width / rowCount;

  for (let i = 0; i < rowCount; i++) {
    let fragmentNumber = i + 1;
    let fragmentWidths = []

    for (let ii = 0; ii < fragmentNumber; ii++) {
      if (random() < 0.075) {
        let fragments = int(random(2, 20));
        fragmentNumber += fragments;
        for (let iii = 0; iii < fragments; iii++) {
          fragmentWidths.push(random(2));
        }
      } else {
        fragmentWidths.push(random(2, 20));
      }
    }

    let widthSum = 0;
    for (let ii = 0; ii < fragmentNumber; ii++) {
      widthSum += fragmentWidths[ii];
    }

    for (let ii = 0; ii < fragmentNumber; ii++) {
      let scaledWidth = (fragmentWidths[ii] / widthSum) * width;
      fragmentWidths[ii] = scaledWidth;
    }

    let fragXpos = 0;
    for (let ii = 0; ii < fragmentNumber; ii++) {

      let index = counter % colorCount;

      let x = fragXpos;
      // create an over lap by increasing the row height
      let h = rowHeight * 1.5;
      let y = i * rowHeight;
      let w = fragmentWidths[ii];

      //color 1 for the gradient is black
      let col1 = color(0);
      // color 2 for the gradiant pulled from the HSB arrays
      let col2 = color(hueVals[index], satVals[index], brightVals[index], alphaVal);
      //pass the location and colors to the gradient function
      gradient(x, y, w, h, col2, col1);
      fragXpos += fragmentWidths[ii];
      counter++;

    }
  }
}

function gradient(x, y, w, h, c1, c2) {
  //store a reference to the drawing context
  let ctx = drawingContext;
  //store the gradiant in a varible
  let grd = ctx.createLinearGradient(x, y, x, y + h);
  //deifne the colors that will make up the gradiant
  grd.addColorStop(0, c1.toString());
  grd.addColorStop(1, c2.toString());
  // fill the context with the gradiant
  ctx.fillStyle = grd;
  // draw the rect
  ctx.fillRect(x, y, w, h);
}

function mouseReleased() {
  randomSeed(random(100000));
  loop();
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'c' || key == 'C') {

    let colors = [];
    for (let i = 0; i < hueValues.length; i++) {
      colors.push(color(hueValues[i], saturationValues[i], brightnessValues[i]));
    }
    writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  }
}

```
