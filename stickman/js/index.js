// let svg = document.getElementById("svg");

// let stickMan = new StickMan(250, 250, "#000", svg, "stick-0");
// let stickMan_one = new StickMan(400, 150, "#000", svg, "stick-1");

// let stickManManager = {
//   "stick-0": stickMan,
//   "stick-1": stickMan_one,
// };

// svg.innerHTML = stickMan_one.render() + stickMan.render();
let svg = document.getElementById("svg");

let stickMan = new StickMan(250, 250, "#000", svg, "stick-0");

let stickManManager = {
  "stick-0": stickMan,
};

stickMan.render();
