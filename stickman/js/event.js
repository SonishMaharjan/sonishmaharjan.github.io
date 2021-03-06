/** initailizes all the event handlers */

/** add eventhanler in dragger points */
function enableDragging(animatorSvg) {
  let animatorSvgFrame = animatorSvg;
  animatorSvgFrame.addEventListener("mousedown", startDrag);
  animatorSvgFrame.addEventListener("mousemove", drag);
  animatorSvgFrame.addEventListener("mouseup", endDrag);
  animatorSvgFrame.addEventListener("mouseleave", endDrag);
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

      let stickManObject = frameManager.activeFrame.stickManList.find(
        (stickMan) => {
          return stickMan.id == stickManId;
        }
      );

      let stickObject = stickManObject[stickName];

      let offsetX = e.clientX - e.currentTarget.getBoundingClientRect().left;
      let offsetY = e.clientY - e.currentTarget.getBoundingClientRect().top;

      if (stickObject) {
        let tanx = null;
        let tany = null;
        let isUpperBodyDragger = false;
        if (activeCp.getAttributeNS(null, "data-dragger-position")) {
          tanx = offsetX - stickObject.endX;
          tany = offsetY - stickObject.endY;

          isUpperBodyDragger = true;
        } else {
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

      let stickManObject = frameManager.activeFrame.stickManList.find(
        (stickMan) => {
          return stickMan.id == stickManId;
        }
      );

      let stickObject = stickManObject[stickName];
      if (stickObject) {
        stickObject.updateOffsetAngle(stickManObject.draggerAngle);
      }
      activeCp = null;

      frameManager.activeFrame.updateThumbNail();
      frameManager.render();
    }
  }
}

/** add events to thumbnail frames */
function applyFrameEventHandlers() {
  let frameList = document.querySelectorAll(".frame-list-item");
  frameList.forEach((frameListItem) => {
    let frameId = frameListItem.getAttribute("data-id");
    frameListItem.addEventListener("click", () => {
      if (!animator.isAnimationPlaying) {
        frameManager.switchFrame(frameId);
      }
    });
  });
}

/** makes resizable animator screen */
function applySvgFullScreen() {
  document
    .getElementById("svg")
    .setAttribute(
      "width",
      window.innerWidth -
        2 * document.querySelector(".side-bar").getBoundingClientRect().width
    );

  document
    .getElementById("svg")
    .setAttribute("height", window.innerHeight - 20);
}

window.addEventListener("resize", function () {
  applySvgFullScreen();
});

window.addEventListener("load", () => {
  let svgBox = document.getElementById("svg");
  let stopBtn = document.getElementById("btn-stop-id");
  let playBtn = document.getElementById("btn-play-id");

  enableDragging(svgBox);
  applySvgFullScreen();

  document.getElementById("btn-add-frame-id").addEventListener("click", () => {
    frameManager.addFrame();
  });

  document
    .getElementById("btn-delete-frame-id")
    .addEventListener("click", () => {
      frameManager.deleteFrame();
    });

  playBtn.addEventListener("click", () => {
    let isLoop = document.getElementById("is-loop").checked;
    let fpsEl = document.getElementById("fps");
    let fps = Math.floor(fpsEl.value);
    let addFrameBtn = document.getElementById("btn-add-frame-id");
    let deleteFramtBtn = document.getElementById("btn-delete-frame-id");

    if (fps < 1) {
      alert("Invalid FPS value. FPS value should be equal or greater than 1");
    } else {
      fpsEl.value = fps;
      animator.play(isLoop, fps);
      addFrameBtn.disabled = true;
      deleteFramtBtn.disabled = true;
    }
  });

  stopBtn.addEventListener("click", () => {
    animator.stop();
  });
});
