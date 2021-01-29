class Frame {
  constructor(id) {
    this.stickManList = [];
    this.id = id;
    this.addStickMan(true);
  }

  addStickMan(isNew = false) {
    if (isNew) {
      this.stickManList.push(
        new StickMan(250, 250, "#000", svg, "stick-" + generateRandomCode(5))
      );
    } else {
      this.stickManList = JSON.parse.JSON.stringify(
        frameManager.activeFrame.stickManList
      );
    }
  }
}
