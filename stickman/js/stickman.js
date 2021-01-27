const LINE_LENGTH = 75;

class Head {
  constructor(x, y, radius, angle, originX, originY, color = "#000", id) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angle = angle;
    this.originX = originX || x;
    this.originY = originY || y;
    this.endX = this.getEndX();
    this.endY = this.getEndY();
    this.id = id;

    this.color = color;

    this.stickStyle = `stroke:${this.color};stroke-width:15;

    `;
  }

  getEndX() {
    return this.originX + Math.cos(degToRad(this.angle)) * this.radius;
  }

  getEndY() {
    return this.originY + Math.sin(degToRad(this.angle)) * this.radius;
  }

  render() {
    return `<circle
  cx="${this.endX}"
  cy="${this.endY}"
  r="${this.radius}"
  fill="black"
/>;`;
  }
}

class Stick {
  constructor(x, y, length, angle, originX, originY, color = "#000") {
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = angle;
    this.originX = originX;
    this.originY = originY;
    this.endX = this.getEndX();
    this.endY = this.getEndY();
    this.color = color;

    this.stickStyle = `stroke:${this.color};stroke-width:15; `;

    this.draggerRadius = 7;
  }

  getEndX() {
    return this.x + Math.cos(degToRad(this.angle)) * this.length;
  }

  getEndY() {
    return this.y + Math.sin(degToRad(this.angle)) * this.length;
  }

  render() {
    return `<line x1="${this.x}" y1="${this.y}" x2="${this.endX}" y2="${this.endY}"  stroke-linecap="round"   style="${this.stickStyle}" />
    <!-- b1 --> <circle cx="${this.endX}" cy="${this.endY}" r="${this.draggerRadius}" fill="red" class="draggable" id="b1" />
    
    `;
  }
}

class StickMan {
  constructor(posX, posY, color, svg) {
    this.posX = posX;
    this.posY = posY;
    this.svg = svg;
    this.color = color;

    this.createStickMan();
  }

  createStickMan() {
    this.body = new Stick(this.posX, this.posY, 1.5 * LINE_LENGTH, 90, 0, 0);

    this.head = new Head(this.body.x, this.body.y, 30, 270, 0, 0);

    this.leftArm = new Stick(this.posX, this.posY, LINE_LENGTH, 200, 0, 0);
    this.leftHand = new Stick(
      this.leftArm.endX,
      this.leftArm.endY,
      LINE_LENGTH,
      60,
      0,
      0
    );
  }

  render() {
    this.svg.innerHTML = `
    <!-- Head -->
    

    ${this.leftHand.render()}

    ${this.leftArm.render()}
  
    
    <!-- Body -->
    ${this.body.render()}
 
    `;

    // ${this.head.render()}
  }
}

let svg = document.getElementById("svg");

let stickMan = new StickMan(250, 250, "#000", svg, "stick-0");

let stickManager = {
  "stick-0": stickMan,
};

stickMan.render();

function enableDragging(evt) {
  var svg = evt.target;
  svg.addEventListener("mousedown", startDrag);
  svg.addEventListener("mousemove", drag);
  svg.addEventListener("mouseup", endDrag);
  svg.addEventListener("mouseleave", endDrag);
  var activeCp = false;
  function startDrag(e) {
    // console.log(this);
    if (e.target.classList.contains("draggable")) console.log("hahah");
  }
  function drag(e) {
    if (activeCp && mode === 0) {
      e.preventDefault();
      sm[activeCp.getAttributeNS(null, "id")] = {
        x: e.clientX,
        y: e.clientY,
      };
    }
  }
  function endDrag(e) {
    activeCp = null;
    // savedFrames.push(JSON.parse(JSON.stringify(sm)));
  }
}
