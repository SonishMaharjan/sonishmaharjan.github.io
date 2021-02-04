/** Class representing a frame*/
class Frame {
  /** Create a stickman.
   * @param {string} id - The unique frame id.
   */
  constructor(id) {
    this.stickManList = [];
    this.id = id;

    this.addStickMan(frameManager.framesList.length === 0);

    /**  shows initial frame thumbnail in frame list */
    let html = "";
    this.stickManList.forEach((stickMan) => {
      html += stickMan.render();
    });
    let svg = document.getElementById("svg");
    svg.innerHTML = html;

    this.updateThumbNail();
  }

  /** Update frames thumbnails
   */
  updateThumbNail() {
    let svgImage = new XMLSerializer().serializeToString(
      document.getElementById("svg")
    );
    this.thumbNail = window.btoa(svgImage);
  }

  /** create stickman and add into frames
   * @param {boolean} [isNew=false] - boolean for checking if the frame is first frame
   */
  addStickMan(isNew = false) {
    if (isNew) {
      this.stickManList.push(
        new StickMan(250, 250, "#000", svg, "stick-" + generateRandomCode(5)),
        new StickMan(600, 250, "#000", svg, "stick-" + generateRandomCode(5))
      );
    } else {
      frameManager.activeFrame.stickManList.forEach((stickMan) => {
        let clonedStickMan = stickMan.clone();
        this.stickManList.push(clonedStickMan);
      });
    }
  }
}
