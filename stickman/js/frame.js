class Frame {
  constructor(id) {
    this.stickManList = [];
    this.id = id;
    this.addStickMan(frameManager.framesList.length === 0);
    // render();

    //to show initial frame thumbnail in frame list
    let html = "";
    this.stickManList.forEach((stickMan) => {
      html += stickMan.render();
    });
    let svg = document.getElementById("svg");
    svg.innerHTML = html;

    this.updateThumbNail();
  }

  updateThumbNail() {
    let svgImage = new XMLSerializer().serializeToString(
      document.getElementById("svg")
    );
    this.thumbNail = window.btoa(svgImage);

    // console.log(this.thumbNail);
  }

  addStickMan(isNew = false) {
    if (isNew) {
      this.stickManList.push(
        new StickMan(250, 250, "#000", svg, "stick-" + generateRandomCode(5))

        // new StickMan(80, 250, "#000", svg, "stick-" + generateRandomCode(5))
      );
    } else {
      frameManager.activeFrame.stickManList.forEach((stickMan) => {
        let clonedStickMan = stickMan.clone();
        this.stickManList.push(clonedStickMan);
      });
    }
  }
}
