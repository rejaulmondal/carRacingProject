var player;
var npc1, npc2;
var bg;
var npc1group, npc2group;
var gameOver;
var gameState = "play";
var score = 0;
var lives = 5;

function preload(){
 bgImg = loadImage("road.jpg");
 playerImg = loadImage("player.png");
 npc1Img = loadImage("npc1.png");
 npc2Img = loadImage("npc2.png");
 gameOverImg = loadImage("gameover.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  bg = createSprite(width/2, height/2, 1920, 1080);
  bg.addImage("bgImg", bgImg);
  bg.scale = 3

  bg.velocityY = 5;

  player = createSprite(960,780,50,100);
  player.addImage("playerImg", playerImg);
  player.scale = 0.2;

  gameOver = createSprite(960,200,150,150);
  gameOver.addImage("gameOverImg", gameOverImg);
  gameOver.scale = 4;

  npc1group = new Group();
  npc2group = new Group();
}

function draw() {
  background(100);

  if(gameState === "play"){

    gameOver.visible = false;

    bg.velocityY = bg.velocityY + 0.05;
    player.velocityX = 0;
  
    if(keyIsDown(RIGHT_ARROW)){
      player.velocityX = player.velocityX + 15;
    }
  
    if(keyIsDown(LEFT_ARROW)){
      player.velocityX = player.velocityX - 15;
    };
  
    npc1();
    npc2();
  
    if(frameCount % 10 ===0){
      score = score + 10;
    }
  
    if(player.isTouching(npc1group) || player.isTouching(npc2group)){
        lives = lives - 1;
        player.x = 960;
        player.y = 780;
      }

    if(lives === 0){
      gameState = "stop";
    }
  }

  if(gameState === "stop"){

  npc1group.setVelocityEach(0,0);
  npc2group.setVelocityEach(0,0);
  
  bg.setVelocity(0,0);
  
  gameOver.visible = true;

  if(keyIsDown(RIGHT_ARROW)){
    player.velocityX = 0;
  }

  if(keyIsDown(LEFT_ARROW)){
    player.velocityX = 0;
  }
}

  drawSprites();
  textSize(50);
  text("SCORE :" + score, 100,100);
  text("LIVES :" + lives, 1600,100);
  console.log(frameCount);
}

function npc1(){

  var npc1 = createSprite(random(100,1820), -200, 50, 100);

  if(frameCount % 150===0){
    npc1.addImage("npc1Img", npc1Img);
    npc1.scale = 0.3;
    npc1.velocityY = npc1.velocityY + 23;
  }
  
  npc1group.add(npc1);
}

function npc2(){

  var npc2 = createSprite(random(100,1820), -200, 50, 100);
  if(frameCount % 100===0){
    
    npc2.addImage("npc2Img", npc2Img);
    npc2.scale = 1;
    npc2.velocityY = npc2.velocityY + 23; 
  }
  
  npc2group.add(npc2);
}