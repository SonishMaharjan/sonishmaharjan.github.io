/** render active frame in DOM'S svg node*/
function renderSvg() {
  let html = "";
  frameManager.activeFrame.stickManList.forEach((stickMan) => {
    html += stickMan.render();
  });

  svg.innerHTML = html;
  requestAnimationFrame(renderSvg);
}

let svg = document.getElementById("svg");

renderSvg();
