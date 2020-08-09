# Type

## Interactive Type Generation

Generating Type with DOM element inputs from user.

## Part one

```js
let font;
let textImg;

let pixelSkipSlider, fillCheck, textInput;

// define how many pixels will be skipped in the nested loop thorugh the pixels
let pixelSkip = 3;
let tileNumberX;
let tileNumberY;
let tileWidth;
let textToBeRendered = "";

function preload() {
  font = loadFont("data/FreeSansBold.ttf");
}

function setup() {
  //create a canvas and store in a variable
  let canvas = createCanvas(650, 500);
  //define the HTML parent of the canvas object
  canvas.parent(`canvas-holder`);

  //create the input
  pixelSkipSlider = createSlider(1, 20, pixelSkip);
  //define its parent
  pixelSkipSlider.parent(`input-holder`);
  //define a callback function when its changed
  pixelSkipSlider.mouseReleased(updateVars);

  fillCheck = createCheckbox(`Fill`, true);
  fillCheck.parent(`input-holder`);
  fillCheck.mouseReleased(updateVars);

  textInput = createInput(textToBeRendered);
  textInput.parent(`input-holder`);
  textInput.input(updateVars);

  tileNumberX = width / pixelSkip;
  tileNumberY = height / pixelSkip;

  tileWidth = Math.floor(width / tileNumberX);

  //function to create the PGraphic wih the text
  setUpText();
}

function draw() {
  background(0);
  //for every pixel in the text img...
  for (let i = 0; i < tileNumberX; i++) {
    for (let ii = 0; ii < tileNumberY; ii++) {
      //define the x and y location
      let x = i * pixelSkip;
      let y = ii * pixelSkip;

      //find the index in the pixel array
      let index = (x + y * textImg.width) * 4;

      //if the pixels R value is less than 128 draw an ellipse
      if (textImg.pixels[index] < 128) {
        if (fillCheck.checked()) {
          fill(250, 180, 0);
        } else {
          noFill();
          stroke(250, 180, 55);
          strokeWeight(1);
        }
        ellipse(x, y, pixelSkip, pixelSkip);
      }
    }
  }
}

function setUpText() {
  //create a PGraphic
  textImg = createGraphics(750, 500);
  //set PD to 1
  textImg.pixelDensity(1);
  //set background
  textImg.background(225);
  //Draw text onto the graphic
  textImg.textFont(font);
  textImg.textSize(200);
  textImg.text(textInput.value(), 50, 100, 50, 50);
  //load the graphics pixels
  textImg.loadPixels();
}

//call back for the pixel skip input
function updateVars() {
  pixelSkip = pixelSkipSlider.value();
  setUpText();
}
```

## Part Two

```js
//vars to store canvas sizes
let canvasDiv;
let canvasW;
let canvasH = 750;

let font;
let textImg;
let pixelSkipSlider, fillCheck, textInput;

let pixelSkip = 3;
let tileNumberX;
let tileNumberY;
let tileWidth;
let textToBeRendered = "Dan";

function preload() {
  font = loadFont("data/FreeSansBold.ttf");
}

function setup() {
  pixelSkipSlider = createSlider(1, 20, pixelSkip);
  pixelSkipSlider.parent(`input-holder`);
  //replace the named function with an anonymous callback upon input change
  pixelSkipSlider.mouseReleased(function() {
    pixelSkip = pixelSkipSlider.value();
    setUpText();
  });

  fillCheck = createCheckbox(`Fill`, true);
  fillCheck.parent(`input-holder`);

  textInput = createInput(textToBeRendered);
  textInput.parent(`input-holder`);
  textInput.input(function() {
    textToBeRendered = textInput.value();
    setUpText();
  });

  //find canvas holder
  var canvasDiv = document.getElementById("canvas-holder");
  //find the width of the canvas holder
  canvasW = canvasDiv.offsetWidth;
  //create a canvas the same width as its parent - the margin
  canvas = createCanvas(canvasW - 25, canvasH);
  // set parent
  canvas.parent("canvas-holder");

  tileNumberX = width / pixelSkip;
  tileNumberY = height / pixelSkip;

  setUpText();
  tileWidth = Math.floor(width / tileNumberX);
  // image(textImg, 0, 0);
}

function draw() {
  background(0);
  for (let i = 0; i < tileNumberX; i++) {
    for (let ii = 0; ii < tileNumberY; ii++) {
      let x = i * pixelSkip;
      let y = ii * pixelSkip;

      let index = (x + y * textImg.width) * 4;
      if (textImg.pixels[index] < 128) {
        if (fillCheck.checked()) {
          fill(250, 180, 0);
        } else {
          noFill();
          stroke(250, 180, 55);
          strokeWeight(1);
        }
        ellipse(x, y, pixelSkip, pixelSkip);
      }
    }
  }
}

function setUpText() {
  //graphic is created with canvas W and H variables
  textImg = createGraphics(canvasW, canvasH);
  textImg.pixelDensity(1);
  textImg.background(225);
  textImg.textFont(font);
  textImg.textSize(200);
  textImg.text(textInput.value(), 50, 100, 50, 50);
  textImg.loadPixels();
}

//When the window is resized...
function windowResized() {
  //redefine the canvasW var
  var canvasDiv = document.getElementById("canvas-holder");
  canvasW = canvasDiv.offsetWidth;
  //resize the canvas
  resizeCanvas(width - 25, canvasH);
}
```

