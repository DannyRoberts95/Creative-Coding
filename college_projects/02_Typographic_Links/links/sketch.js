let canvas; //var for the canvas
let font; // var for the font
let textImg; // var to store the txt image
let particles = []; //array to hold the particles

let resolution = 20; //pixels ample rate
let fontSize = 175; //how big the text will be
let distortion = 0; //by how much the text will be distorted
let linkThreshold = 2; //resolution * linkThreshold = the link distance of particles
let strokeW = 0.5; // line stroke weight
let textToBeRendered = "LINKS";
let degenerationRate = 0; // Chance for particles not to be spawned even when spawing conditions are met

//preload the font
function preload() {
  font = loadFont("data/Montserrat-Bold.ttf");
}

function setup() {
  // create DOM inputs
  createInputs();

  //set cursor to the CROSS
  cursor(CROSS);
  //cap the frame rate
  frameRate(30);

  // using the hexToRGB function, convert the color input to RBG and assign it
  textColor = color(
    hexToRgb(colorPickerText.value()).r,
    hexToRgb(colorPickerText.value()).g,
    hexToRgb(colorPickerText.value()).b
  );

  // using the hexToRGB function, convert the color input to RBG and assign it
  backgroundColor = color(
    hexToRgb(colorPickerBackground.value()).r,
    hexToRgb(colorPickerBackground.value()).g,
    hexToRgb(colorPickerBackground.value()).b
  );

  //create the canvas and assign its parent
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-holder");

  setUpText(); // setup the text
  generateParticles(); // generate the particle system
}

function draw() {
  background(backgroundColor);

  let connectionDistance = resolution * linkThreshold; // set connectionDistance

  //for every particle..
  for (let p of particles) {
    //run the particle
    p.run();
    //for every particle...
    for (let p2 of particles) {
      // get the distance between them
      let d = dist(p.loc.x, p.loc.y, p2.loc.x, p2.loc.y);
      // if the distance is too far or the other particle is equal to this one, skip this iteration
      if (d > connectionDistance || p === p2) continue;

      //set the alpha value and based on the distance
      let a = map(d, 0, connectionDistance, 100, 25);
      //set the stroke weight based on the strokeW var and the distance
      let sw = map(d, 0, connectionDistance, strokeW, strokeW / 100);

      //draw a line between the two particles
      strokeWeight(sw);
      stroke(p.col, a);
      line(p.loc.x, p.loc.y, p2.loc.x, p2.loc.y);
    }
  }
}

//********************************************************************************************************
//UTILITY FUNCTIONS
//********************************************************************************************************

//Vars to hold the DOM input
let textInput,
  resolutionInput,
  fontSizeSlider,
  distortionSlider,
  textInputButton,
  connectionDistanceSlider,
  strokeWeightSlider,
  degenerationSlider,
  colorPickerText,
  colorPickerBackground;

function createInputs() {
  //create an input...
  textInput = createInput(textToBeRendered)
    .parent(`input-holder`) // set its parent
    .addClass(`dataInput`) // set its class
    .changed(() => {
      // set an anonymous arrow function callback function to run when input changes
      //update the input values
      setValues();
      //generate the particles with the new values
      generateParticles();
    });
  //same code for other inputs

  colorPickerText = createInput("#e6e6e6", "color")
    .addClass(`dataInput`)
    .parent(`colorPickerText-holder`)
    .changed(() => {
      setValues();
      updateInputLables();
    });

  colorPickerBackground = createInput("#1a1a1a", "color")
    .addClass(`dataInput`)
    .parent(`colorPickerBackground-holder`)
    .changed(() => {
      setValues();
      updateInputLables();
    });

  resolutionInput = createSlider(15, 55, resolution)
    .parent(`resolution-holder`)
    .addClass(`dataInputSlider`)
    .changed(() => {
      setValues();
      updateInputLables();
    });

  fontSizeSlider = createSlider(12, 450, fontSize)
    .parent(`fontSize-holder`)
    .addClass(`dataInputSlider`)
    .changed(() => {
      setValues();
      updateInputLables();
    });

  strokeWeightSlider = createSlider(1, 10, strokeW)
    .parent(`strokeWeight-holder`)
    .addClass(`dataInputSlider`)
    .changed(() => {
      setValues();
      updateInputLables();
    });

  connectionDistanceSlider = createSlider(0, 5, linkThreshold)
    .parent(`connectionDistance-holder`)
    .addClass(`dataInputSlider`)
    .changed(() => {
      setValues();
      updateInputLables();
    });

  degenerationSlider = createSlider(0, 1000, degenerationRate)
    .parent(`degenerationSlider-holder`)
    .addClass(`dataInputSlider`)
    .changed(() => {
      setValues();
      updateInputLables();
    });

  distortionSlider = createSlider(0, 100, distortion)
    .parent(`distortionSlider-holder`)
    .addClass(`dataInputSlider`)
    .changed(() => {
      setValues();
      updateInputLables();
    });

  updateInputLables();
}

