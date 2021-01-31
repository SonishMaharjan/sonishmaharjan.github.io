let frameManager = {
  framesList: [],
  activeFrame: null,

  addFrame() {
    if (this.activeFrame) {
      let activeFrameIndex = this.framesList.findIndex(
        (frame) => frame.id === this.activeFrame.id
      );

      // console.log(activeFrameIndex  );
      let startArray = this.framesList.slice(0, activeFrameIndex + 1);

      console.log(startArray);
      let endArray = this.framesList.slice(
        activeFrameIndex + 1,
        this.framesList.length
      );

      console.log(endArray);

      startArray.push(new Frame("frame-" + generateRandomCode(5)));
      this.framesList = startArray.concat(endArray);
      this.activeFrame = this.framesList[activeFrameIndex + 1];
    } else {
      this.framesList.push(new Frame("frame-" + generateRandomCode(5)));
      this.activeFrame = this.framesList[0];
    }

    // this.framesList.push(new Frame("frame-" + generateRandomCode(5)));
    // this.activeFrame = this.framesList[0];

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
      // console.log(frame.thumbNail);

      html += `<div class="frame-list-item ${
        frame.id === this.activeFrame.id ? "--active" : ""
      }"
      data-id=${frame.id}
      > 
      <img src="data:image/svg+xml;base64,${
        frame.thumbNail
      }" class="frame-image"/>
      ${frame.id}
      </div>`;
    });

    frameList.innerHTML = html;
    applyFrameEventHandlers();
  },
};

frameManager.addFrame();
