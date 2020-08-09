let font;
let textImg;

let pixelSkip = 50;
let tileNumberX;
let tileNumberY;
let tileWidth;

function preload() {
  font = loadFont('data/FreeSansBold.ttf');
}

function setup() {

  createCanvas(750, 500);

  tileNumberX = width/pixelSkip;
  tileNumberY = height/pixelSkip;

  setUpText();
  tileWidth = Math.floor(width/tileNumberX);
  // image(textImg, 0, 0);
}

function draw() {
  background(0);
  for (let i = 0; i < tileNumberX; i++) {
    for(let ii = 0; ii < tileNumberY; ii++) {

      let x = i*pixelSkip;
      let y = ii*pixelSkip;

      let index = (x + y * textImg.width) * 4;
      if(textImg.pixels[index] < 128) {
        fill(250, 180, 0);
        ellipse(x, y, pixelSkip, pixelSkip);
      }

    }
  }
}

function setUpText() {
  textImg = createGraphics(750, 500);
  textImg.pixelDensity(1);
  textImg.background(225);
  textImg.textFont(font);
  textImg.textSize(200);
  textImg.text("Dan", 50, 100, 50, 50);
  textImg.loadPixels();
}
