const LINE_LENGTH = 75;

class Head {
  constructor(x, y, radius, angle, originX, originY, id, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angle = angle;
    this.originX = originX || x;
    this.originY = originY || y;
    this.endX = this.getEndX();
    this.endY = this.getEndY();
    this.id = id;

    this.color = color || "#000";

    this.stickStyle = `stroke:${this.color};stroke-width:15;

    `;
  }

  getEndX() {
    return this.originX + Math.cos(degToRad(this.angle)) * this.radius;
  }

  getEndY() {
    return this.originY + Math.sin(degToRad(this.angle)) * this.radius;
  }

  render() {
    return `<circle
  cx="${this.endX}"
  cy="${this.endY}"
  r="${this.radius}"
  fill="black"
/>;`;
  }
}

class Stick {
  constructor(
    x,
    y,
    length,
    angle,
    originX,
    originY,
    stickName,
    stickManId,
    parent,
    parentAngle,
    color
  ) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = angle;
    this.mainAngleOffset;
    this.originX = originX;
    this.originY = originY;
    this.endX = this.getEndX(angle);
    this.endY = this.getEndY(angle);
    this.color = color || "#000";

    this.stickName = stickName;
    this.stickManId = stickManId;

    this.parentAngle = parentAngle;

    this.offsetAngle = this.angle - this.parentAngle;

    // console.log(parent);
    this.parent = parent;

    this.stickStyle = `stroke:${this.color};stroke-width:15; `;

    this.draggerRadius = 7;
  }

  rotate(angle) {
    this.angle = angle;
    this.endX = this.getEndX(angle);
    this.endY = this.getEndY(angle);
  }

  getEndX(angle) {
    return this.x + Math.cos(degToRad(angle)) * this.length;
  }

  getEndY(angle) {
    return this.y + Math.sin(degToRad(angle)) * this.length;
  }

  updateOffsetAngle(parentAngle) {
    this.offsetAngle = this.angle - parentAngle;
  }

  update() {
    // debugger;
    if (this.parent) {
      // console.log(this.parent);
      this.x = this.parent.endX;
      this.y = this.parent.endY;

      this.endX = this.getEndX(this.angle);
      this.endY = this.getEndY(this.angle);

      // this.rotate(this.angle);
    }
  }
  render() {
    this.update();
    return `<line x1="${this.x}" y1="${this.y}" x2="${this.endX}" y2="${this.endY}"
    stroke-linecap="round"   style="${this.stickStyle}" />
   <circle cx="${this.endX}" cy="${this.endY}" r="${this.draggerRadius}"
    data-stickman-id=${this.stickManId}
    data-stick-name=${this.stickName}

    fill="red" class="draggable"  />
    `;
  }
}

class StickMan {
  constructor(posX, posY, color, svg, id) {
    this.posX = posX;
    this.posY = posY;
    this.svg = svg;
    this.color = color;
    this.id = id;

    // this.angle = 0;
    this.draggerAngle = 270;

    this.length = 120;
    // this.endX = this.getEndX(this.angle);
    // this.endY = this.getEndY(this.angle);
    this.draggerRadius = 15;

    this.endX = this.getEndX(this.draggerAngle);
    this.endY = this.getEndY(this.draggerAngle);

    this.createStickMan();
    // this.rotate(this.angle);
  }

  getEndX(angle) {
    return this.posX + Math.cos(degToRad(angle)) * this.length;
  }

  getEndY(angle) {
    return this.posY + Math.sin(degToRad(angle)) * this.length;
  }

  addTransformer() {
    return `  <circle cx="${this.endX}" cy="${this.endY}" r="${this.draggerRadius}"
    data-stickman-id=${this.id}
    data-transform="rotation"
    fill="blue" class="draggable"  />`;
  }

  rotate(angle) {
    // angle = angle / 10;

    // this.angle = angle;

    this.draggerAngle = angle;

    // this.angle = this.draggerAngle - 270;

    console.log(this.stickBody.offsetAngle);
    this.stickBody.rotate(angle + this.stickBody.offsetAngle);
    this.leftArm.rotate(angle + 60);
    this.leftHand.rotate(angle + 56);

    this.endX = this.getEndX(this.draggerAngle);
    this.endY = this.getEndY(this.draggerAngle);
  }

