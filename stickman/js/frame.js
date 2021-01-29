class Frame {
  constructor(id) {
    this.stickManList = [];
    this.id = id;
    this.addStickMan();
  }

  addStickMan() {
    this.stickManList.push(
      new StickMan(250, 250, "#000", svg, "stick-" + this.stickManList.length)
    );
  }
}
