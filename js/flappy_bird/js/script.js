const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 575;
const NUM_OF_BACKGROUNDS = 3;
const NUM_OF_PIPES = 4;

const INITIAL_PIPE_POSITION = 500;
const HORIZONTAL_PIPE_DISTANCE = 250;

const PIPE_MAX_TOP = -200;
const PIPE_MAX_BOTTOM = -30;

const BIRD_X_POS = 100;

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
    this.gameSpeed = 2;
    this.bird = null;
    this.pipesList = [];
    this.playerScore = 0;
    this.isFirstClick = false;
    this.isGameOver = false;
    this.highScore = localStorage.getItem("flappyHighScore");

    this.loadSprite();
  }

  init = () => {
    this.createBackgrounds();
    this.bird = new Bird(BIRD_X_POS, 200, 27, 27, 0, [
      this.spriteImages[2],
      this.spriteImages[3],
      this.spriteImages[4],
    ]);

    this.createPipes();

    //initial render
    this.backgroundList.forEach((bg) => {
      bg.update(this.ctx);
    });

    this.bird.update(this.ctx);

    this.foregroundList.forEach((fg) => {
      fg.update(this.ctx);
    });

    this.update();
  };

  update = () => {
    if (this.isFirstClick && this.bird.isAlive) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas
      this.backgroundList.forEach((bg) => {
        bg.update(this.ctx);
      });

      this.bird.checkCollision(this.pipesList);
      this.bird.update(this.ctx);

      this.updatePipes();

      this.pipesList.forEach((pipe) => {
        pipe.update(this.ctx);
      });

      this.foregroundList.forEach((fg) => {
        fg.update(this.ctx);
      });
    }
    if (this.isFirstClick && !this.bird.isAlive && !this.isGameOver) {
      this.isGameOver = true;
      this.gameOver();
    }
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

  gameOver() {
    if (this.playerScore > this.highScore) {
      localStorage.setItem("flappyHighScore", this.playerScore);
    }
    let playerScore = this.gameOverObject.querySelector("#player-score");
    let currentHighScore = this.gameOverObject.querySelector("#highscore");
    playerScore.innerHTML = this.playerScore;
    currentHighScore.innerHTML = localStorage.getItem("flappyHighScore");
    this.gameOverObject.style.display = "block";
  }

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

  createPipes() {
    for (let i = 0; i < NUM_OF_PIPES; i++) {
      let pipe = new Pipes(
        INITIAL_PIPE_POSITION + i * HORIZONTAL_PIPE_DISTANCE,
        getRandomBetween(PIPE_MAX_TOP, PIPE_MAX_BOTTOM),
        this.gameSpeed,
        [this.spriteImages[5], this.spriteImages[6]]
      );

      this.pipesList.push(pipe);
    }
  }

  updatePipes() {
    this.pipesList.forEach((pipe) => {
      if (pipe.x < -200) {
        pipe.isCounted = false;
        pipe.x = pipe.x + HORIZONTAL_PIPE_DISTANCE * NUM_OF_PIPES;
        pipe.moveY(getRandomBetween(PIPE_MAX_TOP, PIPE_MAX_BOTTOM));
      }

      if (pipe.x < BIRD_X_POS && !pipe.isCounted) {
        pipe.isCounted = true;
        this.playerScore += 1;
        this.scoreObject.innerHTML = this.playerScore;
      }
    });
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
    this.y = y;
    this.width = 65;
    this.height = 266;
    this.speed = speed;
    this.imagesList = pipeImages;
    this.verticalSpace = 400;
    this.isCounted = false;

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

    // ctx.stroke();
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
    this.pipeTop.y = this.y;
    this.pipeBottom.y = this.y + this.verticalSpace;
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
  let gameCanvas = document.getElementById("game-canvas");
  let scoreBoard = document.getElementById("score-board");
  let playButton = document.getElementById("play-button");
  let replayBtn = document.getElementById("play-again");
  let gameStarter = document.getElementById("game-start");
  let gameOver = document.getElementById("game-over");

  let isPlayable = false;

  let game = startGame(scoreBoard, gameOver);

  gameStarter.querySelector("#highscore").innerHTML = localStorage.getItem(
    "flappyHighScore"
  );
  playButton.addEventListener("click", () => {
    isPlayable = true;
    gameStarter.style.display = "none";
  });

  if (!localStorage.getItem("flappyHighScore")) {
    localStorage.setItem("flappyHighScore", 0);
  }

  gameCanvas.addEventListener("click", (e) => {
    if (!game.isFirstClick && isPlayable) {
      game.isFirstClick = true;
      scoreBoard.innerHTML = game.playerScore;
      scoreBoard.style.top = "50px";
    }
    game.bird.jump();
  });

  replayBtn.addEventListener("click", () => {
    game.destroy();
    game = startGame(scoreBoard, gameOver);
    scoreBoard.innerHTML = "TAP";
    scoreBoard.style.top = "100px";
    gameOver.style.display = "none";
  });
});
