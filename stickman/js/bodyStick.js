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
    // return this.endX + (Math.cos(degToRad(angle)) * this.length) / 2;
  }

  getMidY(angle) {
    return this.y + (Math.sin(degToRad(angle)) * this.length) / 2;
    // return this.endY + (Math.sin(degToRad(angle)) * this.length) / 2;
  }

  getStartX(angle) {
    return this.endX + Math.cos(degToRad(angle)) * this.length;
  }

  getStartY(angle) {
    return this.endY + Math.sin(degToRad(angle)) * this.length;
  }

  translate(position) {
    this.x = position.x - (Math.cos(degToRad(this.angle)) * this.length) / 2;
    this.y = position.y - (Math.sin(degToRad(this.angle)) * this.length) / 2;

    this.endX = this.getEndX(this.angle);
    this.endY = this.getEndY(this.angle);

    this.midX = this.getMidX(this.angle);
    this.midY = this.getMidY(this.angle);
  }

  rotate(angle, isUpperBodyDragger = false) {
    // *** bottom woriking

    if (!isUpperBodyDragger) {
      this.endX = this.getEndX(angle);
      this.endY = this.getEndY(angle);
      this.midX = this.getMidX(angle);
      this.midY = this.getMidY(angle);

      this.angle = angle;
    } else {
      this.x = this.getStartX(angle);
      this.y = this.getStartY(angle);
      this.midX = this.endX + (Math.cos(degToRad(angle)) * this.length) / 2;
      this.midY = this.endY + (Math.sin(degToRad(angle)) * this.length) / 2;

      this.angle = 180 + angle;
    }
  }

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
