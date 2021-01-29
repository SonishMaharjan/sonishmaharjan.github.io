const LINE_LENGTH = 60;

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
    this.draggerRadius = 7;

    this.stickStyle = `stroke:${this.color};stroke-width:15;
    `;
  }

  getEndX() {
    return this.originX + Math.cos(degToRad(this.angle)) * this.radius;
  }

  getEndY() {
    return this.originY + Math.sin(degToRad(this.angle)) * this.radius;
  }

  translate(position) {
    this.originX = position.x;
    this.originY = position.y;

    this.endX = this.getEndX();
    this.endY = this.getEndY();
  }

  render() {
    return `<circle
  cx="${this.endX}"
  cy="${this.endY}"
  r="${this.radius}"
  fill="black"
/>
    
`;

    {
      /* <circle cx="${this.endX}" cy="${this.endY}" r="${this.draggerRadius}"
      data-stickman-id=${this.stickManId}
      data-stick-name=${this.stickName}
  
      fill="red" class="draggable"  />
   */
    }
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

    this.endX = posX;
    this.endY = posY + LINE_LENGTH;

    this.draggerRadius = 7;

    this.endX = this.getEndX(this.draggerAngle);
    this.endY = this.getEndY(this.draggerAngle);

    // this.legCenter =

    this.createStickMan();
  }

  translate(position) {
    this.posX = position.x;
    this.posY = position.y;

    this.stickBody.translate(position);

    this.lowerX = this.stickBody.endX;
    this.lowerY = this.stickBody.endY;

    this.leftArm.translate(position);
    this.rightArm.translate(position);
    this.leftThigh.translate({
      x: this.lowerX,
      y: this.lowerY,
    });
    this.rightThigh.translate({
      x: this.lowerX,
      y: this.lowerY,
    });

    this.endX = this.getEndX(this.draggerAngle);
    this.endY = this.getEndY(this.draggerAngle);
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
    this.leftThigh.translate({
      x: this.stickBody.endX,
      y: this.stickBody.endY,
    });
    this.rightThigh.translate({
      x: this.stickBody.endX,
      y: this.stickBody.endY,
    });

    this.leftArm.rotate(angle + this.leftArm.offsetAngle);
    this.rightArm.rotate(angle + this.rightArm.offsetAngle);
    this.leftHand.rotate(angle + this.leftHand.offsetAngle);
    this.rightHand.rotate(angle + this.rightHand.offsetAngle);

    this.leftThigh.rotate(angle + this.leftThigh.offsetAngle);
    this.leftLeg.rotate(angle + this.leftLeg.offsetAngle);

    this.rightThigh.rotate(angle + this.rightThigh.offsetAngle);
    this.rightLeg.rotate(angle + this.rightLeg.offsetAngle);

    this.endX = this.getEndX(this.draggerAngle);
    this.endY = this.getEndY(this.draggerAngle);
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

    this.rightHand = new Stick(
      this.rightArm.endX,
      this.rightArm.endY,
      LINE_LENGTH,
      145,
      0,
      0,
      "rightHand",
      this.id,
      this.rightArm,
      this.draggerAngle
    );

    this.leftThigh = new Stick(
      this.stickBody.endX,
      this.stickBody.endY,
      LINE_LENGTH,
      130,
      0,
      0,
      "leftThigh",
      this.id,
      null,
      this.draggerAngle
    );

    this.leftLeg = new Stick(
      this.leftThigh.endX,
      this.leftThigh.endY,
      LINE_LENGTH,
      10,
      0,
      0,
      "leftLeg",
      this.id,
      this.leftThigh,
      this.draggerAngle
    );

    this.rightThigh = new Stick(
      this.stickBody.endX,
      this.stickBody.endY,
      LINE_LENGTH,
      30,
      0,
      0,
      "rightThigh",
      this.id,
      null,
      this.draggerAngle
    );

    this.rightLeg = new Stick(
      this.rightThigh.endX,
      this.rightThigh.endY,
      LINE_LENGTH,
      145,
      0,
      0,
      "rightLeg",
      this.id,
      this.rightThigh,
      this.draggerAngle
    );
  }

  update() {
    console.log(this.stickBody.endX);
    this.lowerX = this.stickBody.endX;
    this.lowerY = this.stickBody.endY;

    this.leftThigh.translate({ x: this.lowerX, y: this.lowerY });
    this.rightThigh.translate({ x: this.lowerX, y: this.lowerY });
    this.head.translate({ x: this.posX, y: this.posY });
    // this.leftThigh.posX = this.lowerX;

    // this.rightThigh.posY = this.lowerX;
  }

  render() {
    this.update();
    this.svg.innerHTML = `
    <!-- Head -->
    ${this.head.render()}
    
    ${this.leftHand.render()}
    ${this.rightHand.render()}
    ${this.leftArm.render()}

    ${this.rightArm.render()}




    ${this.rightLeg.render()}

    ${this.leftLeg.render()}
    ${this.rightThigh.render()}
    ${this.leftThigh.render()}
    ${this.stickBody.render()}
    
    <!-- Body -->

    ${this.addTransformer()}
    `;
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
