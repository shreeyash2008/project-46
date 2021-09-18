var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieImg;
var bullet,bulletImg;
var bulletGroup,zombieGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;
var life=3;
var heart,heart3Img,heart2Img,heart1Img;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg=loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  bulletImg=loadImage("assets/bullet.png");
  heart3Img=loadImage("assets/heart_3.png");
  heart2Img=loadImage("assets/heart_2.png");
  heart1Img=loadImage("assets/heart_1.png");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
bulletGroup=new Group();
zombieGroup=new Group();


//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false;
   player.setCollider("rectangle",0,0,300,300)
   scoreBoard=createElement("h3");
   heartBoard=createElement("h3");
   
   heart=createSprite(width/2+200,75);
   heart.addImage(heart3Img);
   heart.scale=0.2
}

function draw() {

 // background(0); 
  
  scoreBoard.html("score="+score);
  scoreBoard.position(width/2,50);

  heartBoard.html("life=");
  heartBoard.position(width/2+100,50);

  if(gameState===PLAY){
  enemies();
  
if(bulletGroup.isTouching(zombieGroup)){
  zombieGroup.destroyEach();
  bulletGroup.destroyEach();
}

if(player.collide(zombieGroup)){
  heart.addImage(heart2Img);
}
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(keyDown("RIGHT_ARROW")){
  player.x+=10;
}
if(keyDown("LEFT_ARROW")){
  player.x-=10;
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  Bullet();
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
  }
   else if(gameState=== END){
  zombieGroup.setVelocityXEach(0);
  
  }
drawSprites();

}
function enemies(){
  if(frameCount%150===0){
  zombie=createSprite(windowWidth,player.y)
  zombie.addImage(zombieImg);
  zombie.scale=0.2;
  zombie.velocityX=-4;
  zombieGroup.add(zombie);
  }
}
function Bullet(){
  bullet=createSprite(player.x,player.y);
  bullet.addImage(bulletImg);
  bullet.scale=0.2;
  bullet.velocityX=4;
  bulletGroup.add(bullet);
}
