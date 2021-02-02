// class Head {
//   constructor(x, y, radius, angle, originX, originY, id, color) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.angle = angle;
//     this.originX = originX || x;
//     this.originY = originY || y;
//     this.endX = this.getEndX();
//     this.endY = this.getEndY();
//     this.id = id;

//     this.color = color || "#000";
//     this.draggerRadius = 7;

//     this.stickStyle = `stroke:${this.color};stroke-width:15;
//       `;
//   }

//   getEndX() {
//     return this.originX + Math.cos(degToRad(this.angle)) * this.radius;
//   }

//   getEndY() {
//     return this.originY + Math.sin(degToRad(this.angle)) * this.radius;
//   }

//   roatate(angle) {
//     this.angle = angle;
//   }

//   translate(position) {
//     this.originX = position.x;
//     this.originY = position.y;
//     this.endX = this.getEndX();
//     this.endY = this.getEndY();
//   }

//   clone() {
//     let clonedStick = Object.assign(
//       Object.create(Object.getPrototypeOf(this)),
//       this
//     );

//     return clonedStick;
//   }

//   render() {
//     return `<circle
//     cx="${this.endX}"
//     cy="${this.endY}"
//     r="${this.radius}"
//     fill="black"
//   />

//   `;

//     {
//       /* <circle cx="${this.endX}" cy="${this.endY}" r="${this.draggerRadius}"
//         data-stickman-id=${this.stickManId}
//         data-stick-name=${this.stickName}

//         fill="red" class="draggable"  />
//      */
//     }
//   }
// }

class Head extends Stick {
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
  }

  render() {
    return `<circle
        cx="${this.endX}"
        cy="${this.endY}"
        r="${this.length}"
        fill="black"
      />
    
      `;
  }

  renderDragger() {
    return `<circle cx="${this.endX}" cy="${this.endY}" r="${this.draggerRadius}"
    data-stickman-id=${this.stickManId}
    data-stick-name=${this.stickName}

    fill="red" class="draggable"  />`;
  }
  // render() {
  //   return `<line x1="${this.x}" y1="${this.y}" x2="${this.endX}" y2="${this.endY}"
  //     stroke-linecap="round"   style="${this.stickStyle}" />

  //     `;
  // }
}
