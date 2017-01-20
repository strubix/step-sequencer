export default class Text extends createjs.Text {
  constructor(options) {
    super();

    this.space = options.space;
    //this.stage = options.stage;
  }

  display() {
    this.graphics.beginFill("#000").drawRect(0, this.space, 1000, 30);
    //this.stage.addChild();
  }
}