  createStickMan() {
    console.log("hahat:", this.draggerAngle);
    this.stickBody = new Stick(
      this.posX,
      this.posY,
      1.5 * LINE_LENGTH,
      90,
      0,
      0,
      "stickBody",
      this.id,
      null, //parent
      this.draggerAngle
    );

    this.head = new Head(this.stickBody.x, this.stickBody.y, 30, 270, 0, 0);

    this.leftArm = new Stick(
      this.posX,
      this.posY,
      LINE_LENGTH,
      200,
      0,
      0,
      "leftArm",
      this.id
    );
    this.leftHand = new Stick(
      this.leftArm.endX,
      this.leftArm.endY,
      LINE_LENGTH,
      60,
      0,
      0,
      "leftHand",
      this.id,
      this.leftArm
    );
  }

  render() {
    console.log("hahah");
    this.svg.innerHTML = `
    <!-- Head -->
    

  
  
    
    <!-- Body -->
    ${this.stickBody.render()}

    ${this.addTransformer()}
    `;

    // ${this.leftHand.render()}

    // ${this.leftArm.render()}
    // ${this.head.render()}
  }
}

let svg = document.getElementById("svg");

let stickMan = new StickMan(250, 250, "#000", svg, "stick-0");

let stickManManager = {
  "stick-0": stickMan,
};

stickMan.render();

function enableDragging(evt) {
  var svg = evt.target;
  svg.addEventListener("mousedown", startDrag);
  svg.addEventListener("mousemove", drag);
  svg.addEventListener("mouseup", endDrag);
  svg.addEventListener("mouseleave", endDrag);
  let activeCp = false;
  function startDrag(e) {
    if (e.target.classList.contains("draggable")) activeCp = e.target;
  }
  function drag(e) {
    if (activeCp) {
      e.preventDefault();

      let stickManId = activeCp.getAttributeNS(null, "data-stickman-id");
      let stickName = activeCp.getAttributeNS(null, "data-stick-name");
      let dataTransform = activeCp.getAttributeNS(null, "data-transform");

      // console.log(dataTransform);

      if (stickManId && stickName) {
        let stickObject = stickManManager[stickManId][stickName];

        let tanx = e.offsetX - stickObject.x;
        let tany = e.offsetY - stickObject.y;

        let rad = Math.atan2(tany, tanx);
        let deg = radToDeg(rad);
        let final = deg;

        if (tany < 0) {
          final = 360 + deg;
        }

        stickObject.rotate(final);

        stickMan.render();
      }

      if (stickManId && dataTransform === "rotation") {
        // console.log("hahah");

        // console.log(stickManId);
        let stickManObject = stickManManager[stickManId];

        let tanx = e.offsetX - stickManObject.posX;
        let tany = e.offsetY - stickManObject.posY;

        let rad = Math.atan2(tany, tanx);
        let deg = radToDeg(rad);
        let final = deg;

        if (tany < 0) {
          final = 360 + deg;
        }

        stickManObject.rotate(final);

        stickManObject.render();
      }

      //   sm[activeCp.getAttributeNS(null, "id")] = {
      //     x: e.clientX,
      //     y: e.clientY,
      //   };
    }
  }
  function endDrag(e) {
    if (activeCp) {
      let stickManId = activeCp.getAttributeNS(null, "data-stickman-id");
      let stickName = activeCp.getAttributeNS(null, "data-stick-name");
      // let dataTransform = activeCp.getAttributeNS(null, "data-transform");

      // console.log(dataTransform);

      if (stickManId && stickName) {
        let stickObject = stickManManager[stickManId][stickName];
        let stickManObject = stickManManager[stickManId];
        console.log(stickObject);
        stickObject.updateOffsetAngle(stickManObject.draggerAngle);
      }

      activeCp = null;
    }
    // savedFrames.push(JSON.parse(JSON.stringify(sm)));
  }
}
