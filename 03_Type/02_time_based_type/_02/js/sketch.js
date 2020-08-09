let textTyped = ` `;
let fontSizes = [textTyped.length];

let minFontSize = 15;
let maxFontSize = 800;
let newFontSize = 0;

//line height
let spacing = 2;
//space between letters
let tracking = 0;
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

function draw() {
  background(255);
  fill(0)

  //map the line spacing to the mouseY
  spacing = map(mouseY, 0, height, 0, 120);
  //move the matrix 200px down the screen
  translate(0, 200 + spacing);

  //store the x and y loc of where the current letter should be rendered
  var x = 0;
  var y = 0;
  var fontSize = 0;

  //Render the text
  
  //for every letter in the textTyped string....
  for (var i = 0; i < textTyped.length; i++) {
    // get fontsize for the letter from the array
    fontSize = fontSizes[i];
    //set the font and font size
    textFont(font, fontSize);
    // pull the current letter from the textTyped array
    var letter = textTyped.charAt(i);
    // get the current letters width
    var letterWidth = textWidth(letter) + tracking;

    // drop a line if the current letters width causes X to exceed screen width
    if (x + letterWidth > width) {
      x = 0;
      y += spacing;
    }

    // draw the letter
    text(letter, x, y);
    // update x for the next letter
    x += letterWidth;
  }

}//END OF DRAW
