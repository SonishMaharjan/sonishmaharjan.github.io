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

class StickMan {
  constructor(posX, posY, color, svg, id) {
    this.posX = posX;
    this.posY = posY;
    this.svg = svg;
    this.color = color;
    this.id = id;

    this.draggerAngle = 270;

    this.length = 120;

    this.draggerRadius = 7;

    this.endX = this.getEndX(this.draggerAngle);
    this.endY = this.getEndY(this.draggerAngle);

    this.createStickMan();
  }

  translate(position) {
    this.posX = position.x;
    this.posY = position.y;

    this.stickBody.translate(position);
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
    fill="blue" class="draggable"  />
    
    <circle cx="${this.posX}" cy="${this.posY}" r="${this.draggerRadius}"
    data-stickman-id=${this.id}
    data-transform="translate"
    fill="yellow" class="draggable"  />

    `;
  }

  rotate(angle) {
    this.draggerAngle = angle;

    this.stickBody.rotate(angle + this.stickBody.offsetAngle);
    this.leftArm.rotate(angle + this.leftArm.offsetAngle);
    this.rightArm.rotate(angle + this.rightArm.offsetAngle);
    this.leftHand.rotate(angle + this.leftHand.offsetAngle);

    this.endX = this.getEndX(this.draggerAngle);
    this.endY = this.getEndY(this.draggerAngle);
  }

  createStickMan() {
    this.stickBody = new Stick(
      this.posX,
      this.posY,
      2 * LINE_LENGTH,
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
      this.id,
      null,
      this.draggerAngle
    );

    this.rightArm = new Stick(
      this.posX,
      this.posY,
      LINE_LENGTH,
      0,
      0,
      0,
      "rightArm",
      this.id,
      null,
      this.draggerAngle
    );

    this.leftHand = new Stick(
      this.leftArm.endX,
      this.leftArm.endY,
      LINE_LENGTH,
      145,
      0,
      0,
      "leftHand",
      this.id,
      this.leftArm,
      this.draggerAngle
    );
  }

  render() {
    this.svg.innerHTML = `
    <!-- Head -->
    
    ${this.leftHand.render()}
    ${this.leftArm.render()}

    ${this.rightArm.render()}


    
    <!-- Body -->
    ${this.stickBody.render()}

    ${this.addTransformer()}
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
    console.log("hahahah");
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

      if (stickManId && dataTransform === "translate") {
        console.log("thang");

        // console.log(stickManId);
        let stickManObject = stickManManager[stickManId];

        let position = { x: e.offsetX, y: e.offsetY };

        // let tanx = e.offsetX - stickManObject.posX;
        // let tany = e.offsetY - stickManObject.posY;

        // let rad = Math.atan2(tany, tanx);
        // let deg = radToDeg(rad);
        // let final = deg;

        // if (tany < 0) {
        //   final = 360 + deg;
        // }

        stickManObject.translate(position);

        stickManObject.render();
      }
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

// console.log(svg);
window.addEventListener("load", enableDragging);
