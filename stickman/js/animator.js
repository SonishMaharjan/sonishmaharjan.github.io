let animator = {
  interval: 500,
  isLoop: false,
  timer: null,
  isAnimationPlayng: false,

  play() {
    // console.log(frameManager);
    // debugger;
    let cursor = 0;
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      // console.log(frameManager.framesList[0]);
      frameManager.switchFrame(frameManager.framesList[cursor].id);
      this.isAnimationPlayng = true;

      if (cursor === frameManager.framesList.length - 1) {
        // console.log("hahah eorroro");
        if (this.isLoop) {
          cursor = 0;
        } else {
          this.stop();
          this.is;
        }
      }

      cursor++;
    }, this.interval);
  },
  stop() {
    this.isAnimationPlayng = false;
    clearInterval(this.timer);
  },
};
