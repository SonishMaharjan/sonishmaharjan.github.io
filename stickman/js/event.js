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
    console.log("hahahah");
    if (activeCp) {
      e.preventDefault();

      let stickManId = activeCp.getAttributeNS(null, "data-stickman-id");
      let stickName = activeCp.getAttributeNS(null, "data-stick-name");
      let dataTransform = activeCp.getAttributeNS(null, "data-transform");

      // console.log(dataTransform);

      if (stickManId && stickName) {
        let stickObject = stickManManager[stickManId][stickName];

        let tanx = e.offsetX - stickObject.x;
        let tany = e.offsetY - stickObject.y;

        let rad = Math.atan2(tany, tanx);
        let deg = radToDeg(rad);
        let final = deg;

        if (tany < 0) {
          final = 360 + deg;
        }

        stickObject.rotate(final);

        stickMan.render();
      }

      if (stickManId && dataTransform === "rotation") {
        // console.log("hahah");

        // console.log(stickManId);
        let stickManObject = stickManManager[stickManId];

        let tanx = e.offsetX - stickManObject.posX;
        let tany = e.offsetY - stickManObject.posY;

        let rad = Math.atan2(tany, tanx);
        let deg = radToDeg(rad);
        let final = deg;

        if (tany < 0) {
          final = 360 + deg;
        }

        stickManObject.rotate(final);

        stickManObject.render();
      }

      if (stickManId && dataTransform === "translate") {
        console.log("thang");

        // console.log(stickManId);
        let stickManObject = stickManManager[stickManId];

        let position = { x: e.offsetX, y: e.offsetY };

        // let tanx = e.offsetX - stickManObject.posX;
        // let tany = e.offsetY - stickManObject.posY;

        // let rad = Math.atan2(tany, tanx);
        // let deg = radToDeg(rad);
        // let final = deg;

        // if (tany < 0) {
        //   final = 360 + deg;
        // }

        stickManObject.translate(position);

        stickManObject.render();
      }
    }
  }
  function endDrag(e) {
    if (activeCp) {
      let stickManId = activeCp.getAttributeNS(null, "data-stickman-id");
      let stickName = activeCp.getAttributeNS(null, "data-stick-name");
      // let dataTransform = activeCp.getAttributeNS(null, "data-transform");

      // console.log(dataTransform);

      if (stickManId && stickName) {
        let stickObject = stickManManager[stickManId][stickName];
        let stickManObject = stickManManager[stickManId];
        console.log(stickObject);
        stickObject.updateOffsetAngle(stickManObject.draggerAngle);
      }

      activeCp = null;
    }
    // savedFrames.push(JSON.parse(JSON.stringify(sm)));
  }
}

// console.log(svg);
window.addEventListener("load", enableDragging);
