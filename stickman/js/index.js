let frameManager = {
  framesList: [],
  activeFrame: null,

  addFrame() {
    if (this.activeFrame) {
      let activeFrameIndex = this.framesList.findIndex(
        (frame) => frame.id === this.activeFrame.id
      );

      // console.log("hahah");
      let startArray = this.framesList.slice(0, activeFrameIndex + 1);
      let endArray = this.framesList.slice(
        activeFrameIndex + 1,
        this.framesList.length
      );

      startArray.push(new Frame("frame-" + this.framesList.length));

      this.framesList = startArray.concat(endArray);

      this.activeFrame = this.framesList[activeFrameIndex + 1];
    } else {
      this.framesList.push(new Frame("frame-" + this.framesList.length));
      this.activeFrame = this.framesList[this.framesList.length - 1];
    }

    this.render();
  },

  switchFrame(frameId) {
    this.activeFrame = this.framesList.find((frame) => frame.id === frameId);
    this.render();
  },

  render() {
    let frameList = document.getElementById("frame-list-id");
    let html = "";
    this.framesList.forEach((frame) => {
      html += `<div class="frame-list-item ${
        frame.id === this.activeFrame.id ? "--active" : ""
      }"
      data-id=${frame.id}
      > 
      ${frame.id}
      </div>`;
    });

    frameList.innerHTML = html;
    applyFrameEventHandlers();
  },
};

frameManager.addFrame();
