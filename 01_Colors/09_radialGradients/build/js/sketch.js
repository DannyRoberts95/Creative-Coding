"use strict";

let colorCount = 100;

let hueVals = [];
let satVals = [];
let brightVals = [];
let alphaVal = 100;
//define a rate of generation rate for the fragments
let generationRate = 0.45;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  randomSeed(100);
  noStroke();
}

function draw() {
  noLoop();
  background(20);
  for (let i = 0; i < colorCount; i++) {
    if (i % 2 == 0) {
      hueVals[i] = random(180, 360);
      satVals[i] = 45;
      brightVals[i] = random(100);
    } else {
      hueVals[i] = random(200, 270);
      satVals[i] = random(100);
      brightVals[i] = 80;
    }
  }

  let counter = 0;
  let rowCount = int(random(5, 30));
  let rowHeight = width / rowCount;

  for (let i = 0; i < rowCount; i++) {
    let fragmentNumber = i + 1;
    let fragmentWidths = [];

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

      //Create the fragments based on the generationRate variable
      if (random() < generationRate) {
        let w = fragmentWidths[ii];
        let h = rowHeight * 1.5;
        let x1 = fragXpos;
        let y1 = i * rowHeight;
        let x2 = x1 + w;
        let y2 = y1 + h;

        let col1 = color(
          hueVals[index],
          satVals[index],
          brightVals[index],
          alphaVal
        );
        //create a color on the opposite side of the color wheel
        let col2 = color(
          hueVals[index] - 180,
          satVals[index],
          brightVals[index],
          alphaVal
        );
        //pass the values to the center gradient function
        centerGradient(x1, y1, 0, x2, y2, max(w, h), col1, col2);
      }
      fragXpos += fragmentWidths[ii];
      counter++;
    }
  }
}

function centerGradient(x1, y1, r1, x2, y2, r2, c1, c2) {
  var ctx = drawingContext;
  var cx = x1 + (x2 - x1) / 2;
  var cy = y1 + (y2 - y1) / 2;
  var grd = ctx.createRadialGradient(cx, cy, r1, cx, cy, r2);
  grd.addColorStop(0, c1.toString());
  grd.addColorStop(1, c2.toString());
  ctx.fillStyle = grd;
  ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
}

function mouseReleased() {
  randomSeed(random(100000));
  loop();
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
  if (key == "c" || key == "C") {
    let colors = [];
    for (let i = 0; i < hueValues.length; i++) {
      colors.push(
        color(hueValues[i], saturationValues[i], brightnessValues[i])
      );
    }
    writeFile([gd.ase.encode(colors)], gd.timestamp(), "ase");
  }
}
