let animator = {
  interval: 500,
  isLoop: false,
  timer: null,

  play() {
    // console.log(frameManager);
    // debugger;
    let cursor = 0;
    timer = setInterval(() => {
      console.log(frameManager.framesList[0]);
      frameManager.switchFrame(frameManager.framesList[cursor].id);

      if (cursor === frameManager.framesList.length - 1) {
        // console.log("hahah eorroro");
        if (this.isLoop) {
          cursor = 0;
        } else {
          clearInterval(timer);
        }
      }

      cursor++;
    }, this.interval);
  },
  stop() {},
};
