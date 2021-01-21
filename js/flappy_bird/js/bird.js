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
    ctx.drawImage(this.image, this.x - 8, this.y - 5, 40, 40);
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

  checkCollision(pipesList) {
    pipesList.forEach((enemy) => {
      var birdRect = {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
      };

      var rect1 = {
        x: enemy.pipeTop.x,
        y: enemy.pipeTop.y,
        width: enemy.pipeTop.width,
        height: enemy.pipeTop.height,
      };

      var rect2 = {
        x: enemy.pipeBottom.x,
        y: enemy.pipeBottom.y,
        width: enemy.pipeBottom.width,
        height: enemy.pipeBottom.height,
      };

      if (
        birdRect.x < rect1.x + rect1.width &&
        birdRect.x + birdRect.width > rect1.x &&
        birdRect.y < rect1.y + rect1.height &&
        birdRect.y + birdRect.height > rect1.y
      ) {
        // this.isCollided = true;
        // console.log("coli top");
        this.isAlive = false;
      }

      if (
        birdRect.x < rect2.x + rect2.width &&
        birdRect.x + birdRect.width > rect2.x &&
        birdRect.y < rect2.y + rect2.height &&
        birdRect.y + birdRect.height > rect2.y
      ) {
        this.isAlive = false;
      }
    });
  }
}
