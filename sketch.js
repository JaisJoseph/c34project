const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,football,ground;
var football_con;

var ball;
var bg_img;
var hoop;
var button;


function preload() 
{
  bg_img = loadImage('background.jpeg');
  ball = loadImage('football.png');
  hoop = loadImage('hoop.png');

}

function setup() {
  createCanvas(600,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('clickhere_button.png');
  button.position(275,30);
  button.size(50,50);
  button.mouseClicked(drop);

  hoop = createImg('hoop.png');
  hoop.position(300,550);
  hoop.size(100,100);

  rope = new Rope(7,{x:300,y:30});
  ground = new Ground(200,750,800,20);

  football = Bodies.circle(300,300,20);

  Matter.Composite.add(rope.body,football);

  football_con = new Link(rope,football);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);

}


function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,600,700);
  

  if(football!=null){
    image(ball,football.position.x,football.position.y,70,70);
  }

  rope.show();
  ground.show();
  Engine.update(engine);

  if(collide(football,hoop)==true)
  {
    fill("red");
    textSize(30);
    text('well done', 350,50);
  }
   
  if(football!=null && football.position.y>=690)
  {
    fill("red");
    textSize(30);
    text('Unlucky, try again',150, 50);
     //bk song stop
    //sad sound play
    football=null;
   }
  
   drawSprites();

}

function drop()
{
  
  rope.break();
  football_con.dettach();
  football_con = null; 
  
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,football);
               football = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

