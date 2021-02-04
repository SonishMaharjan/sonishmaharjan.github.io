/** object that animates the stick man by switching the frames
 */
let animator = {
  isLoop: false,
  timer: null,
  isAnimationPlaying: false,
  fps: DEFAULT_FPS,

  play(isLoop, fps) {
    let cursor = 0;

    this.isLoop = isLoop;
    this.fps = fps;

    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.isAnimationPlaying = true;

      if (cursor > frameManager.framesList.length - 1) {
        if (this.isLoop) {
          cursor = -1;
        } else {
          this.stop();
        }
      } else {
        frameManager.switchFrame(frameManager.framesList[cursor].id);
      }

      cursor++;
    }, 1000 / this.fps);
  },
  stop() {
    let addFrameBtn = document.getElementById("btn-add-frame-id");
    let deleteFramtBtn = document.getElementById("btn-delete-frame-id");

    addFrameBtn.disabled = false;
    deleteFramtBtn.disabled = false;
    this.isAnimationPlaying = false;

    clearInterval(this.timer);
  },
};