## Part Three
 ```js

 let canvasDiv, canvasW;
 let canvasH = 750;

 let font;

 let textImg;
 let colorImg;

 let pixelSkipSlider, fillCheck, textInput;

 let pixelSkip = 10;
 let unitSize = 5;
 let fontSize = 100;

 let tileNumberX;
 let tileNumberY;
 let tileWidth;
 let textToBeRendered = "Dan";

 function preload() {
   font = loadFont("data/FreeSansBold.ttf");
   colorImg = loadImage("data/gradient.png");
 }

 function setup() {
   colorImg.loadPixels();

   textInput = createInput(textToBeRendered);
   textInput.parent(`input-holder`);
   textInput.input(function() {
     textToBeRendered = textInput.value();
     setUpText();
   });

   unitSizelider = createSlider(1, 50, unitSize);
   unitSizelider.parent(`size-holder`);
   unitSizelider.mouseReleased(function() {
     unitSize = unitSizelider.value();
     setUpText();
   });

   pixelSkipSlider = createSlider(5, 50, pixelSkip);
   pixelSkipSlider.parent(`pixelSkip-holder`);
   pixelSkipSlider.mouseReleased(function() {
     pixelSkip = pixelSkipSlider.value();
     setUpText();
   });

   fillCheck = createCheckbox(``, true);
   fillCheck.parent(`fill-holder`);

   fontSizeSlider = createSlider(5, 500, fontSize);
   fontSizeSlider.parent(`fontSize-holder`);
   fontSizeSlider.mouseReleased(function() {
     fontSize = fontSizeSlider.value();
     setUpText();
   });

   var canvasDiv = document.getElementById("canvas-holder");
   canvasW = canvasDiv.offsetWidth;
   canvas = createCanvas(canvasW - 25, canvasH);
   canvas.parent("canvas-holder");

   tileNumberX = width / pixelSkip;
   tileNumberY = height / pixelSkip;

   setUpText();
 }

 function draw() {
   // noLoop();
   background(255);

   //alternate version of the nexted for loop drawing the image
   for (let y = 0; y < height; y += pixelSkip) {
     for (let x = 0; x < height; x += pixelSkip) {
       let index = (x + y * textImg.width) * 4;

       //if the pixel value of the graphic is darker than 128
       if (textImg.pixels[index] < 128) {
         //pull the RGB values from the gradian picture array
         let r = colorImg.pixels[index];
         let g = colorImg.pixels[index + 1];
         let b = colorImg.pixels[index + 2];

         //create a color object
         let col = color(r, g, b);

         if (fillCheck.checked()) {
           noStroke();
           fill(col);
         } else {
           noFill();
           stroke(col);
           strokeWeight(1);
         }
         ellipse(x, y, unitSize * 2, unitSize * 2);
       }
     }
   }
 }

 function setUpText() {
   textImg = createGraphics(canvasW, canvasH);
   textImg.pixelDensity(1);
   textImg.background(225);
   textImg.textAlign(CENTER, CENTER);
   textImg.textFont(font);
   textImg.textSize(fontSize);
   textImg.text(textInput.value(), width / 2, height / 2);
   textImg.loadPixels();
 }

 function windowResized() {
   var canvasDiv = document.getElementById("canvas-holder");
   canvasW = canvasDiv.offsetWidth;
   resizeCanvas(width - 25, canvasH);
 }

 ```

