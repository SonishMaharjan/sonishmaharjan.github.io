/** Class representing a StickMan*/
class StickMan {
  /** Create a stickman.
   * @param {number} posX - The x position(neck of stickman).
   * @param {number} posY - The Y position(neck of stickman).
   * @param {object} svg - The DOM's <svg> node.
   * @param {string} [color="#000"]- The color hexcode or color name of stick man.
   * @param {string} id - The unique id of stick man of which this stick is a part.
   */
  constructor(posX, posY, color, svg, id) {
    this.posX = posX;
    this.posY = posY;
    this.svg = svg;
    this.color = color || "#000";
    this.id = id;

    this.draggerAngle = STICKMAN_ROTATOR_ANGLE_INITAL;
    this.draggerDistance = STICKMAN_ROTATOR_DISTANCE;
    this.draggerRadius = DRAGGER_RADIUS;

    this.createStickMan();

    /** point x,y for stickman rotator dragger */
    this.endX = this.getEndX(this.draggerAngle);
    this.endY = this.getEndY(this.draggerAngle);

    /** point x,y for stickman translator dragger */
    this.translateDraggerX = this.stickBody.midX;
    this.translateDraggerY = this.stickBody.midY;
  }

  /** Translate the stickman and its sticks position
   * @param {object} position -  position(co-ordinate) object with x and y value.
   */
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

  /**Rotate the stick man and its stick with given angle
   * @param {number} angle - rotate angle in degree.
   */
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

  /** calculate the endX position of stickman after rotation of given angle
   * @param {number} angle -  angle of rotation in degree.
   */
  getEndX(angle) {
    return (
      this.stickBody.midX + Math.cos(degToRad(angle)) * this.draggerDistance
    );
  }

  /** calculate the endY position of stickman after rotation of given angle
   * @param {number} angle -  angle of rotation in degree.
   */
  getEndY(angle) {
    return (
      this.stickBody.midY + Math.sin(degToRad(angle)) * this.draggerDistance
    );
  }

  /** render control/dragger points(rotator and translator) for stickman
   */
  renderTransformer() {
    return `  <circle cx="${this.endX}" cy="${this.endY}" r="${this.draggerRadius}"
    data-stickman-id=${this.id}
    data-transform="rotation"
    stroke="#000"
    fill="#7993f0" class="draggable"  />
    
    <circle cx="${this.translateDraggerX}" cy="${this.translateDraggerY}" r="${this.draggerRadius}"
    data-stickman-id=${this.id}
    data-transform="translate"
    stroke="#000"
    fill="yellow" class="draggable"  />

    `;
  }

  /** create stick man's body parts
   */
  createStickMan() {
    this.stickBody = new StickBody(
      this.posX,
      this.posY,
      1.5 * LINE_LENGTH,
      90,
      "stickBody",
      this.id,
      this.draggerAngle,
      this.color
    );

    this.head = new Head(
      this.stickBody.x,
      this.stickBody.y,
      30,
      270,
      "head",
      this.id,
      this.draggerAngle,
      this.color
    );

    this.leftArm = new Stick(
      this.posX,
      this.posY,
      LINE_LENGTH,
      150,
      "leftArm",
      this.id,
      this.draggerAngle,
      this.color
    );

    this.rightArm = new Stick(
      this.posX,
      this.posY,
      LINE_LENGTH,
      30,
      "rightArm",
      this.id,
      this.draggerAngle,
      this.color
    );

    this.leftHand = new Stick(
      this.leftArm.endX,
      this.leftArm.endY,
      LINE_LENGTH,
      145,
      "leftHand",
      this.id,
      this.draggerAngle,
      this.color
    );

    this.rightHand = new Stick(
      this.rightArm.endX,
      this.rightArm.endY,
      LINE_LENGTH,
      45,
      "rightHand",
      this.id,
      this.draggerAngle,
      this.color
    );

    this.leftThigh = new Stick(
      this.stickBody.endX,
      this.stickBody.endY,
      LINE_LENGTH,
      130,
      "leftThigh",
      this.id,
      this.draggerAngle,
      this.color
    );

    this.leftLeg = new Stick(
      this.leftThigh.endX,
      this.leftThigh.endY,
      LINE_LENGTH,
      90,
      "leftLeg",
      this.id,
      this.draggerAngle,
      this.color
    );

    this.rightThigh = new Stick(
      this.stickBody.endX,
      this.stickBody.endY,
      LINE_LENGTH,
      30,
      "rightThigh",
      this.id,
      this.draggerAngle,
      this.color
    );

    this.rightLeg = new Stick(
      this.rightThigh.endX,
      this.rightThigh.endY,
      LINE_LENGTH,
      90,
      "rightLeg",
      this.id,
      this.draggerAngle,
      this.color
    );
  }

  /** update the postion of stickman body parts with respect to sticman posititon
   */
  update() {
    this.lowerX = this.stickBody.endX;
    this.lowerY = this.stickBody.endY;

    this.translateDraggerX = this.stickBody.midX;
    this.translateDraggerY = this.stickBody.midY;

    this.leftThigh.translate({ x: this.lowerX, y: this.lowerY });
    this.rightThigh.translate({ x: this.lowerX, y: this.lowerY });

    this.head.translate({ x: this.stickBody.x, y: this.stickBody.y });

    this.leftArm.translate({ x: this.stickBody.x, y: this.stickBody.y });
    this.rightArm.translate({ x: this.stickBody.x, y: this.stickBody.y });

    this.leftLeg.translate({ x: this.leftThigh.endX, y: this.leftThigh.endY });
    this.rightLeg.translate({
      x: this.rightThigh.endX,
      y: this.rightThigh.endY,
    });

    this.leftHand.translate({ x: this.leftArm.endX, y: this.leftArm.endY });
    this.rightHand.translate({ x: this.rightArm.endX, y: this.rightArm.endY });
  }

  /** clone stick man object to new object(with out reference) and return new object
   */
  clone() {
    let stickman = new StickMan();

    Object.keys(stickman).forEach((key) => {
      stickman[key] =
        this[key] instanceof Stick || this[key] instanceof Head
          ? this[key].clone()
          : JSON.parse(JSON.stringify(this[key]));
    });

    return stickman;
  }

  /** render stickman and its sticks
   */
  render() {
    this.update();
    let html = "";
    html += `
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
    `;

    if (!animator.isAnimationPlaying) {
      html += `
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
    return html;
  }
}
