const MAX_BALL_RADIUS = 20;
const TOTAL_BALLS = 20;

const MAX_SPEED = 2;
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 500;
const COLORS = [
  "#DFFF00",
  "#FFBF00",
  "#FF7F50",
  "#DE3163",
  "#9FE2BF",
  "#40E0D0",
  "#6495ED",
  "#CCCCFF",
];

class Board {
  constructor(canvasId, width, height) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.ballsList = [];
    this.canvas.width = width;
    this.canvas.height = height;
    this.init();
    this.addClickListener();
  }

  init = () => {
    this.ant = new Image();
    this.ant.src = "../images/ant-walking.gif";
    this.createBall(TOTAL_BALLS);
    this.ant.onload = this.update;
    // window.requestAnimationFrame(this.update);
  };

  update = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas
    this.ballsList.forEach((ball) => {
      ball.update(this.ctx);
      ball.checkOtherBallCollision(this.ballsList);
    });
    window.requestAnimationFrame(this.update);
  };

  createBall(n) {
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
      let color = COLORS[getRandomBetween(0, COLORS.length)];

      let radius = MAX_BALL_RADIUS;

      if (randDx == 0) {
        randDx = 1;
      }
      if (randDy == 0) {
        randDy = 1;
      }

      let ball = new Ball(
        randX,
        randY,
        color,
        radius,
        randDx,
        randDy,
        this.ant
      );
      this.ballsList.push(ball);
    }
  }
  addClickListener() {
    this.canvas.addEventListener(
      "mouseup",
      (e) => {
        let mousePos = {
          x: e.offsetX,
          y: e.offsetY,
        };

        this.ballsList.forEach((ball, index) => {
          let circle = {
            x: ball.x,
            y: ball.y,
            radius: ball.r,
          };
          if (isIntersect(mousePos, circle)) {
            this.ballsList.splice(index, 1);
          }
        });
      },
      false
    );
  }
}

////////////////// Ball ///////////////////////
class Ball {
  constructor(
    x = CANVAS_WIDTH / 2,
    y = CANVAS_HEIGHT / 2,
    color = "#0095DD",
    r = 20,
    dx = 1,
    dy = 1,
    antImg
  ) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.ant = antImg;
  }

  init(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);

    ctx.stroke();
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

    ctx.drawImage(this.ant, this.x - 25, this.y - 15, 60, 30);

    ctx.closePath();
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  checkContextCollision(ctx) {
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

  checkOtherBallCollision(balls) {
    balls.forEach((ball) => {
      if (ball == this) {
        return;
      }

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

      let distance = distanceBetween(
        { x: ballAX, y: ballAY },
        { x: ballBX, y: ballBY }
      );

      if (distance < ballARad + ballBRad) {
        if (ballAX < ballBX) {
          this.x = ballAX - 1;
        } else {
          this.x = ballAX + 1;
        }

        if (ballAY < ballBY) {
          this.y = ballAY - 1;
        } else {
          this.y = ballAY + 1;
        }

        this.dx = ballBDx;
        this.dy = ballBDy;
        ball.dx = ballADx;
        ball.dy = ballADy;
      }
    });
  }
}

window.addEventListener("load", () => {
  let b = new Board("board", CANVAS_WIDTH, CANVAS_HEIGHT);
});
