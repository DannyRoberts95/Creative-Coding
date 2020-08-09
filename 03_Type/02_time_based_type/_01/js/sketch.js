//The var to hold the text typed
let textTyped = ` `;
// the array to hold the size of each typed letter
let fontSizes = [textTyped.length];

let minFontSize = 15;
let maxFontSize = 800;
//var to hold the rythmic font size
let newFontSize = 0;

//chosen font
let font = `helvetica`;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textFont(font);
  textAlign(LEFT);

  //store a fontsize for each letter in the textTyped place holder based on minFontSize
  for (var i = 0; i < textTyped.length; i++) {
    fontSizes[i] = minFontSize;
  }
}
