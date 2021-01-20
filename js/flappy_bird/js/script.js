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

    this.pipe = new Pipes(0, 0, this.gameSpeed, [
      this.spriteImages[5],
      this.spriteImages[6],
    ]);
    this.update();
  };

  update = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas
    this.backgroundList.forEach((bg) => {
      bg.update(this.ctx);
    });

    this.bird.checkCollision([this.pipe]);
    this.bird.update(this.ctx);
    this.pipe.update(this.ctx);

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

class Pipes {
  constructor(
    x = SCREEN_WIDTH / 2,
    y = SCREEN_HEIGHT / 2,
    speed = 1,
    pipeImages
  ) {
    this.x = x;
    // should be between -50 and -200
    this.y = -50;
    this.width = 65;
    this.height = 266;
    this.speed = speed;
    this.imagesList = pipeImages;
    this.verticalSpace = 400;

    this.pipeTop = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      image: this.imagesList[1],
    };

    this.pipeBottom = {
      x: this.x,
      y: this.y + this.verticalSpace,
      width: this.width,
      height: this.height,
      image: this.imagesList[0],
    };
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
    ctx.rect(this.pipeTop.x, this.pipeTop.y, this.width, this.height);
    ctx.rect(this.pipeBottom.x, this.pipeBottom.y, this.width, this.height);
    // ctx.rect(this.x, this.y, this.width, this.height);
    // collider rectangle
    ctx.stroke();
    ctx.drawImage(
      this.pipeTop.image,
      this.pipeTop.x - 3,
      this.pipeTop.y - 3,
      70,
      270
    );

    ctx.drawImage(
      this.pipeBottom.image,
      this.pipeBottom.x - 3,
      this.pipeBottom.y - 3,
      70,
      270
    );
    ctx.closePath();
  }

  move() {
    this.x -= this.speed;
    this.pipeTop.x = this.x;
    this.pipeBottom.x = this.x;
  }

  moveX(x) {
    this.x = x;
  }
  moveY(y) {
    this.y = y;
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
