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
