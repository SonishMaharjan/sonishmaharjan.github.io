const LINE_LENGTH = 60;

class StickMan {
  constructor(posX, posY, color, svg, id) {
    console.log(id);
    this.posX = posX;
    this.posY = posY;
    this.svg = svg;
    this.color = color;
    this.id = id;

    this.draggerAngle = 270;

    this.length = 120;

    this.draggerRadius = 7;

    // this.legCenter =

    this.createStickMan();

    this.endX = this.getEndX(this.draggerAngle);
    this.endY = this.getEndY(this.draggerAngle);

    this.translateDraggerX = this.stickBody.midX;
    this.translateDraggerY = this.stickBody.midY;
  }

  translate(position) {
    this.posX = position.x;
    this.posY = position.y;

    this.stickBody.translate(position);

    this.lowerX = this.stickBody.endX;
    this.lowerY = this.stickBody.endY;

    this.translateDraggerX = this.stickBody.midX;
    this.translateDraggerY = this.stickBody.midY;

    this.leftArm.translate({ x: this.stickBody.x, y: this.stickBody.y });
    this.rightArm.translate({ x: this.stickBody.x, y: this.stickBody.y });
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
    return this.stickBody.midX + Math.cos(degToRad(angle)) * this.length;
  }

  getEndY(angle) {
    return this.stickBody.midY + Math.sin(degToRad(angle)) * this.length;
  }

  renderTransformer() {
    return `  <circle cx="${this.endX}" cy="${this.endY}" r="${this.draggerRadius}"
    data-stickman-id=${this.id}
    data-transform="rotation"
    fill="blue" class="draggable"  />
    
    <circle cx="${this.translateDraggerX}" cy="${this.translateDraggerY}" r="${this.draggerRadius}"
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
    this.head.rotate(angle + this.head.offsetAngle);

    this.endX = this.getEndX(this.draggerAngle);
    this.endY = this.getEndY(this.draggerAngle);
  }

  createStickMan() {
    this.stickBody = new StickBody(
      this.posX,
      this.posY,
      1.5 * LINE_LENGTH,
      90,
      0,
      0,
      "stickBody",
      this.id,
      this.draggerAngle
    );

    this.head = new Head(
      this.stickBody.x,
      this.stickBody.y,
      30,
      270,
      0,
      0,
      "head",
      this.id,
      this.draggerAngle
    );

    this.leftArm = new Stick(
      this.posX,
      this.posY,
      LINE_LENGTH,
      150,
      0,
      0,
      "leftArm",
      this.id,
      this.draggerAngle
    );

    this.rightArm = new Stick(
      this.posX,
      this.posY,
      LINE_LENGTH,
      30,
      0,
      0,
      "rightArm",
      this.id,
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
      this.draggerAngle
    );

    this.rightHand = new Stick(
      this.rightArm.endX,
      this.rightArm.endY,
      LINE_LENGTH,
      45,
      0,
      0,
      "rightHand",
      this.id,
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
      this.draggerAngle
    );

    this.leftLeg = new Stick(
      this.leftThigh.endX,
      this.leftThigh.endY,
      LINE_LENGTH,
      90,
      0,
      0,
      "leftLeg",
      this.id,
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
      this.draggerAngle
    );

    this.rightLeg = new Stick(
      this.rightThigh.endX,
      this.rightThigh.endY,
      LINE_LENGTH,
      90,
      0,
      0,
      "rightLeg",
      this.id,
      this.draggerAngle
    );
  }

  update() {
    // console.log(this.stickBody.endX);
    this.lowerX = this.stickBody.endX;
    this.lowerY = this.stickBody.endY;

    this.translateDraggerX = this.stickBody.midX;
    this.translateDraggerY = this.stickBody.midY;

    this.leftThigh.translate({ x: this.lowerX, y: this.lowerY });
    this.rightThigh.translate({ x: this.lowerX, y: this.lowerY });
    this.head.translate({ x: this.stickBody.x, y: this.stickBody.y });
    // this.leftThigh.posX = this.lowerX;

    this.leftArm.translate({ x: this.stickBody.x, y: this.stickBody.y });

    this.rightArm.translate({ x: this.stickBody.x, y: this.stickBody.y });

    this.leftLeg.translate({ x: this.leftThigh.endX, y: this.leftThigh.endY });
    this.rightLeg.translate({
      x: this.rightThigh.endX,
      y: this.rightThigh.endY,
    });

    this.leftHand.translate({ x: this.leftArm.endX, y: this.leftArm.endY });
    this.rightHand.translate({ x: this.rightArm.endX, y: this.rightArm.endY });

    // this.rightThigh.posY = this.lowerX;
  }

  clone() {
    let stickman = new StickMan();

    Object.keys(stickman).forEach((key) => {
      stickman[key] =
        this[key] instanceof Stick || this[key] instanceof Head
          ? this[key].clone()
          : JSON.parse(JSON.stringify(this[key]));
    });

    // stickman.isShadow = isShadow;

    // stickman.id = "stick-man-" + generateRandomCode(5);

    return stickman;
  }

  render() {
    this.update();
    return `
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



    
    

    ${this.leftArm.renderDragger()}

    ${this.rightArm.renderDragger()}

   
    ${this.rightThigh.renderDragger()}
    ${this.leftThigh.renderDragger()}
    ${this.stickBody.renderDragger()}

   


    ${this.rightLeg.renderDragger()}
    ${this.leftLeg.renderDragger()}


    ${this.head.renderDragger()}

    ${this.renderTransformer()}


    ${this.leftHand.renderDragger()}
    ${this.rightHand.renderDragger()}


   
    `;
  }
}
