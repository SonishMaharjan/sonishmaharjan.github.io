/** Class representing a stick - body part of stickman*/
class Stick {
  /** Create a stick.
   * @param {number} x - The x position.
   * @param {number} y - The y position.
   * @param {number} length - The length of a stick.
   * @param {string} stickName - The unique name each stick(body part) of a stick man.
   * @param {string} stickManId - The unique id of stick man of which this stick is a part.
   * @param {number} parentAngle - The angle/orientation of the stick man.
   * @param {string} [color="#000"]- The color hexcode or color name of stick man.
   */
  constructor(x, y, length, angle, stickName, stickManId, parentAngle, color) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.length = length;
    this.stickName = stickName;
    this.stickManId = stickManId;
    this.parentAngle = parentAngle;
    this.color = color || "#000";

    //end position of a stick
    this.endX = this.getEndX(angle);
    this.endY = this.getEndY(angle);

    //offset of stick angle with respect to parent angle
    this.offsetAngle = this.angle - this.parentAngle;

    this.stickStyle = `stroke:${this.color};stroke-width:${STICK_WIDTH};`;

    this.draggerRadius = DRAGGER_RADIUS;
  }

  /** Translate the stick position
   * @param {object} position -  Position object with x and y value.
   */
  translate(position) {
    this.x = position.x;
    this.y = position.y;

    this.endX = this.getEndX(this.angle);
    this.endY = this.getEndY(this.angle);
  }

  /**Rotate the stick with given angle
   * @param {number} angle - rotate angle.
   */
  rotate(angle) {
    this.angle = angle;
    this.endX = this.getEndX(angle);
    this.endY = this.getEndY(angle);
  }

  /** calculate the endX position of stick after rotation of given angle
   * @param {number} angle -  angle of rotation.
   */
  getEndX(angle) {
    return this.x + Math.cos(degToRad(angle)) * this.length;
  }

  /** calculate the endY position of stick after rotation of given angle
   * @param {number} angle -  angle of rotation.
   */
  getEndY(angle) {
    return this.y + Math.sin(degToRad(angle)) * this.length;
  }

  /** calculate the angle of stick with respect to angle of stickman
   * @param {number} parentAngle - stickman angle.
   */
  updateOffsetAngle(parentAngle) {
    this.offsetAngle = this.angle - parentAngle;
  }

  /** clone stick object to new object(with out reference) and return new object
   */
  clone() {
    let clonedStick = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );
    return clonedStick;
  }

  /** render stick
   */
  render() {
    return `<line x1="${this.x}" y1="${this.y}" x2="${this.endX}" y2="${this.endY}"
      stroke-linecap="round"   style="${this.stickStyle}" /> 
      `;
  }

  /** render control/dragger points
   */
  renderDragger() {
    return `<circle cx="${this.endX}" cy="${this.endY}" r="${this.draggerRadius}"
    data-stickman-id=${this.stickManId}
    data-stick-name=${this.stickName}
    fill="red" class="draggable" stroke="black"  />`;
  }
}