## Part Four
```js

let canvasDiv, canvasW;
let canvasH = 500;

let font;

let textImg;
let colorImg;

let pixelSkip = 10;
let unitSize = 5;
let fontSize = 100;

let tileNumberX;
let tileNumberY;
let tileWidth;
let textToBeRendered = "Dan";

function preload() {
  font = loadFont("data/FreeSansBold.ttf");
  colorImg = loadImage("data/gradient.png");
}

function setup() {
  textInput = createInput(textToBeRendered);
  textInput.parent(`input-holder`);
  textInput.input(function() {
    textToBeRendered = textInput.value();
    setUpText();
  });

  unitSizelider = createSlider(1, 50, unitSize);
  unitSizelider.parent(`size-holder`);
  unitSizelider.mouseReleased(function() {
    unitSize = unitSizelider.value();
    setUpText();
  });

  pixelSkipSlider = createSlider(5, 50, pixelSkip);
  pixelSkipSlider.parent(`pixelSkip-holder`);
  pixelSkipSlider.mouseReleased(function() {
    pixelSkip = pixelSkipSlider.value();
    setUpText();
  });

  fillCheck = createCheckbox(``, true);
  fillCheck.parent(`fill-holder`);

  fontSizeSlider = createSlider(5, 750, fontSize);
  fontSizeSlider.parent(`fontSize-holder`);
  fontSizeSlider.mouseReleased(function() {
    fontSize = fontSizeSlider.value();
    setUpText();
  });

  var canvasDiv = document.getElementById("canvas-holder");
  canvasW = canvasDiv.offsetWidth;
  canvas = createCanvas(canvasW - 25, canvasH);
  canvas.parent("canvas-holder");

  tileNumberX = width / pixelSkip;
  tileNumberY = height / pixelSkip;

  setUpText();

  colorImg.loadPixels();

}

function draw() {
  background(255);
  for (let i = 0; i < tileNumberX; i++) {
    for (let ii = 0; ii < tileNumberY; ii++) {

      let x = i * pixelSkip;
      let y = ii * pixelSkip;

      //map and floor the current X to an X2 var that works for the gradient color image,
      //important, as the canvas/ graphic size will be changing
      let x2 = floor(map(x,0,width,0,colorImg.width));
      let y2 = floor(map(y,0,height,0,colorImg.height));

      let index = floor((x + y * textImg.width) * 4);
      //define and index2 for the color gradient image
      let index2 = floor((x2 + y2 * colorImg.width) * 4);

      if (textImg.pixels[index] < 128) {

        let r = colorImg.pixels[index2];
        let g = colorImg.pixels[index2+1];
        let b = colorImg.pixels[index2+2];
        let a = colorImg.pixels[index2+3];

        let col = color(r,g,b,a);

        if (fillCheck.checked()) {
          noStroke();
          fill(col);
        } else {
          noFill();
          stroke(col);
          strokeWeight(1);
        }
        ellipse(x, y, unitSize*2, unitSize*2);
      }
    }
  }
}

function setUpText() {
  textImg = createGraphics(canvasW, canvasH);
  textImg.pixelDensity(1);
  textImg.background(225);
  textImg.textAlign(CENTER,CENTER);
  textImg.textFont(font);
  textImg.textSize(fontSize);
  textImg.text(textInput.value(), width/2, height/2, 50, 50);
  textImg.loadPixels();
}

function windowResized() {
  var canvasDiv = document.getElementById("canvas-holder");
  canvasW = canvasDiv.width;
  resizeCanvas(width - 25, canvasH);
}

```
