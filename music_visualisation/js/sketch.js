let song;
let playing = false;

function preload() {
  soundFormats("mp3", "ogg");
  song = loadSound("data/song");
}

function setup() {
  createCanvas(windowHeight, windowHeight);
  background(220);
}

function keyPressed() {
  let saveStr = `${new Date()}`;
  if (key == "s" || key == "S") saveCanvas(saveStr, "png");
  if (playing && key == "p" || key == "P") {
    song.pause();
  } else song.play();
  playing = !playing;
}
