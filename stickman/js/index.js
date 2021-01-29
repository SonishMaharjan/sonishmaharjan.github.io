let frameManager = {
  framesList: [],
  activeFrame: null,

  addFrame() {
    this.framesList.push(new Frame("frame-" + this.framesList.length));
    this.activeFrame = this.framesList[this.framesList.length - 1];
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
