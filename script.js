//global variable declaration
var canvas = document.querySelector(".myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = ((canvas.width - paddleWidth)/2);
var rightPressed = false;
var leftPressed = false;
var score = 0;
var lives = 3;
var resetValue = 0;

//brick setup
var brickRowCount = 3;
var brickColoumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffSetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];

for (var c=0; c < brickColoumnCount; c++) {
    bricks[c] = [];
    for (var r=0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 , status: 1};
    }
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function levelTwo() {
  x = canvas.width/2;
  y = canvas.height - 30;
  dx = 2;
  dy = -2;
  ballRadius = 10;
  paddleHeight = 10;
  paddleWidth = 75;
  paddleX = ((canvas.width - paddleWidth)/2);
  rightPressed = false;
  leftPressed = false;
  resetValue = 0;

   brickRowCount = 3;
   brickColoumnCount = 5;
   brickWidth = 75;
   brickHeight = 20;
   brickPadding = 10;
   brickOffSetTop = 30;
   brickOffsetLeft = 30;
   bricks = [];

  for (var c=0; c < brickColoumnCount; c++) {
      bricks[c] = [];
      for (var r=0; r < brickRowCount; r++) {
          bricks[c][r] = { x: 0, y: 0 , status: 1};
      }
  }
}

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function collisionDetect() {
  for (var c = 0; c < brickColoumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          resetValue ++;
          if(resetValue == brickRowCount * brickColoumnCount) {
            levelTwo();
            alert("YOU WIN, CONGRATS!")
            // document.location.reload();
            // clearInterval(interval);
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives () {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 100, 20);
}


function drawBricks() {
  for(var c = 0; c < brickColoumnCount; c++) {
    for(var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = (c * (brickWidth+brickPadding)) + brickOffsetLeft;
        var brickY = (r * (brickHeight+brickPadding)) + brickOffSetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}




//draw the paddle at start
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "0095DD";
  ctx.fill();
  ctx.closePath;
}

//draw the ball at start
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

//update game
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetect();


  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
  dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x <  paddleX + paddleWidth) {
      dy = -dy;
    } else {
      if (lives > 0) {
        lives = lives - 1;
        x = canvas.width/2;
        y = canvas.height - 30;
        dy = -dy;
        paddleX = ((canvas.width - paddleWidth)/2);
        alert("lives left: " + lives);
      } else {
    alert("GAME OVER");
    document.location.reload();
    clearInterval(interval); //to end game in Chrome
  }
  }
  }

  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth
    }
  } else if (leftPressed) {
    paddleX -= 7
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
  x += dx;
  y += dy;

}



var interval = setInterval(draw, 10);
