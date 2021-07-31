var mario;
var platformGroup, obstacleGroup;
var marioAnimation, obstacleAnimation, wallAnimation, groundAnimation;
var flag;
var LOSE=0;
var PLAY=1;
var WIN=2;
var man1;
var man2;
var score = 0;
var coin;
var coinIMG;
var coinGroup;
var sd;
var palace;
var palaceIMG;
var bak, bakIMG;
var ob2, ob2IMG, ob2Group;
var gameState=PLAY;
function preload()
{
  marioAnimation=loadAnimation("tappu.png");
  t = loadAnimation("tappu1.png");
  obstacleAnimation=loadAnimation("obstacle1.png","obstacle2.png");
  wallAnimation=loadAnimation("platform1.png");
  ob2IMG = loadImage("o.png");
  ob3IMG = loadImage("mouse.png");
  groundAnimation=loadAnimation("grp.png");  
  flagAnimation=loadAnimation("flg.png");
  blastIMG = loadImage("blast.png");
  bakIMG = loadImage("back.jpg");
  palaceIMG = loadImage("palace.png");
  coin1IMG = loadImage("coin1.png");
  coin2IMG = loadImage("coin2.png");

}

function setup() {
  //Creating canvas equal to width and height of display
  createCanvas(displayWidth,668);
  var countDistanceX = 0;
  var platform;
  var gap;

  
  
  //creating a player mario
  mario = new Player();

  blast = createSprite(mario.spt.x,mario.spt.y,20,20);
  blast.addImage(blastIMG);
  blast.scale = 0.2;
  blast.velocityX = mario.spt.x;
  blast.visible = false;

  man1 = createSprite(100,20,20,20);
  man1.shapeColor = "black"
  man1.velocityX = 10;
  man1.visible = false;

  man2 = createSprite(105,20,20,20);
  man2.shapeColor = "black"
  man2.visible = false;

  

  //creating a group
  platformGroup= createGroup();
  obstacleGroup=createGroup();
  ob2Group=createGroup();
  coinGroup=createGroup();
  //adding platforms to stand for mario
  for (var i=0;i<26;i++)
	 {
     frameRate(30);
      platform = new Platform(countDistanceX);
      platformGroup.add(platform.spt);//Adding each new platform to platformGroup
      gap=random([0,0,0,0,200]);//givin randome value to gap
      countDistanceX = countDistanceX + platform.spt.width + gap; //counting x location of next platform to be build
      //adding wall to the game
      if(i%1===0)
      {
      wall=new Wall(countDistanceX);
      platformGroup.add(wall.spt);
      }
      //adding obstacles to the game
      if(i%1==0)
      {
      obstacle= new Obstacle(countDistanceX);
      obstacleGroup.add(obstacle.spt);
      }
  }
  flag=createSprite(countDistanceX-410,height-220);
  flag.addAnimation("flagimg",flagAnimation);
  flag.scale=0.4;
  flag.setCollider("rectangle",0,0,120,100);

  palace = createSprite(countDistanceX-10,400,30,30);
  palace.addImage(palaceIMG);
  palace.scale = 1;
}

function draw() {
  background('skyblue');
  //code to move the camera
  translate(  -mario.spt.x + width/2 , 0);
  if(gameState==PLAY)//Play state
  {  
       //changing the game states
       if(obstacleGroup.isTouching(mario.spt) || mario.spt.y>height)
       {  
         gameState=LOSE;
         mario.spt.shapeColor = "red";
       } 
    
       if(flag.isTouching(mario.spt))
       {
          gameState=WIN;
          mario.spt.shapeColor = "green";

       }


       if(mario.spt.isTouching(coinGroup)){
        coin.remove();
        score=10;
          }

       if(man1.isTouching(man2)){
        man1.velocityX = 0;
        textSize(30);
        fill("white");
        text("Time : 300", 1000,40);
        text("Score :"+score ,100,40);
        text("Coin x 00", 600,40);
      }

       



       //apply gravity to mario and set colliding with platforms
        mario.applyGravity();
        mario.spt.collide(platformGroup);
        
        //Calling various function to controll mario
        if (keyWentDown(LEFT_ARROW))  
        { 
          mario.spt.velocityX = -8;
        }

        if (keyWentUp(LEFT_ARROW))  
        { 
          mario.spt.velocityX = 0;
    
        }


        if (keyWentDown(RIGHT_ARROW)) 
        { 
          mario.spt.velocityX = 20;

        }


        if (keyWentUp(RIGHT_ARROW)) 
        { 
          mario.spt.velocityX = 0;
        }


        

         spawnOb2();
         spawnCoin();



	 
        mario.spt.velocityY = mario.spt.velocityY + 0.4;

        if (keyDown("space") && mario.spt.y >= 450) 
        {
          mario.spt.velocityY = -30;
        }


   }

  if(gameState==LOSE)//END State
  {  
    stroke("red");
    fill("red");
    textSize(40);
    text("GAME OVER",mario.spt.x,200);
    obstacleGroup.velocityX = 0;
    mario.spt.setVelocity(0,0);
    mario.spt.pause();
    blast.visible = true;
  }

  if(gameState==WIN)//WIN state
  {  
    stroke("green");
    fill("orange");
    textSize(40);
    text("Winner",mario.spt.x-180,150);
    text("Go to palace!",mario.spt.x-150,200);
    obstacleGroup.destroyEach();
  }


  if(ob2Group.isTouching(mario.spt)){
    gameState=LOSE;
    mario.spt.shapeColor = "red";
   }


  drawSprites();
} 



function spawnOb2(){
  if (frameCount % 120 == 0){
    var ob2 = createSprite(600,514,50,50);
    ob2.velocityX = -5;
    
     //generate random obstacles
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: ob2.addImage(ob2IMG);
               break;
       case 2: ob2.addImage(ob3IMG);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     ob2.scale = 0.2;
     ob2.lifetime = 500;
    
    //add each obstacle to the group
     ob2Group.add(ob2);
  }
 }
 

 function spawnCoin(){
  if (frameCount % 120 == 0){
    var coin = createSprite(200,random(50,450),10,10);
    
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: coin.addImage(coin1IMG);
               break;
       case 2: coin.addImage(coin2IMG);
               break;
       default: break;
     }
         
     coin.scale = 0.2;
     coin.lifetime = 500;
    
     coinGroup.add(coin);
  }
 }



  

 