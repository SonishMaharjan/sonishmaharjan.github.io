ANIMATOR_WIDTH = 600;
ANIMATOR_HEIGHT = 400;

class CanvasAnimatorScreen {
  constructor(canvasId, width, height) {
    this.id = canvasId;
    this.width = width;
    this.height = height;

    this.canvas = document.getElementById(this.id);
    this.context = this.canvas.getContext("2d");
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // this.addClickListener();

    this.stick = new Stick(50, 50);

    this.init();
  }

  init() {
    this.update();
  }

  update = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.stick.update(this.context);

    // requestAnimationFrame(this.update);
  };

  draw() {}
}

class Stick {
  constructor(posX, posY, originX, originY, angle = 80) {
    this.x = 0;
    this.y = 0;

    this.posX = 10;
    this.posY = 10;
    this.length = 100;

    this.originX = this.posX;
    this.originY = this.posY;
    this.angle = 70;

    console.log(this.originX);
    console.log(this.originY);

    this.endX = this.posX + this.length;
    this.endY = this.posY;
  }

  update(context) {
    this.draw(context);
  }

  draw(context) {
    context.save();

    context.beginPath();
    context.lineCap = "round";
    context.lineWidth = 10;

    context.strokeStyle = "black";

    context.translate(this.posX, this.posY);
    context.rotate((this.angle * Math.PI) / 180);

    context.moveTo(this.x, this.y);
    context.lineTo(this.x + this.length, this.y);

    context.stroke();

    context.restore();
  }
}

window.addEventListener("load", () => {
  let animator = new CanvasAnimatorScreen(
    "animator-canvas",
    ANIMATOR_WIDTH,
    ANIMATOR_HEIGHT
  );
});
