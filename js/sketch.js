var box, drum, myPart;
var boxPat = [];
var drumPat = [];
var noises = {};
var msg = 'click to play';
var gui;

function preload() {
  box = loadSound('./assets/beatbox.mp3');
  drum = loadSound('./assets/drum.mp3');
  noises = {
    white: new p5.Noise("white"),
    brown: new p5.Noise("brown"),
    pink: new p5.Noise("pink"),
  };
}

function setup() {
  gui = createGui('Label');
  gui.addGlobals('noises')
  noStroke();
  fill(255);
  textAlign(CENTER);
  masterVolume(0.1);
  for(let i = 0; i < 64; i++){
  	boxPat.push(Math.round(Math.random()*4));
  }
  for(let i = 0; i < 64; i++){
  	drumPat.push(Math.round(Math.random()*4));
  }
  var boxPhrase = new p5.Phrase('box', playBox, boxPat);
  var drumPhrase = new p5.Phrase('drum', playDrum, drumPat);
  myPart = new p5.Part();
  myPart.addPhrase(boxPhrase);
  myPart.addPhrase(drumPhrase);
  myPart.setBPM(120);
  masterVolume(0.1);
}

function draw() {
  background(0);
  text(msg, width/2, height/2);
}

function playBox(time, playbackRate) {
  console.log(playbackRate)
  box.rate(playbackRate);
  box.play(time);
}

function playDrum(time, playbackRate) {
  drum.rate(playbackRate);
  drum.play(time);
}

function mouseClicked() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    myPart.start();
    msg = 'playing part';
  }
}
