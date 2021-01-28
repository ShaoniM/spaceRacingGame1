var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var score = 0;
var database;
var distance =  0;
var form, player, game;

var spaceships, spaceship1, spaceship2, gAliensGroup, bAliensGroup;
var gAlien, bAlien;
var spaceship1Img, spaceship2Img, bgImg, goodAlienImg, badAlienImg;

function preload(){
  bgImg = loadImage("images/background.jpg");
  spaceship1Img = loadImage("images/Ship1final.png");
  spaceship2Img = loadImage("images/ship2final.png");
 goodAlienImg = loadImage("images/goodAlien.jpg");
 badAlienImg= loadImage("images/badAlien.jpg");
}

function setup(){
  canvas = createCanvas(displayWidth-20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  gAliensGroup = new Group();
 bAliensGroup = new Group();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
