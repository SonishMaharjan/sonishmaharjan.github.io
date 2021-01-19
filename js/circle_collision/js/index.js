function getRandomBetween(min, max) {
  //   return Math.floor(Math.random() * max) + min;
  return Math.floor(Math.random() * (max - min) + min);
}

function distanceBetween(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

const MAX_BALL_RADIUS = 10;
const TOTAL_BALLS = 25;

const MAX_SPEED = 5;
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

class Board {
  constructor(canvasId, width, height) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.ballsList = [];
    this.canvas.width = width;
    this.canvas.height = height;
    this.init();
  }

  init = () => {
    this.createBall();
    window.requestAnimationFrame(this.update);
  };

  update = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas
    this.ballsList.forEach((ball) => {
      ball.update(this.ctx);
      ball.checkOtherBallCollision(this.ballsList);
    });
    window.requestAnimationFrame(this.update);
  };

  createBall(n = TOTAL_BALLS) {
    for (let i = 0; i < n; i++) {
      let randX = getRandomBetween(
        MAX_BALL_RADIUS,
        this.canvas.width - MAX_BALL_RADIUS
      );
      let randY = getRandomBetween(
        MAX_BALL_RADIUS,
        this.canvas.height - MAX_BALL_RADIUS
      );

      let randDx = getRandomBetween(-MAX_SPEED, MAX_SPEED);
      let randDy = getRandomBetween(-MAX_SPEED, MAX_SPEED);

      if (randDx == 0) {
        randDx = 1;
      }
      if (randDy == 0) {
        randDy = 1;
      }

      let ball = new Ball(
        randX,
        randY,
        "blue",
        MAX_BALL_RADIUS,
        randDx,
        randDy
      );
      this.ballsList.push(ball);
    }
  }
}

class Ball {
  constructor(x = 0, y = 0, color = "#0095DD", r = 20, dx = 1, dy = 1) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  init(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(ctx) {
    this.draw(ctx);

    this.move();
    this.checkContextCollision(ctx);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  checkContextCollision(ctx) {
    // if (this.x + this.r > ctx.canvas.width || this.x - this.r < 0) {
    //   this.dx = -this.dx;
    // }
    // if (this.y + this.r > ctx.canvas.height || this.y - this.r < 0) {
    //   this.dy = -this.dy;
    // }

    if (this.x - this.r < 0) {
      this.x = this.r;
      this.dx = -this.dx;
    }

    if (this.x + this.r > ctx.canvas.width) {
      this.x = ctx.canvas.width - this.r;
      this.dx = -this.dx;
    }

    if (this.y - this.r < 0) {
      this.y = this.r;
      this.dy = -this.dy;
    }

    if (this.y + this.r > ctx.canvas.height) {
      this.y = ctx.canvas.height - this.r;
      this.dy = -this.dy;
    }
  }

  resolveContextCollision(ctx) {
    // if (this.x - this.r + 1 < 0) {
    //   this.x = this.r + 1;
    // }
    // if (this.y - this.r < 0) {
    //   this.y = this.r;
    // }
  }

  checkOtherBallCollision(balls) {
    balls.forEach((ball) => {
      if (ball == this) {
        // console.log("MILSY");
        return;
      }
      //   console.log("hah");

      let ballAX = this.x;
      let ballAY = this.y;
      let ballARad = this.r;
      let ballADx = this.dx;
      let ballADy = this.dy;

      let ballBX = ball.x;
      let ballBY = ball.y;
      let ballBRad = ball.r;
      let ballBDx = ball.dx;
      let ballBDy = ball.dy;

      //   console.log(Math.pow(ballAX - ballBX, 2));
      let distance = distanceBetween(
        { x: ballAX, y: ballAY },
        { x: ballBX, y: ballBY }
      );

      if (distance < ballARad + ballBRad) {
        // console.log("collison alert");

        // this.x =

        this.dx = ballBDx;
        this.dy = ballBDy;
        ball.dx = ballADx;
        ball.dy = ballADy;
      }
      //   console.log(distance);
    });
  }
}

window.addEventListener("load", () => {
  let b = new Board("board", CANVAS_WIDTH, CANVAS_HEIGHT);
});
