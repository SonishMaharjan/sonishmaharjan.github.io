/** Class representing a main body of stick man. Inherits the Stick Class
 * This is stick with two point of rotation in each end.
 */
class StickBody extends Stick {
  /** calls parent's constructor
   */
  constructor(x, y, length, angle, stickName, stickManId, parentAngle, color) {
    super(x, y, length, angle, stickName, stickManId, parentAngle, color);

    //mid points of the stick
    this.midX = this.getMidX(angle);
    this.midY = this.getMidY(angle);
  }

  /** calculates the start point X of stick when rotated by the given angle
   * @param {number} angle - The angle in degree
   */
  getStartX(angle) {
    return this.endX + Math.cos(degToRad(angle)) * this.length;
  }

  /** calculates the start point Y of stick when rotated by the given angle
   * @param {number} angle - The angle in degree
   */
  getStartY(angle) {
    return this.endY + Math.sin(degToRad(angle)) * this.length;
  }

  /** calculates the mid point X of stick when rotated by the given angle
   * @param {number} angle - The angle in degree
   */
  getMidX(angle) {
    return this.x + (Math.cos(degToRad(angle)) * this.length) / 2;
  }

  /** calculates the mid point Y of stick when rotated by the given angle
   * @param {number} angle - The angle in degree
   */
  getMidY(angle) {
    return this.y + (Math.sin(degToRad(angle)) * this.length) / 2;
  }

  /** Translate the body stick position
   * @param {object} position -  position(co-ordinate) object with x and y value.
   */
  translate(position) {
    this.x = position.x - (Math.cos(degToRad(this.angle)) * this.length) / 2;
    this.y = position.y - (Math.sin(degToRad(this.angle)) * this.length) / 2;

    this.endX = this.getEndX(this.angle);
    this.endY = this.getEndY(this.angle);

    this.midX = this.getMidX(this.angle);
    this.midY = this.getMidY(this.angle);
  }

  /** Rotate the stick body with given angle
   * @param {number} angle - rotation angle in degree.
   * @param {boolean} [isUpperBodyDragger=false] - boolean value to indentify the point of rotation(either start position or end position ) .
   */
  rotate(angle, isUpperBodyDragger = false) {
    if (!isUpperBodyDragger) {
      /*
       * origin of rotation is (x,y)
       */
      this.endX = this.getEndX(angle);
      this.endY = this.getEndY(angle);
      this.midX = this.getMidX(angle);
      this.midY = this.getMidY(angle);

      this.angle = angle;
    } else {
      /*
       * origin of rotation is (endX,endY)
       */
      this.x = this.getStartX(angle);
      this.y = this.getStartY(angle);
      this.midX = this.endX + (Math.cos(degToRad(angle)) * this.length) / 2;
      this.midY = this.endY + (Math.sin(degToRad(angle)) * this.length) / 2;

      this.angle = 180 + angle;
    }
  }

  /** Override Stick's renderDragger function
   * Renders two dragger point in stick body
   */
  renderDragger() {
    return `
    <circle cx="${this.x}" cy="${this.y}" r="${this.draggerRadius}"
    data-stickman-id=${this.stickManId}
    data-stick-name=${this.stickName}
    data-dragger-position="top-body"
    fill="red" class="draggable"  />
    
    <circle cx="${this.endX}" cy="${this.endY}" r="${this.draggerRadius}"
    data-stickman-id=${this.stickManId}
    data-stick-name=${this.stickName}
    fill="red" class="draggable"  />
    `;
  }
}
