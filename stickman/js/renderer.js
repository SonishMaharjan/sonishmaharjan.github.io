/** render active frame in DOM'S svg node*/
function renderSvg() {
  let html = "";
  frameManager.activeFrame.stickManList.forEach((stickMan) => {
    html += stickMan.render();
  });

  svg.innerHTML = html;
  requestAnimationFrame(render);
}

let svg = document.getElementById("svg");

renderSvg();
