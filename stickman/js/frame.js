class Frame {
  constructor(id) {
    this.stickManList = [];
    this.id = id;
    this.addStickMan(frameManager.framesList.length === 0);
  }

  addStickMan(isNew = false) {
    if (isNew) {
      this.stickManList.push(
        new StickMan(250, 250, "#000", svg, "stick-" + generateRandomCode(5))
      );
    } else {
      frameManager.activeFrame.stickManList.forEach((stickMan) => {
        let clonedStickMan = stickMan.clone();
        this.stickManList.push(clonedStickMan);
      });
    }
  }
}
