import SoundFactory from "./sound";

export default class PatternController {
  constructor(options) {
    this.stage = options.stage;
    this.sound = new SoundFactory({ soundId: 'kick', type: 'hardcore' });
    this.beat = {};
    this.displayLine();
    this.displayPattern();
  }

  displayLine() {
    let line = new createjs.Shape();
    line.graphics.beginFill("#000").drawRect(0, 30, 1000, 10);
    this.stage.addChild(line);
  }

  displayPattern(){
    let begin = 100;
    for (let i = 0; i < 9; i++) {
      this.beat[i] = new createjs.Shape();
      this.beat[i].begin = begin;

      this.beat[i].graphics.beginFill("#000").drawCircle(this.beat[i].begin, 35, 15);

      this.beat[i].read = false;

      this.beat[i].addEventListener("click", (evt) => {
        this.toggleRead(this.beat[i]);
        this.stage.update();
      });

      if (this.beat[i].read) {
        this.beat[i].graphics.beginFill("yellow").drawCircle(this.beat[i].begin, 35, 10);
      } else {
        this.beat[i].graphics.beginFill("blue").drawCircle(this.beat[i].begin, 35, 10);
      }

      begin += 100;
      this.stage.addChild(this.beat[i]);
    }
    this.stage.update();
  }

  displayBeats(time = -1) {
    for (let i = 0; i < 9; i++) {

      if (this.beat[i].read) {
        this.beat[i].graphics.beginFill("yellow").drawCircle(this.beat[i].begin, 35, 10);
      } else {
        this.beat[i].graphics.beginFill("blue").drawCircle(this.beat[i].begin, 35, 10);
      }

      if (time == i) {
        this.beat[i].graphics.beginFill("red").drawCircle(this.beat[i].begin, 35, 10);
      }
      this.stage.addChild(this.beat[i]);
    }
    this.stage.update();
  }

  toggleRead(shape) {
    if (shape.read) {
      shape.read = false;
      shape.graphics.beginFill("blue").drawCircle(shape.begin, 35, 10);
    } else {
      shape.read = true;
      shape.graphics.beginFill("yellow").drawCircle(shape.begin, 35, 10);
    }
    return this.stage.update();
  }

}