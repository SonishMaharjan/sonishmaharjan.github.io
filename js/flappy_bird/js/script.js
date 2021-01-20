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
    this.loadSprite();
    this.animationFrameId = null;
    this.backgroundList = [];
    this.foregroundList = [];
    this.gameSpeed = 1;
  }

  init = () => {
    this.createBackgrounds();
    this.update();
  };

  update = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas
    this.backgroundList.forEach((bg) => {
      bg.update(this.ctx);
    });
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
        0.1,
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
});
