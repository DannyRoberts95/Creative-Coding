let font;
let textImg;

let particles = [];

let pixelSkip = 25;
let fontSize = 300;
let randomness = 0;
let connectionFactor = 3;
let strokeW = 0.5;
let textToBeRendered = "LINKS";
let degenerationRate = 0;

// let backgroundColor = 17;
// let textColor = 255;

function preload() {
  font = loadFont("data/Montserrat-Bold.ttf");
}

function setup() {
  createInputs();

  cursor(CROSS);
  frameRate(30);

  textColor = color(
    hexToRgb(colorPickerText.value()).r,
    hexToRgb(colorPickerText.value()).g,
    hexToRgb(colorPickerText.value()).b
  );

  backgroundColor = color(
    hexToRgb(colorPickerBackground.value()).r,
    hexToRgb(colorPickerBackground.value()).g,
    hexToRgb(colorPickerBackground.value()).b
  );

  var canvasDiv = document.getElementById("canvas-holder");
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-holder");

  setUpText();
  generateParticles();
}

function draw() {
  background(backgroundColor);
  // randomSeed(1);

  let connectionDistance = pixelSkip * connectionFactor;

  for (let p of particles) {
    p.run();
    for (let p2 of particles) {
      let d = dist(p.loc.x, p.loc.y, p2.loc.x, p2.loc.y);
      if (d > connectionDistance || p === p2) continue;
      let a = map(d, 0, connectionDistance, 100, 25);
      let sw = map(d, 0, connectionDistance, strokeW, strokeW / 100);

      strokeWeight(sw);
      stroke(p.col, a);
      line(p.loc.x, p.loc.y, p2.loc.x, p2.loc.y);
      // vertex(p2.loc.x,p2.loc.y);
    }
  }
}

//********************************************************************************************************
//UTILITY FUNCTIONS
//********************************************************************************************************
function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
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

function generateParticles() {
  particles = [];
  for (let x = 0; x < width; x += pixelSkip) {
    for (let y = 0; y < height; y += pixelSkip) {
      let index = floor((x + y * textImg.width) * 4);

      let r = random();
      if (textImg.pixels[index] < 128 && r > degenerationRate) {
        particles.push(
          new Particle(
            x + random(-randomness, randomness),
            y + random(-randomness, randomness),
            1,
            textColor
          )
        );
      }
    }
  }
}

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

let textInput,
  pixelSkipInput,
  fontSizeSlider,
  randomnessSlider,
  textInputButton,
  connectionDistanceSlider,
  strokeWeightSlider,
  degenerationSlider,
  colorPicker;

function createInputs() {
  textInput = createInput(textToBeRendered);
  textInput.parent(`input-holder`);

  colorPickerText = createInput("#e6e6e6", "color");
  colorPickerText.parent(`colorPickerText-holder`);

  colorPickerBackground = createInput("#1a1a1a", "color");
  colorPickerBackground.parent(`colorPickerBackground-holder`);

  pixelSkipInput = createSlider(10, 50, pixelSkip);
  pixelSkipInput.parent(`pixelSkip-holder`);

  fontSizeSlider = createSlider(72, 450, fontSize);
  fontSizeSlider.parent(`fontSize-holder`);

  strokeWeightSlider = createSlider(0.25, 10, strokeW);
  strokeWeightSlider.parent(`strokeWeight-holder`);

  connectionDistanceSlider = createSlider(0.5, 5, connectionFactor);
  connectionDistanceSlider.parent(`connectionDistance-holder`);

  degenerationSlider = createSlider(0, 1000, degenerationRate);
  degenerationSlider.parent(`degenerationSlider-holder`);

  randomnessSlider = createSlider(0, 100, randomness);
  randomnessSlider.parent(`randomSlider-holder`);

  textInputButton = createButton("Render");
  textInputButton.parent(`textInputButton-holder`);
  textInputButton.class("button is-info");
  textInputButton.mousePressed(function() {
    reset();
  });
}

function reset() {
  randomness = randomnessSlider.value();
  fontSize = fontSizeSlider.value();
  strokeW = strokeWeightSlider.value();
  pixelSkip = int(pixelSkipInput.value());
  textToBeRendered = textInput.value();
  connectionFactor = connectionDistanceSlider.value();
  degenerationRate = map(degenerationSlider.value(), 0, 1000, 0, 1);

  textColor = color(
    hexToRgb(colorPickerText.value()).r,
    hexToRgb(colorPickerText.value()).g,
    hexToRgb(colorPickerText.value()).b
  );

  backgroundColor = color(
    hexToRgb(colorPickerBackground.value()).r,
    hexToRgb(colorPickerBackground.value()).g,
    hexToRgb(colorPickerBackground.value()).b
  );

  setUpText();
  generateParticles();
  clear();
}

function keyPressed() {
  if (key === "f" || key === "F") {
    fullscreen(true);
    resizeCanvas(windowWidth, windowHeight);
    // setup();
  } else if (key === "n" || key === "N") {
    noLoop();
  }
}
