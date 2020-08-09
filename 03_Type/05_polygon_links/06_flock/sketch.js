let font;
let textImg;

let particles = [];

let pixelSkip = 20;
let fontSize = 250;
let randomness = 0;
let connectionFactor = 3;
let strokeW = 0.5;
let textToBeRendered = "FORM";
let degenerationRate = 0;
let hideControls = false;

let connectionDistance = pixelSkip * connectionFactor;

function preload() {
  font = loadFont("data/Montserrat-Bold.ttf");
}

function setup() {
  createInputs();

  cursor(CROSS);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(30);

  var canvasDiv = document.getElementById("canvas-holder");
  canvasW = canvasDiv.offsetWidth;
  canvas = createCanvas(canvasW - 25, windowHeight * 0.6);
  canvas.parent("canvas-holder");

  setUpText();
  generateParticles();
}

function draw() {
  background(7);
  // randomSeed(1);

  for (let p of particles) {
    p.run(particles);
  }
  endShape();
}

//********************************************************************************************************
//UTILITY FUNCTIONS
//********************************************************************************************************
function generateParticles() {
  particles = [];
  for (let x = 0; x < width; x += pixelSkip) {
    for (let y = 0; y < height; y += pixelSkip) {
      let index = floor((x + y * textImg.width) * 4);

      let col;
      if (index % 2 === 0) {
        col = color(213, 100, 50);
      } else col = color(19, 100, 50);

      let r = random();
      if (textImg.pixels[index] < 128 && r > degenerationRate) {
        particles.push(
          new Particle(
            x + random(-randomness, randomness),
            y + random(-randomness, randomness),
            1,
            col
          )
        );
      }
    }
  }
}

function setUpText() {
  textImg = createGraphics(canvasW, windowHeight * 0.75);
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

  setUpText();
  generateParticles();
  clear();
}
