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
    color
  ) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = angle;
    this.originX = originX;
    this.originY = originY;
    this.endX = this.getEndX();
    this.endY = this.getEndY();
    this.color = color || "#000";

    this.stickName = stickName;
    this.stickManId = stickManId;

    this.stickStyle = `stroke:${this.color};stroke-width:15; `;

    this.draggerRadius = 7;
  }

  getEndX() {
    return this.x + Math.cos(degToRad(this.angle)) * this.length;
  }

  getEndY() {
    return this.y + Math.sin(degToRad(this.angle)) * this.length;
  }

  render() {
    return `<line x1="${this.x}" y1="${this.y}" x2="${this.endX}" y2="${this.endY}"  stroke-linecap="round"   style="${this.stickStyle}" />
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

    this.createStickMan();
  }

  createStickMan() {
    this.stickBody = new Stick(
      this.posX,
      this.posY,
      1.5 * LINE_LENGTH,
      90,
      0,
      0,
      "stickBody",
      this.id
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
      this.id
    );
  }

  render() {
    this.svg.innerHTML = `
    <!-- Head -->
    

    ${this.leftHand.render()}

    ${this.leftArm.render()}
  
    
    <!-- Body -->
    ${this.stickBody.render()}
    `;

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

      let stickObject = stickManManager[stickManId][stickName];

      let pointA = { x: stickObject.endX, y: stickObject.endY };
      let pointB = { x: e.offsetX, y: e.offsetY };
      let origin = { x: stickObject.x, y: stickObject.y };

      //   console.log(pointA);

      //   console.log(pointB);

      //   let pointA = {x: offsetX}
      console.log(getDistance(pointA, pointB, origin));

      //   sm[activeCp.getAttributeNS(null, "id")] = {
      //     x: e.clientX,
      //     y: e.clientY,
      //   };
    }
  }
  function endDrag(e) {
    activeCp = null;
    // savedFrames.push(JSON.parse(JSON.stringify(sm)));
  }
}