// Function to set the values to the DOM inputs and set them to the values
function setValues() {
  // for each variable get the corresponding value from the DOM input and assign it
  distortion = distortionSlider.value();
  fontSize = fontSizeSlider.value();
  strokeW = strokeWeightSlider.value();
  resolution = int(resolutionInput.value());
  linkThreshold = connectionDistanceSlider.value();
  degenerationRate = map(degenerationSlider.value(), 0, 1000, 0, 1);

  //set the text & background color based on the R,G and B values in the object
  // returned by the hexToRgb function
  let newTextCol = hexToRgb(colorPickerText.value());
  textColor = color(newTextCol.r, newTextCol.g, newTextCol.b);

  let newBackgroundCol = hexToRgb(colorPickerBackground.value());
  backgroundColor = color(
    newBackgroundCol.r,
    newBackgroundCol.g,
    newBackgroundCol.b
  );

  //set up the text with the new values
  setUpText();
  //generate the particle system
  generateParticles();
}

//function to generate the particle system
function generateParticles() {
  //empty the particle array
  particles = [];
  //loop through the pixel array of the textImg...
  for (let x = 0; x < width; x += resolution) {
    for (let y = 0; y < height; y += resolution) {
      //get the 1D pixel index from the 2D values...
      let index = floor((x + y * textImg.width) * 4);

      //generate a random value to measure against the degenerationRate
      let r = random();
      //if the red value of the current pixel is below 128 and the randomvalue is greater than degeneration rate...
      if (textImg.pixels[index] < 128 && r > degenerationRate) {
        //Push a new particle int the array
        particles.push(
          new Particle(
            //Add the distortion value to the x and y
            x + random(-distortion, distortion),
            y + random(-distortion, distortion),
            1,
            textColor
          )
        );
      }
    }
  }
}

//funtion to generate the text Pgraphic
function setUpText() {
  textImg = createGraphics(windowWidth, windowHeight);
  textImg.pixelDensity(1);
  textImg.background(225);
  textImg.textAlign(CENTER, CENTER);
  textImg.textFont(font);
  textImg.textSize(fontSize);
  textImg.text(textInput.value(), width / 2, height / 2 + fontSize / 2, 50, 50);
  textImg.loadPixels();
}

//Function to update the values displayed in the HTML besdie the DOM inputs
function updateInputLables() {
  //get the target element by its ID, and set its inner HTML
  document.getElementById("resolution-text").innerHTML =
    "Resolution: " + resolution;
  document.getElementById("fontSize-text").innerHTML = "Font Size: " + fontSize;
  document.getElementById("strokeWeight-text").innerHTML =
    "Stroke Weight: " + strokeW;
  document.getElementById("connectionDistance-text").innerHTML =
    "Link Threshold: " + linkThreshold;
  document.getElementById("distortionSlider-text").innerHTML =
    "Distortion: " + distortion;
  document.getElementById("degenerationSlider-text").innerHTML =
    "Degeneration: " + degenerationRate;
}

//function to convert hexideciaml values to RGB values
function hexToRgb(hex) {
  // using a regular expression to expand the shorthand Hex vaues to the longform one
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

// //Function to fullscreen the app
// function keyPressed() {
//   if (key === "f" || key === "F") {
//     fullscreen(true);
//     resizeCanvas(windowWidth, windowHeight);
//     setValues();
//   }
// }
