import SoundFactory from "./sound";

export default class PatternController {
  constructor(options) {
    this.stage = options.stage;
    this.sound = new SoundFactory({ soundId: options.sound, type: options.type });
    this.beat = {};
    this.index = options.index;
  }

  displayPattern(yPos) {
    let begin = 200;
    for (let i = 0; i < 8; i++) {
      this.beat[i] = new createjs.Shape();
      this.beat[i].begin = begin;

      this.beat[i].graphics.beginFill("#000").drawCircle(this.beat[i].begin, 0, 15);

      this.beat[i].read = false;

      this.beat[i].addEventListener("click", (evt) => {
        this.toggleRead(this.beat[i]);
        this.stage.update();
      });

      if (this.beat[i].read) {
        this.beat[i].graphics.beginFill("yellow").drawCircle(this.beat[i].begin, 0, 10);
      } else {
        this.beat[i].graphics.beginFill("#404040").drawCircle(this.beat[i].begin, 0, 10);
      }

      this.beat[i].y = yPos;
      begin += 100;
      this.stage.addChild(this.beat[i]);
    }
    this.stage.update();
  }

  displayBeats(time = -1) {
    for (let i = 0; i < 8; i++) {

      if (this.beat[i].read) {
        this.beat[i].graphics.beginFill("yellow").drawCircle(this.beat[i].begin, 0, 10);
      } else {
        this.beat[i].graphics.beginFill("#404040").drawCircle(this.beat[i].begin, 0, 10);
      }

      if (time == i) {
        this.beat[i].graphics.beginFill("red").drawCircle(this.beat[i].begin, 0, 10);
      }
      this.stage.addChild(this.beat[i]);
    }
    this.stage.update();
  }

  toggleRead(shape) {
    if (shape.read) {
      shape.read = false;
      shape.graphics.beginFill("#404040").drawCircle(shape.begin, 0, 10);
    } else {
      shape.read = true;
      shape.graphics.beginFill("yellow").drawCircle(shape.begin, 0, 10);
    }
    return this.stage.update();
  }

}