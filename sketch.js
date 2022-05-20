//Carregar módulos da Biblioteca Matter.js
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//Variáveis
var engine, world;
var imgBackground, imgTower;
var ground, tower, cannon, ball;

//Matriz
var balls = [];
var boats = [];

//Animação do barco
var boatAnimation = [];
var boatSpritedata, boatSpriteSheet;
var brokenBoatAnimation = [];
var brokenBoatSpritedata, brokenBoatSpritesheet;

function preload() {

  //Carregar imagens
  imgBackground = loadImage("assets/background.gif");
  imgTower = loadImage("assets/tower.png");

  //Carregar animação do barco
  boatSpritedata = loadJSON("assets/boat/boat.json");
  boatSpriteSheet = loadImage("assets/boat/boat.png");
  brokenBoatSpritedata = loadJSON("assets/boat/brokenBoat.json");
  brokenBoatSpritesheet = loadImage("assets/boat/brokenBoat.png");

}

function setup() {
  canvas = createCanvas(1200, 600);
  angleMode(DEGREES);

  //Motor de física
  engine = Engine.create();
  world = engine.world;
  
  //Criar Ground
  var ground_options = {
    isStatic: true
  }
  ground = Bodies.rectangle(width/2,height-1, width,1, ground_options);
  World.add(world,ground);

  //Criar tower
  var tower_options = {
    isStatic: true
  }
  tower = Bodies.rectangle(160,350,160,310,tower_options);
  World.add(world,tower);

  //Criar objetos a partir de classe
  cannon = new Cannon(180,110,130,100,15);
  ball = new CannonBall(cannon.x,cannon.y,20);

  //Percorrer os frames das imagens
  var boatFrames = boatSpritedata.frames;
  for(var i = 0; i<boatFrames.length; i++){

    var pos = boatFrames[i].position;
    var img = boatSpriteSheet.get(pos.x,pos.y, pos.w,pos.h);
    boatAnimation.push(img);

  }

  var brokenBoatFrames = brokenBoatSpritedata.frames;
  for (var i = 0; i < brokenBoatFrames.length; i++) {
      var pos = brokenBoatFrames[i].position;
      var img = brokenBoatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
      brokenBoatAnimation.push(img);
  }
 
}

function draw() {
  background(189);
  image(imgBackground,width/2,height/2,1200,600);

  //Atualizar Motor de física
  Engine.update(engine);

  //Definir posição X e Y do objeto pelo centro
  rectMode(CENTER);
  imageMode(CENTER);

  //Exibir ground
  rect(ground.position.x,ground.position.y,width,1);

  //Exibir torre
  image(imgTower,tower.position.x, tower.position.y,160,310);

  //Exibir navios na tela
  showBoats();

  //Loop para percorrer a matriz ball e exibir qualquer bola criada na tela
  for(var i=0; i< balls.length;i++){
    showCannonBalls(balls[i],i);

    //Identificar colisão da bola de canhão com o navio
    collisionWithBoat(i);
  }

  //Exibir canhão
  cannon.display();

   
}
function keyReleased(){
  if (keyCode === DOWN_ARROW){
    balls[balls.length -1].shoot();
  }
}
//Verifica se uma tecla do teclado foi pressionada
function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var ball = new CannonBall(cannon.x,cannon.y,20);
    balls.push(ball);
  }
}
//Função para exibir as bolas de canhão
function showCannonBalls(ball,i){
  if(ball){
    ball.display();

    //Verificar se a bala de canhão ultrapassou a area de jogo o não atingiu o navio
    if(ball.body.position.x >= width || ball.body.position.y >= height - 50){
      ball.remove(i)
    }
  }
}
//Função para exibir os navios
function showBoats(){
  if(boats.length > 0){

    if(boats[boats.length -1] === undefined ||
      boats[boats.length -1].body.position.x < width -300){

      var positions = [-40,-60,-70,-20];
      var position = random(positions);

      var boat = new Boat(width,height-100,170,170,position,boatAnimation);
      boats.push(boat);
    }

    for(var i = 0; i < boats.length; i++){
      if(boats[i]){
        Matter.Body.setVelocity(boats[i].body,{x:-0.9, y: 0 });
        boats[i].display();
        boats[i].animate();

        //Identificar colisão entre a torre e o navio
        var collision = Matter.SAT.collides(tower, boats[i].body);

        if(collision.collided && !boats[i].isBroken){
          gameOver();
        }
      }      
    }
  }else{
    //Criar navio
    var boat = new Boat(width-79,height-60,170,170,-80,boatAnimation);
    boats.push(boat);
  }
}
//Função para detectar colisão entre navios e balas de canhão
function collisionWithBoat(index){
  for(var i = 0; i < boats.length; i++){
    if(balls[index] !== undefined && boats[i] !== undefined){
      
      //Algoritmo de identificação de colisão
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body);

      //Remover objetos se a colisão for identificada
      if(collision.collided){
        boats[i].remove(i);
    
        balls[index].remove(index);
      }
      
    }
  }
}
function gameOver(){
  swal(
    {
        title: `Fim de Jogo!!!`,
        text: "Obrigada por jogar!!",
        imageUrl:"https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
        imageSize: "150x150",
        confirmButtonText: "Jogar Novamente"
    },
    function(isConfirm) {
        if (isConfirm){
            location.reload();
        }
    }
  );
}