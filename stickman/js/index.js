// let svg = document.getElementById("svg");

// let stickMan = new StickMan(250, 250, "#000", svg, "stick-0");

// let stickManManager = {
//   "stick-0": stickMan,
// };

// stickMan.render();

let frameManager = {
  framesList: [],
  activeFrame: null,

  addFrame() {
    this.framesList.push(new Frame("frame-" + this.framesList.length));
    this.activeFrame = this.framesList[this.framesList.length - 1];
  },
};

function render() {
  let html = "";
  frameManager.activeFrame.stickManList.forEach((stickMan) => {
    html += stickMan.render();
  });

  svg.innerHTML = html;

  requestAnimationFrame(render);
}

let svg = document.getElementById("svg");

frameManager.addFrame();
render();
