export default class Button {
  constructor(options) {
    this.background = new createjs.Shape();
    this.text = new createjs.Text('+', "20px Arial", "#fff");
    this.space = options.space;
    this.stage = options.stage;

    this.background.addEventListener("mouseover", (event) => {
      event.target.graphics.clear().beginFill("#025aa5").drawRoundRectComplex(60, this.space, 40, 35, 5, 5, 5, 5);
      this.stage.update();
    });
    this.background.addEventListener("mouseout", (event) => {
      event.target.graphics.clear().beginFill("#0275d8").drawRoundRectComplex(60, this.space, 40, 35, 5, 5, 5, 5);
      this.stage.update();
    });
    this.display();
  }

  display() {
    this.background.graphics.clear().beginFill("#0275d8").drawRoundRectComplex(60, this.space, 40, 35, 5, 5, 5, 5);
    this.text.x = 75;
    this.text.y = this.space + 17;
    this.text.textBaseline = "middle";
    this.stage.addChild(this.background);
    this.stage.addChild(this.text);
  }
}