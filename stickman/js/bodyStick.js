class StickBody extends Stick {
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
    super(
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
    );

    this.midX = this.getMidX(angle);
    this.midY = this.getMidY(angle);
  }

  getMidX(angle) {
    return this.x + (Math.cos(degToRad(angle)) * this.length) / 2;
  }

  getMidY(angle) {
    return this.y + (Math.sin(degToRad(angle)) * this.length) / 2;
  }

  translate(position) {
    this.x = position.x - (Math.cos(degToRad(this.angle)) * this.length) / 2;
    this.y = position.y - (Math.sin(degToRad(this.angle)) * this.length) / 2;

    this.endX = this.getEndX(this.angle);
    this.endY = this.getEndY(this.angle);

    this.midX = this.getMidX(this.angle);
    this.midY = this.getMidY(this.angle);
  }

  rotate(angle) {
    this.angle = angle;
    this.endX = this.getEndX(angle);
    this.endY = this.getEndY(angle);

    this.midX = this.getMidX(angle);
    this.midY = this.getMidY(angle);
  }

  renderDragger() {
    return `<circle cx="${this.endX}" cy="${this.endY}" r="${this.draggerRadius}"
    data-stickman-id=${this.stickManId}
    data-stick-name=${this.stickName}

    fill="red" class="draggable"  />
    
    `;
  }
}
