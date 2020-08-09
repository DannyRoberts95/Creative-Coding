let font;
let textImg;

function preload() {
  font = loadFont('data/FreeSansBold.ttf');
}

function setup() {
  background(255);
  createCanvas(500, 500);
  setUpText();
  image(textImg, 0, 0);
}

function draw() {

}

function setUpText() {
  textImg = createGraphics(500, 500);
  textImg.pixelDensity(1);
  textImg.background(125);
  textImg.textFont(font);
  textImg.textSize(100);
  textImg.text("Danny", 50, 100, 50, 50);
  textImg.loadPixels();
}
