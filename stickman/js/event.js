function enableDragging(evt) {
  var svg = evt.target;
  svg.addEventListener("mousedown", startDrag);
  svg.addEventListener("mousemove", drag);
  svg.addEventListener("mouseup", endDrag);
  svg.addEventListener("mouseleave", endDrag);
  let activeCp = false;
  function startDrag(e) {
    if (e.target.classList.contains("draggable")) activeCp = e.target;
  }
  function drag(e) {
    if (activeCp) {
      e.preventDefault();

      let stickManId = activeCp.getAttributeNS(null, "data-stickman-id");
      let stickName = activeCp.getAttributeNS(null, "data-stick-name");
      let dataTransform = activeCp.getAttributeNS(null, "data-transform");

      var stickManObject = frameManager.activeFrame.stickManList.find(
        (stickMan) => {
          return stickMan.id == stickManId;
        }
      );

      var stickObject = stickManObject[stickName];
      //   if (!stickObject) return;

      if (stickObject) {
        let tanx = e.offsetX - stickObject.x;
        let tany = e.offsetY - stickObject.y;

        let rad = Math.atan2(tany, tanx);
        let deg = radToDeg(rad);
        let final = deg;

        if (tany < 0) {
          final = 360 + deg;
        }

        stickObject.rotate(final);
      }

      if (dataTransform === "rotation") {
        let tanx = e.offsetX - stickManObject.posX;
        let tany = e.offsetY - stickManObject.posY;

        let rad = Math.atan2(tany, tanx);
        let deg = radToDeg(rad);
        let final = deg;

        if (tany < 0) {
          final = 360 + deg;
        }

        stickManObject.rotate(final);
      }

      if (stickManId && dataTransform === "translate") {
        let position = { x: e.offsetX, y: e.offsetY };
        stickManObject.translate(position);
      }
    }
  }
  function endDrag(e) {
    if (activeCp) {
      let stickManId = activeCp.getAttributeNS(null, "data-stickman-id");
      let stickName = activeCp.getAttributeNS(null, "data-stick-name");

      var stickManObject = frameManager.activeFrame.stickManList.find(
        (stickMan) => {
          return stickMan.id == stickManId;
        }
      );

      var stickObject = stickManObject[stickName];
      if (stickObject) {
        stickObject.updateOffsetAngle(stickManObject.draggerAngle);
      }
      activeCp = null;
    }
    // savedFrames.push(JSON.parse(JSON.stringify(sm)));
  }
}

document.getElementById("btn-add-frame").addEventListener("click", () => {
  frameManager.addFrame();
});

function applyFrameEventHandlers() {
  let frameList = document.querySelectorAll(".frame-list-item");

  frameList.forEach((frameListItem) => {
    let frameId = frameListItem.getAttribute("data-id");
    frameListItem.addEventListener("click", () => {
      console.log("here");
      frameManager.switchFrame(frameId);
    });
  });

  console.log(frameList);
}

let playBtn = document.getElementById("btn-play");
playBtn.addEventListener("click", () => {
  animator.play();
});

window.addEventListener("load", enableDragging);
