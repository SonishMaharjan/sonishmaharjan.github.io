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

    this.stickStyle = `stroke:${this.color};stroke-width:15; `;

    this.draggerRadius = 7;
  }

  translate(position) {
    this.x = position.x;
    this.y = position.y;

    this.endX = this.getEndX(this.angle);
    this.endY = this.getEndY(this.angle);
  }

  rotate(angle) {
    this.angle = angle;
    this.endX = this.getEndX(angle);
    this.endY = this.getEndY(angle);

    // alert("ahelo");
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

  render() {
    return `<line x1="${this.x}" y1="${this.y}" x2="${this.endX}" y2="${this.endY}"
      stroke-linecap="round"   style="${this.stickStyle}" />
     
      `;
  }

  clone() {
    let clonedStick = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );

    return clonedStick;
  }

  renderDragger() {
    return `<circle cx="${this.endX}" cy="${this.endY}" r="${this.draggerRadius}"
    data-stickman-id=${this.stickManId}
    data-stick-name=${this.stickName}

    fill="red" class="draggable"  />`;
  }
}
