class MovingImage {
  constructor(x, y, width, height, speed, image, offsetX) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.image = image;
    // this.transitionOffset = -100;
  }

  moveX(x) {
    this.x = x;
  }

  update(ctx) {
    this.x -= this.speed;

    if (this.x < -this.width) {
      this.x = this.x + this.width * NUM_OF_BACKGROUNDS - 12;
    }
    this.draw(ctx);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}
