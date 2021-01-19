const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 525;

const CAR_X_POSITIONS = [20, 155, 290];
const ENEMY_CAR_NUMBER = 3;

const GAME_SPRITES = [
  "images/road.png",
  "images/car-0.png",
  "images/car-1.png",
];

class GameScreen {
  constructor(canvasId, width, height) {
    this.canvas = document.getElementById(canvasId);

    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
    this.spriteImages = [];
    this.gameSpeed = 2;
    this.playerXIndex = 1;
    this.enemyCarList = [];
    this.ySeperation = 400;
    this.playerPoint = 0;
    this.loadSprite();
  }

  init = () => {
    this.road = new Road(
      this.spriteImages[0],
      SCREEN_WIDTH,
      SCREEN_HEIGHT,
      this.gameSpeed
    );

    this.player = new Car(CAR_X_POSITIONS[this.playerXIndex], 370, 90, 120, 0);

    this.createEnemyCar();

    this.update();
  };

  update = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas
    this.road.update(this.ctx);

    this.updateEnemyCar();
    this.enemyCarList.forEach((enemyCar) => {
      enemyCar.update(this.ctx);
    });
    this.player.update(this.ctx);
    this.player.checkCollision(this.enemyCarList);
    window.requestAnimationFrame(this.update);
  };

  loadSprite() {
    let imageCount = 0;
    GAME_SPRITES.forEach((src) => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        imageCount += 1;
        if (imageCount === GAME_SPRITES.length) {
          this.init();
        }
      };
      this.spriteImages.push(image);
    });
  }

  createEnemyCar() {
    for (let i = 0; i < ENEMY_CAR_NUMBER; i++) {
      let enemyCar = new Car(
        CAR_X_POSITIONS[getRandomBetween(0, 2)],
        -(i + 1) * this.ySeperation,
        90,
        120,
        1
      );
      this.enemyCarList.push(enemyCar);
    }
  }

  updateEnemyCar() {
    this.enemyCarList.forEach((enemy) => {
      if (enemy.y > 450 && !enemy.isPointCounted) {
        console.log("point updat->", this.playerPoint++);
        enemy.isPointCounted = true;
      }

      if (enemy.y > 700) {
        enemy.moveX(CAR_X_POSITIONS[getRandomBetween(0, 3)]);
        enemy.moveY(enemy.y - ENEMY_CAR_NUMBER * this.ySeperation);
        enemy.updateSpeed(getRandomBetween(1, 2));
        enemy.isPointCounted = false;
      }
    });
  }

  moveLeft() {
    if (this.playerXIndex > 0) {
      this.playerXIndex--;
      this.player.moveX(CAR_X_POSITIONS[this.playerXIndex]);
    }
  }

  moveRight() {
    if (this.playerXIndex < CAR_X_POSITIONS.length - 1) {
      this.playerXIndex++;
      this.player.moveX(CAR_X_POSITIONS[this.playerXIndex]);
    }
  }
}

class Car {
  constructor(
    x = SCREEN_WIDTH / 2,
    y = SCREEN_HEIGHT / 2,
    width = 100,
    height = 100,
    speed = 1,
    carImg
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.image = carImg;
    this.isPointCounted = false;
  }

  init(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }

  update(ctx) {
    this.draw(ctx);
    this.move();
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
    ctx.closePath();
  }

  move() {
    this.y += this.speed;
  }

  moveX(x) {
    this.x = x;
  }
  moveY(y) {
    this.y = y;
  }

  updateSpeed(s) {
    this.speed = s;
  }

  checkCollision(enemyCarList) {
    enemyCarList.forEach((enemy) => {
      var rect1 = {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
      };

      var rect2 = {
        x: enemy.x,
        y: enemy.y,
        width: enemy.width,
        height: enemy.height,
      };

      if (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      ) {
        console.log("collided");
      }
    });
  }
}

window.addEventListener("load", () => {
  let game = new GameScreen("game-board", SCREEN_WIDTH, SCREEN_HEIGHT);

  document.addEventListener(
    "keydown",
    function (event) {
      if (event.key == "a") {
        game.moveLeft();
      }

      if (event.key == "d") {
        game.moveRight();
      }
    },
    false
  );
});
