class Road {
  constructor(
    roadImage,
    width = SCREEN_WIDTH,
    height = SCREEN_HEIGHT,
    speed = 5
  ) {
    this.TOTAL_IMAGE = 3;
    this.roadImage = roadImage;
    this.width = width;
    this.height = height;
    this.roadSpriteList = [];
    this.speed = speed;
    this.init();
  }

  init() {
    for (let i = 0; i < 3; i++) {
      this.roadSpriteList.push({
        x: 0,
        y: -i * this.height,
        img: this.roadImage,
      });
    }
  }

  update(ctx) {
    this.moveRoad();
    this.draw(ctx);
  }

  draw(ctx) {
    this.roadSpriteList.forEach((roadSpriteObj) => {
      ctx.beginPath();
      ctx.drawImage(
        roadSpriteObj.img,
        roadSpriteObj.x,
        roadSpriteObj.y,
        this.width,
        this.height
      );
      ctx.closePath();
    });
  }

  moveRoad() {
    this.roadSpriteList.forEach((roadSpriteObj) => {
      roadSpriteObj.y += this.speed;

      if (roadSpriteObj.y > this.height + 200) {
        roadSpriteObj.y =
          roadSpriteObj.y - this.roadSpriteList.length * this.height;
      }
    });
  }
}
