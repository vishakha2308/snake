const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//create the unit
const box = 32;

//load images


const ground = new Image();
ground.src = "img/ground.png";

const foodImg1 = new Image();
foodImg1.src = "img/food.png";
const foodImg2 = new Image();
foodImg2.src = "img/food1.png";
const foodImg3 = new Image();
foodImg3.src = "img/food2.png";
const foodImg4 = new Image();
foodImg4.src = "img/food3.png";
const foodImg5 = new Image();
foodImg5.src = "img/food4.png";
const foodImg6 = new Image();
foodImg6.src = "img/food5.png";
const foodImg7 = new Image();
foodImg7.src = "img/food6.png";
const foodImg8 = new Image();
foodImg8.src = "img/food7.png";
const foodImg9 = new Image();
foodImg9.src = "img/food8.png";


 const foodImgs = [foodImg1,foodImg2,foodImg3,foodImg4,foodImg5,foodImg6,foodImg7,foodImg8,foodImg9];

//load audioFiles
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const down = new Audio();
const left = new Audio();
const right = new Audio();

dead.src = "audio/dead.mp3"
eat.src = "audio/eat.mp3"
left.src = "audio/left.mp3"
up.src = "audio/up.mp3"
right.src = "audio/right.mp3"
down.src = "audio/down.mp3"




//create the snake

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
  foodId: 0
};

//create the food

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
}

//create the score

let score = 0;

//control the snake
let d;

document.addEventListener("keydown", direction);

function direction(event) {
  if (event.keyCode == 37 && d != "RIGHT") {
    left.play();
    d = "LEFT";
  } else if (event.keyCode == 38 && d != "DOWN") {
    up.play();
    d = "UP";
  } else if (event.keyCode == 39 && d != "LEFT") {
    right.play();
    d = "RIGHT";
  } else if (event.keyCode == 40 && d != "UP") {
     down.play();
    d = "DOWN";
  }
}
//collision
function collision(head,array){
  for(let i =0;i< array.length; i++){
    if(head.x == array[i].x && head.y == array[i].y){
      return true;
    }
  }
  return false;
}

//draw everything to canvas
var f = 0;
function draw(){

  ctx.drawImage(ground,0,0);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i == 0) ? "red" : "green";
    ctx.fillRect(snake[i].x, snake[i].y,box,box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y,box,box);
    if(i > 0)
      ctx.drawImage(foodImgs[snake[i-1].foodId], snake[i].x, snake[i].y);

  }
  ctx.drawImage(foodImgs[f],food.x,food.y);
  console.log(food.x,food.y);
  //OLD head position

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  let snakefoodId = snake[0].foodId;

  //which direction
  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  if(snakeX < box) snakeX = 17 * box;
  else if(snakeX > 17 * box) snakeX = box;
  else if(snakeY < 3 * box) snakeY = 17 * box;
  else if(snakeY > 17 *box) snakeY = 3 * box;

  //if snake eat the food
  if(snakeX == food.x && snakeY == food.y){
    score++;
    eat.play();
    do{
        food ={
          x: Math.floor(Math.random()*17+1)* box,
          y: Math.floor(Math.random()* 15+3)* box
        }
    }while(collision(food,snake))
    snakefoodId = f;
    f = Math.floor(Math.random()* 9);
    console.log(f);
    //if snake didnt eat food
  }else{
    for (let i = 0; i < snake.length-1; i++) {
      snake[i].foodId = snake[i+1].foodId;
    }
      snake.pop();
    }

    //new head
    let newHead ={
      x: snakeX,
      y: snakeY,
      foodId: snakefoodId
    }


  //game over
  if(collision(newHead,snake)){
    clearInterval(game);
    dead.play();
  }


  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2 * box, 1.6 * box);


}

//call draw function every 100 ms

let game = setInterval(draw, 200);
