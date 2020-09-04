 var  ball,img,paddle;
 var gamestate = "serve"
 var score = 0;

function preload() {
  ballimg = loadImage('ball.png');
  paddleimg=loadImage("paddle.png");
  resetimg = loadImage('reset_button_final.png');
  larrowimg = loadImage("leftArrow.png");
  rarrowimg = loadImage("rightArrow.png");
  gamebac  = loadImage("Game.jpg");
}
function setup() {
  createCanvas(350,500);
  ball=createSprite(160,250,20,20);
ball.addImage (ballimg); 
ball.velocityY = 10; 
ball.visible = false ;
paddle=createSprite(160,400,20,100);
paddle.addImage(paddleimg);
paddle.scale = 2;
paddle.visible = false ;
reset = createSprite(160,300,10,10);
reset.addImage(resetimg);
reset.scale = 0.2;
reset.visible = false;
larrow = createSprite(100,480,10,10);
larrow.addImage(larrowimg);
larrow.visible = false;
rarrow = createSprite(220,480,10,10);
rarrow.addImage(rarrowimg);
rarrow.visible = false;

}

function draw() {

  background(gamebac);

  if(gamestate === "serve"){
    //createCanvas(400,400);
    ball.velocityX = 0;
    ball.velocityY = 0;
    ball.visible = true;
    paddle.visible = true;       
    textSize(20);
    fill(0);
    text("Press Space to Start",75,200);
    text("Can you score more than 100",30,100);
    reset.visible = false;
    ball.x = 160;
    ball.y = 250;
    paddle.x = 160;
    paddle.y = 400;
    score = 0;
    text("Score : "+score,30,50);
    if(keyDown("space")){
      gamestate = "play"; 
      ball.velocityY = 5;  
    }
  }
  if(gamestate === "play"){
    background(gamebac);
    larrow.visible = true;
    rarrow.visible = true;
    //createCanvas(400,400);
    edges=createEdgeSprites();
    //Bounce Off the Left Edge only
    ball.bounceOff(edges[0]); 
    
    ball.bounceOff(edges[1]);
    ball.bounceOff(edges[2]);
    ball.bounceOff(paddle,explosion);
    textSize(20);
    fill(0);
    text("Score : "+score,30,50);
    paddle.collide(edges);
    
    if(keyDown(LEFT_ARROW)||mousePressedOver(larrow))
    {
      paddle.x=paddle.x-20;
    }
    
    if(keyDown(RIGHT_ARROW)|| mousePressedOver(rarrow))
    {
      paddle.x=paddle.x+20;
    }
    if(ball.y>500){
      gamestate = "over";
    }
    if(frameCount%60 === 0){
      ball.velocityY = ball.velocityY+10;
    }
    if(ball.isTouching(paddle)){
      score = score+1;
    }
  }
  
  if(gamestate === "over"){
    background(gamebac);
    textSize(20);
    fill(0);
    text("Score : "+score,30,50);
    //createCanvas(400,400);
    textSize(20);
    fill(0);
    text("Game Over !",100,200);
    if(score<100){
      text("OOPs Better Luck Next Time",50,100);
    }
    if(score>=100){
      text("Good Now try to break your score",10,100);
    }
    reset.visible = true;
    larrow.visible = false;
    rarrow.visible = false;
    if(mousePressedOver(reset)){
      gamestate = "serve";
    }
  }
  
  drawSprites();
  
}

function explosion()
{
  ball.velocityX=random(-8,8);
}

