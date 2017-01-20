export default class Line extends createjs.Shape {
  constructor(options) {
    super();
    this.space = options.space;
  }

  display() {
    this.graphics.beginFill("#000").drawRect(0, this.space, 1000, 30);
  }
}