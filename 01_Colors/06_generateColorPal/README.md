#Color_06_generateColorPalette

This sketch generates a color palette according to a set of changeable rules. The sketch uses modulous math to offset the colors and create the pattern.

## Step 1

```js
'use strict'

let tileCountX = 50;
let tileCountY = 10;

let hueVals = [];
let satVals = [];
let brightVals = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB,360,100,100);
  noStroke();

  for (let i = 0; i < tileCountX; i++) {
    hueVals[i] = random(360);
    satVals[i] = random(100);
    brightVals[i] = random(100);
  }
}

```

## Step 2

```js
'use strict'

let tileCountX = 50;
let tileCountY = 3;

let hueVals = [];
let satVals = [];
let brightVals = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);

  for (let i = 0; i < tileCountX; i++) {
    hueVals[i] = random(360);
    satVals[i] = random(100);
    brightVals[i] = random(100);
  }
}

function draw() {
  //white background
  background(0,0,100);

  // defining the tile W and H based on the number of tiles
  let currentTileCountX = tileCountX;
  let currentTileCountY = tileCountY;
  let tileWidth = width/currentTileCountX;
  let tileHeight = height/currentTileCountY;

  //the counter var will be used to decide the fill of each tile
  let counter = 0;

  //render the tiles
  for(let gridY = 0; gridY < currentTileCountY; gridY++){
    for(let gridX = 0; gridX < currentTileCountX; gridX++){
      let posX = gridX*tileWidth;
      let posY = gridY*tileHeight;

      let index = counter % tileCountX;

      //choose the fill from the HSB arrays, and increment counter
      fill(hueVals[index],satVals[index], brightVals[index]);
      rect(posX,posY,tileWidth,tileHeight);
      counter++;
    }
  }
}

```

## Step 3

```js
'use strict'

let tileCountX = 50;
let tileCountY = 10;

let hueVals = [];
let satVals = [];
let brightVals = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  for (let i = 0; i < tileCountX; i++) {
    hueVals[i] = random(360);
    satVals[i] = random(100);
    brightVals[i] = random(100);
  }
}

function draw() {
  background(0, 0, 100);

  let counter = 0;

  // Map the tiles resolution to the mouse X & Y
  let mX = constrain(mouseX, 0, width);
  let mY = constrain(mouseY, 0, height);
  // Current tile counts are products of mX mapped to the tileCount, returned as INTs
  let currentTileCountX = int(map(mX, 0, width, 1, tileCountX));
  let currentTileCountY = int(map(mY, 0, height, 1, tileCountY));
  let tileWidth = width / currentTileCountX;
  let tileHeight = height / currentTileCountY;

  for (let gridY = 0; gridY < currentTileCountY; gridY++) {
    for (let gridX = 0; gridX < currentTileCountX; gridX++) {
      let posX = gridX * tileWidth;
      let posY = gridY * tileHeight;

      let index = counter % tileCountX;

      fill(hueVals[index], satVals[index], brightVals[index]);
      rect(posX, posY, tileWidth, tileHeight);
      counter++;
    }
  }
}

```

## Step 4

The user interaction is added in the form of controls that change the rules regarding how the color palette is generated.

```js
'use strict'

let tileCountX = 75;
let tileCountY = 25;

let hueVals = [];
let satVals = [];
let brightVals = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  for (let i = 0; i < tileCountX; i++) {
    hueVals[i] = random(360);
    satVals[i] = random(100);
    brightVals[i] = random(100);
  }
}

function draw() {
  background(0, 0, 100);

  let counter = 0;

  let mX = constrain(mouseX, 0, width);
  let mY = constrain(mouseY, 0, height);
  let currentTileCountX = int(map(mX, 0, width, 1, tileCountX));
  let currentTileCountY = int(map(mY, 0, height, 1, tileCountY));
  let tileWidth = width / currentTileCountX;
  let tileHeight = height / currentTileCountY;

  for (let gridY = 0; gridY < currentTileCountY; gridY++) {
    for (let gridX = 0; gridX < currentTileCountX; gridX++) {
      let posX = gridX * tileWidth;
      let posY = gridY * tileHeight;

      let index = counter % tileCountX;

      fill(hueVals[index], satVals[index], brightVals[index]);
      rect(posX, posY, tileWidth, tileHeight);
      counter++;
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'c' || key == 'C') {
    // -- save an ase file (adobe swatch export) --
    let colors = [];
    for (let i = 0; i < hueValues.length; i++) {
      colors.push(color(hueValues[i], saturationValues[i], brightnessValues[i]));
    }
    writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  }

  //generate colors randomly
  if(key == '1'){
    for (let i = 0; i < tileCountX; i++) {
      hueVals[i] = random(360);
      satVals[i] = random(100);
      brightVals[i] = random(100);
    }
  }
  // generate random colors with the same brightValue
  if(key == '2'){
    for (let i = 0; i < tileCountX; i++) {
      hueVals[i] = random(360);
      satVals[i] = random(100);
      brightVals[i] = 100;
    }
  }
  //generate random colors with the same saturationValues
  if(key == '3'){
    for (let i = 0; i < tileCountX; i++) {
      hueVals[i] = random(360);
      satVals[i] = 100;
      brightVals[i] = random(100);
    }
  }

  //generate random greyscale colors
  if (key == '4') {
    for (let i = 0; i < tileCountX; i++) {
      hueVals[i] = 0;
      satVals[i] = 0;
      brightVals[i] = random(100);
    }
  }

  //generate blue hues with random brightnessValues
  if (key == '5') {
    for (let i = 0; i < tileCountX; i++) {
      hueVals[i] = 195;
      satVals[i] = 100;
      brightVals[i] = random(100);
    }
  }

  // generate blue hues with random saturationValues
  if (key == '6') {
    for (let i = 0; i < tileCountX; i++) {
      hueVals[i] = 195;
      satVals[i] = random(100);
      brightVals[i] = 100;
    }
  }

  // generate random colors but within H range (0-180) and with small S & B ranges.
  if (key == '7') {
    for (let i = 0; i < tileCountX; i++) {
      hueVals[i] = random(180);
      satVals[i] = random(80, 100);
      brightVals[i] = random(50, 90);
    }
  }

  // generate random colors but within H range (180-360) and with small S & B ranges.
  if (key == '8') {
    for (let i = 0; i < tileCountX; i++) {
      hueVals[i] = random(180, 360);
      satVals[i] = random(80, 100);
      brightVals[i] = random(50, 90);
    }
  }


  if (key == '9') {
    for (let i = 0; i < tileCountX; i++) {
      // if the i value is even generate colors according to these rules else...
      if (i % 2 == 0) {
        hueVals[i] = random(360);
        satVals[i] = 100;
        brightVals[i] = random(100);
        //generate colors according to these rules
      } else {
        hueVals[i] = 195;
        satVals[i] = random(100);
        brightVals[i] = 100;
      }
    }
  }

  if (key == '0') {
    for (let i = 0; i < tileCountX; i++) {
      // if the i value is even generate colors according to these rules else...
      if (i % 2 == 0) {
        hueVals[i] = 140;
        satVals[i] = random(30, 100);
        brightVals[i] = random(40, 100);
        //generate colors according to these rules
      } else {
        hueVals[i] = 210;
        satVals[i] = random(40, 100);
        brightVals[i] = random(50, 100);
      }
    }
  }

}

```
