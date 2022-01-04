const Engine = Matter.Engine;
const Render = Matter.Render;
// render: link between the rectangles
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
// composites = we can add multiple rect inside a single variable
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
let rope;
let connection,connection2,connection3;
let fruit;
let rabbit_Img,background_Img,Melon_Img,Button_img;
var rabbit;
let Blink_Animation,Sad_Animation,Eat_Animation;
let bg_sound,sad_sound,cut_sound,eating_sound,air_sound
let blower;
let rope2,rope3;
//var button;

function preload(){
  rabbit_Img = loadImage("Rabbit-01.png");
  background_Img = loadImage("background.png");
  Melon_Img = loadImage("melon.png");
  Blink_Animation = loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  Eat_Animation = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  Sad_Animation = loadAnimation("sad_1.png","sad_2.png","sad_3.png")
  Blink_Animation.playing = true;
  Blink_Animation.looping = true;
  Eat_Animation.looping = false;
  Sad_Animation.looping = false;
  bg_sound = loadSound("sound1.mp3")
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound("rope_cut.mp3");
  eating_sound = loadSound("eating_sound.mp3");
  air_sound = loadSound("air.wav");

  //Button_img = loadImage("cut_button.png");
}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }
 
  bg_sound.play()
  bg_sound.setVolume(0.5)
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  Blink_Animation.frameDelay = 20;
  Eat_Animation.frameDelay = 20;
  Sad_Animation.frameDelay = 20;

   ground = new Ground(200,700,600,20);
  

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

fruit = Bodies.circle(200,400,20);
World.add(world,fruit);

rope = new Rope(8,{x:245,y:30});
rope2 = new Rope(9,{x:450,y:90})
rope3 = new Rope(8,{x:80,y:180})



connection = new Link(rope,fruit);
connection2 = new Link(rope2,fruit);
connection3 = new Link(rope3,fruit)

rabbit = createSprite(350,600,10,10);
rabbit.addImage("eating",rabbit_Img);
rabbit.scale = 0.25
rabbit.addAnimation("blink",Blink_Animation);
rabbit.addAnimation("eat",Eat_Animation);
rabbit.addAnimation("sad",Sad_Animation);
rabbit.changeAnimation("blink",Blink_Animation)

var button = createImg("cut_button.png");
button.position(230,30);
button.size(30,30)
button.mouseClicked(drop);

var button2 = createImg("cut_button.png");
button2.position(430,90);
button2.size(30,30)
button2.mouseClicked(drop2);

var button3 = createImg("cut_button.png");
button3.position(80,180);
button3.size(30,30)
button3.mouseClicked(drop3);

blower = createImg("blower.png");
blower.position(10,280);
blower.size(150,100);
blower.mouseClicked(BLOWER);

var mute = createImg("mute.png");
mute.position(450,20);
mute.size(50,50)
mute.mouseClicked(MUTE);

//var distance = dist(fruit.position.x,fruit.position.y,rabbit.position.x,rabbit.position.y);
//console.log(distance);
// this is the formula to find the distance between 2 objects
// when 2 objects collide the distance become half .eg before collide = 100,afetr collide = 50



  
}

function draw() 
{
  background(51);
  image(background_Img,0,0,displayWidth+80,displayHeight);
   ground.display();
  
  Engine.update(engine);
  imageMode(CENTER)
  if(fruit!=null){
image(Melon_Img,fruit.position.x,fruit.position.y,50,50);
  }
   rope.show();
   rope2.show();
   rope3.show();

   if(collide(fruit,rabbit)==true){
     rabbit.changeAnimation("eat",Eat_Animation);
     eating_sound.play();
     bg_sound.stop();
   }
   // while comparing something with the functions 2 == will be used
   // while comparing with var or value 3=== will be used

   if(collide(fruit,ground.body)==true){
     rabbit.changeAnimation("sad",Sad_Animation);
     sad_sound.play()
     bg_sound.stop();
   }
   // when ever we mention something from the class we need to add an extension called var.body
  drawSprites();

 
   
}
function drop(){
  connection.detach()
  rope.break()
  connection = null;
  cut_sound.play()
}
function drop2(){
  connection2.detach()
  rope2.break()
  connection2 = null;
  cut_sound.play()
}

function drop3(){
  connection3.detach()
  rope3.break()
  connection3 = null;
  cut_sound.play()
}


function collide(body,sprite){
  if(body!=null){
    var distance = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(distance<=100){
      World.remove(world,fruit);
      fruit = null;
      console.log(distance)
      return true;
    }
    else{
      return false;
    }
  }

// return is used for template id it is true the action will be take in the draw if it is false nothing will happen
}

function BLOWER(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  air_sound.play()
  bg_sound.stop();
}
//{x:0.01,y:0})
  // to write an object with a body that should be a class
  //If it is not a class we can write that object name without body

  function MUTE(){
    if(bg_sound.isPlaying()){
      bg_sound.stop()
    }
    else{
      bg_sound.play();
    }
  }

