/** object for managing frames */
let frameManager = {
  framesList: [],
  activeFrame: null,

  /** create new frame and pushes to framesList */
  addFrame() {
    if (this.activeFrame) {
      let activeFrameIndex = this.framesList.findIndex(
        (frame) => frame.id === this.activeFrame.id
      );

      let startArray = this.framesList.slice(0, activeFrameIndex + 1);

      let endArray = this.framesList.slice(
        activeFrameIndex + 1,
        this.framesList.length
      );

      startArray.push(new Frame("frame-" + generateRandomCode(5)));
      this.framesList = startArray.concat(endArray);
      this.activeFrame = this.framesList[activeFrameIndex + 1];
    } else {
      this.framesList.push(new Frame("frame-" + generateRandomCode(5)));
      this.activeFrame = this.framesList[0];
    }

    this.render();
  },

  /** delete frame from framesList */
  deleteFrame() {
    if (this.framesList.length > 1) {
      let activeFrameIndex = this.framesList.findIndex(
        (frame) => frame.id === this.activeFrame.id
      );

      if (this.activeFrame) {
        this.framesList = this.framesList.filter(
          (frame) => frame.id !== this.activeFrame.id
        );

        if (activeFrameIndex === 0) {
          this.activeFrame = this.framesList[0];
        } else {
          this.activeFrame = this.framesList[activeFrameIndex - 1];
        }
        this.render();
      }
    } else {
      alert("Last frame can not be deleted.");
    }
  },

  /** switch the active frame */
  switchFrame(frameId) {
    this.activeFrame = this.framesList.find((frame) => frame.id === frameId);
    this.render();
  },

  /** render frames thumbnails */
  render() {
    let frameList = document.getElementById("frame-list-id");
    let html = "";
    this.framesList.forEach((frame) => {
      html += `<div class="frame-list-item ${
        frame.id === this.activeFrame.id ? "--active" : ""
      }"
        data-id=${frame.id}
        > 
        <img src="data:image/svg+xml;base64,${
          frame.thumbNail
        }" class="frame-image"/>
        </div>`;
    });

    frameList.innerHTML = html;
    applyFrameEventHandlers();
  },
};
