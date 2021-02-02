let animator = {
  isLoop: false,
  timer: null,
  isAnimationPlayng: false,
  fps: 2,

  play(isLoop, fps) {
    // console.log(frameManager);
    // debugger;

    let cursor = 0;

    this.isLoop = isLoop;
    this.fps = fps || 2;

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
          cursor = -1;
        } else {
          this.stop();
          this.is;
        }
      }

      cursor++;
    }, 1000 / this.fps);
  },
  stop() {
    this.isAnimationPlayng = false;
    clearInterval(this.timer);
  },
};
