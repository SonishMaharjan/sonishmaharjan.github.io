const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 575;
const NUM_OF_BACKGROUNDS = 3;

const GAME_SPRITES = [
  "images/background.png",
  "images/ground.png",
  "images/bird-1.png",
  "images/bird-2.png",
  "images/bird-3.png",
  "images/pipe-down.png",
  "images/pipe-top.png",
];

class GameScreen {
  constructor(canvasId, width, height, scoreObject, gameOverObject) {
    this.canvas = document.getElementById(canvasId);
    this.scoreObject = scoreObject;

    this.gameOverObject = gameOverObject;

    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
    this.spriteImages = [];
    this.animationFrameId = null;
    this.backgroundList = [];
    this.foregroundList = [];
    this.gameSpeed = 1;
    this.bird = null;

    this.loadSprite();
  }

  init = () => {
    this.createBackgrounds();
    this.bird = new Bird(50, 100, 30, 30, 0, [
      this.spriteImages[2],
      this.spriteImages[3],
      this.spriteImages[4],
    ]);
    this.update();
  };

  update = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas
    this.backgroundList.forEach((bg) => {
      bg.update(this.ctx);
    });

    this.bird.update(this.ctx);

    this.foregroundList.forEach((fg) => {
      fg.update(this.ctx);
    });
    this.animationFrameId = window.requestAnimationFrame(this.update);
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

  gameOver() {}

  destroy() {
    cancelAnimationFrame(this.animationFrameId);
    this.spriteImages = [];
  }

  createBackgrounds() {
    for (var i = 0; i < NUM_OF_BACKGROUNDS; i++) {
      let background = new MovingImage(
        i * (this.canvas.width - 4),
        0,
        this.canvas.width,
        this.canvas.height,
        0.2,
        this.spriteImages[0]
      );

      this.backgroundList.push(background);

      let foreground = new MovingImage(
        i * (this.canvas.width - 4),
        450,
        this.canvas.width,
        150,
        this.gameSpeed,
        this.spriteImages[1]
      );
      this.foregroundList.push(foreground);
    }
  }
}

class Bird {
  constructor(
    x = SCREEN_WIDTH / 2,
    y = SCREEN_HEIGHT / 2,
    width = 100,
    height = 100,
    speed = 1,
    imageList
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedY = 0;
    this.imageList = imageList;
    this.isAlive = true;
    this.imageCounter = 0;
    this.image = imageList[this.imageCounter];

    this.accln = 100;
    this.timeStep = 0.04;

    this.animationSpeed = 100;

    this.birdAnimation = setInterval(() => {
      this.imageCounter = (this.imageCounter + 1) % this.imageList.length;
      this.image = this.imageList[this.imageCounter];
    }, this.animationSpeed);
  }

  init(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }

  update(ctx) {
    this.move();
    if (this.y < 0 || this.y + this.height > 450) {
      this.dead();

      //keeps bird above ground
      if (this.y + this.height > 450) {
        this.y = 453 - this.height;
      }
    }
    this.draw(ctx);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    // collider rectangle
    ctx.stroke();
    ctx.drawImage(this.image, this.x - 2, this.y - 5, 35, 38);
    ctx.closePath();
  }

  jump() {
    if (this.isAlive) {
      this.speedY = -125;
    }
  }
  move() {
    this.speedY = this.speedY + this.accln * this.timeStep;
    this.y = this.y + this.speedY * this.timeStep;
  }
  dead() {
    clearInterval(this.birdAnimation);
    this.isAlive = false;
    this.accln = 0;
    this.speedY = 0;
  }

  checkCollision(obstacleList) {
    obstacleList.forEach((enemy) => {
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
        this.isCollided = true;
      }
    });
  }
}

function startGame(scoreObject, gameOverObject) {
  let game = new GameScreen(
    "game-canvas",
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    scoreObject,
    gameOverObject
  );

  return game;
}

window.addEventListener("load", () => {
  let game = startGame();

  let gameCanvas = document.getElementById("game-canvas");
  gameCanvas.addEventListener("click", () => {
    game.bird.jump();
    // console.log(game.bird.jump());
  });
});
