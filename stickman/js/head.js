/** Class representing a Head of stick man. Inherits the Stick Class
 * This is the circle version of stick object
 */
class Head extends Stick {
  /** calls parent's constructor
   * head uses length as the radius of the circle
   */
  constructor(x, y, length, angle, stickName, stickManId, parentAngle, color) {
    super(x, y, length, angle, stickName, stickManId, parentAngle, color);
  }

  /** Override Stick render function
   * render circle instead of stick
   */
  render() {
    return `<circle
        cx="${this.endX}"
        cy="${this.endY}"
        r="${this.length}"
        fill="${this.color}"
      />
      `;
  }

  /** Override Stick renderDragger function
   */
  renderDragger() {
    return `<circle cx="${this.endX}" cy="${this.endY}" r="${this.draggerRadius}"
    data-stickman-id=${this.stickManId}
    data-stick-name=${this.stickName}
    stroke="#000"
    fill="red" class="draggable"  />`;
  }
}
