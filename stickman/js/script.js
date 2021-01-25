ANIMATOR_WIDTH = 600;
ANIMATOR_HEIGHT = 400;

LINE_LENGTH = 70;

class CanvasAnimatorScreen {
  constructor(canvasId, width, height) {
    this.id = canvasId;
    this.width = width;
    this.height = height;

    this.canvas = document.getElementById(this.id);
    this.context = this.canvas.getContext("2d");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.mouseDragEvent = { x: null, y: null, isDraggble: false };

    this.stickMan = new Line(250, 150, 34, 23, 34, "black");
    this.init();
    this.addClickListener();
  }

  init() {
    this.update();
  }

  update = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.stickMan.update(this.context, this.mouseDragEvent);

    requestAnimationFrame(this.update);
  };

  draw() {}

  addClickListener() {
    this.canvas.addEventListener(
      "mousedown",
      (e) => {
        // let mousePos = {
        //   x: e.offsetX,
        //   y: e.offsetY,
        // };
        // this.mouseDragEvent = mousePos;
        this.mouseDragEvent.x = e.offsetX;
        this.mouseDragEvent.y = e.offsetY;
        this.mouseDragEvent.isDraggble = true;
        console.log(this.mouseDragEvent);
      },
      false
    );

    this.canvas.addEventListener(
      "mousemove",
      (e) => {
        if (this.mouseDragEvent.isDraggble) {
          this.mouseDragEvent.x = e.offsetX;
          this.mouseDragEvent.y = e.offsetY;
          console.log(this.mouseDragEvent);
        }

        // console.log(this.mouseDragEvent);
      },
      false
    );

    this.canvas.addEventListener(
      "mouseup",
      (e) => {
        // let mousePos = {
        //   x: e.offsetX,
        //   y: e.offsetY,
        // };
        // this.mouseDragEvent = mousePos;
        this.mouseDragEvent.x = null;
        this.mouseDragEvent.y = null;

        this.mouseDragEvent.isDraggble = false;
        console.log(this.mouseDragEvent);
      },
      false
    );
  }
}

class Line {
  constructor(posX, posY, centerX, centerY, angle, color) {
    this.posX = posX;
    this.posY = posY;

    this.centerX = posX;
    this.centerY = posY;
    this.angle = angle;
    this.color = color;

    this.length = LINE_LENGTH;

    this.endX =
      this.posX + Math.cos((Math.PI * this.angle) / 180) * this.length;
    this.endY =
      this.posY + Math.sin((Math.PI * this.angle) / 180) * this.length;

    this.draggerX = this.endX;
    this.draggerY = this.endY;
    this.length = 20;
    this.draggerRadius = 8;

    this.isDraggble = false;
  }

  //   init() {
  //     this.update(context);
  //   }

  roatate() {}

  update(context, mouseDragEvent) {
    this.checkDraggable(mouseDragEvent);

    // let theta =
    //   (Math.atan(
    //     (mouseDragEvent.y - this.posY) / (mouseDragEvent.x - this.posX)
    //   ) *
    //     180) /
    //   Math.PI;

    // console.log(theta);

    if (this.isDraggble) {
      // let theta = Math.acos(mouseDragEvent.x-)
      // let theta = Math.atan(
      //   (mouseDragEvent.y - this.posY) / (mouseDragEvent.x - this.posX)
      // );

      // console.log(theta);
      // x=r*cos(theta)
      // y=r*sin(theta)

      this.endX = mouseDragEvent.x;
      this.endY = mouseDragEvent.y;
    }

    // console.log("hahah");
    this.draw(context);
  }

  draw(context) {
    // context.beginPath();
    // context.lineCap = "round";

    // context.moveTo(20, 60);
    // context.lineTo(921, 500);
    // // context.moveTo(this.posX, this.poxY);
    // // context.lineTo(this.endX, this.endY);
    // context.strokeStyle = "black";
    // context.stroke();

    context.beginPath();
    context.lineCap = "round";
    context.lineWidth = 10;

    context.moveTo(this.posX, this.posY);
    context.lineTo(this.endX, this.endY);
    context.strokeStyle = "black";
    context.stroke();

    context.closePath();
    // context.arc(80, 50, 10, 0, Math.PI * 2);

    context.fillStyle = "red";
    context.arc(this.endX, this.endY, this.draggerRadius, 0, Math.PI * 2);
    context.fill(); //fill the circle
  }

  checkDraggable(mouseDragEvent) {
    let circle = {
      x: this.endX,
      y: this.endY,
      radius: this.draggerRadius,
    };

    let point = {
      x: mouseDragEvent.x,
      y: mouseDragEvent.y,
    };

    this.isDraggble = isOnCircle(point, circle);
  }
}

window.addEventListener("load", () => {
  let animator = new CanvasAnimatorScreen(
    "animator-canvas",
    ANIMATOR_WIDTH,
    ANIMATOR_HEIGHT
  );
});

// var canvas = document.getElementById("animator-canvas");
// context = canvas.getContext("2d"); // get Canvas Context object
// let timestamp = Date.now();
// let wave = false;

// canvas.width = 600;
// canvas.height = 400;

// //   context.beginPath();
// //   context.fillStyle = "#000"; // #000000
// //   context.arc(
// //     canvas.width / 2 - 150,
// //     canvas.height / 2 - 75,
// //     20,
// //     0,
// //     Math.PI * 2
// //   );
// //   context.fill(); //fill the circle
// //   context.stroke();

// draw();

// function draw() {
//   if (Date.now() < timestamp + 900) return requestAnimationFrame(draw);

//   context.clearRect(0, 0, window.innerWidth, window.innerHeight);
//   // head;
//   // console.log("haha");
//   context.beginPath();
//   context.lineCap = "round";
//   context.fillStyle = "black"; // #000000
//   context.arc(80, 50, 10, 0, Math.PI * 2);
//   // context.fill(); //fill the circle
//   context.stroke();

//   context.beginPath();
//   context.lineWidth = 10;
//   context.stroke();

//   //body
//   context.beginPath();
//   context.moveTo(200, 80);
//   context.lineTo(200, 180);
//   context.strokeStyle = "black";
//   context.stroke();

//   //arms
//   context.beginPath();
//   context.strokeStyle = "black";
//   context.moveTo(200, 100);
//   context.lineTo(150, 130);
//   if (wave) {
//     context.moveTo(200, 100);
//     context.lineTo(250, 130);
//     wave = false;
//   } else {
//     context.moveTo(200, 100);
//     context.lineTo(250, 70);
//     wave = true;
//   }
//   context.stroke();

//   //legs
//   context.beginPath();
//   context.strokeStyle = "black";
//   context.moveTo(200, 180);
//   context.lineTo(150, 280);
//   context.moveTo(200, 180);
//   context.lineTo(250, 280);
//   context.stroke();
//   timestamp = Date.now();
//   requestAnimationFrame(draw);
// }
