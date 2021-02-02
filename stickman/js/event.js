function enableDragging(animatorSvg) {
  var animatorSvg = animatorSvg;
  animatorSvg.addEventListener("mousedown", startDrag);
  animatorSvg.addEventListener("mousemove", drag);
  animatorSvg.addEventListener("mouseup", endDrag);
  animatorSvg.addEventListener("mouseleave", endDrag);
  let activeCp = false;
  function startDrag(e) {
    // console.log();
    if (e.target.classList.contains("draggable")) activeCp = e.target;
  }
  function drag(e) {
    // console.log("ahah");

    // console.log(activeCp);
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

      // let offsetX = e.offsetX === undefined ? e.layerX : e.offsetX;
      // let offsetY = e.offsetY === undefined ? e.layerY : e.offsetY;

      let offsetX = e.clientX - e.currentTarget.getBoundingClientRect().left;
      let offsetY = e.clientY - e.currentTarget.getBoundingClientRect().top;

      // console.log(offsetX);

      if (stickObject) {
        let tanx = null;
        let tany = null;
        let isUpperBodyDragger = false;
        if (activeCp.getAttributeNS(null, "data-dragger-position")) {
          // console.log("toper");
          tanx = offsetX - stickObject.endX;
          tany = offsetY - stickObject.endY;

          isUpperBodyDragger = true;
        } else {
          // console.log("bottom");
          tanx = offsetX - stickObject.x;
          tany = offsetY - stickObject.y;
        }

        let rad = Math.atan2(tany, tanx);
        let deg = radToDeg(rad);
        let final = deg;

        if (tany < 0) {
          final = 360 + deg;
        }

        stickObject.rotate(final, isUpperBodyDragger);
      }

      if (dataTransform === "rotation") {
        let tanx = offsetX - stickManObject.posX;
        let tany = offsetY - stickManObject.posY;

        let rad = Math.atan2(tany, tanx);
        let deg = radToDeg(rad);
        let final = deg;

        if (tany < 0) {
          final = 360 + deg;
        }

        stickManObject.rotate(final);
      }

      if (stickManId && dataTransform === "translate") {
        let position = { x: offsetX, y: offsetY };
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

      frameManager.activeFrame.updateThumbNail();
      frameManager.render();
    }
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

window.addEventListener("load", () => {
  let svgBox = document.getElementById("svg");
  enableDragging(svgBox);
  // console.log(svgBox);
  // svgBox.addEventListener("mouseover", enableDragging);
});
