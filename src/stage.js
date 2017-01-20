import Pattern from "./pattern";
import Button from "./shape/button";
import Line from "./shape/line";
import Text from "./shape/text";

export default class StageController {
  constructor(canvasId) {
    this.bpm = 120;
    this.stage = new createjs.Stage(canvasId);
    this.play = false;

    this.patterns = {};

    this.addButton = new Button({ stage: this.stage, space: 20 });
    this.addButton.background.addEventListener("click", (event) => {
      $('#addPattern').modal('show');
      event.target.graphics.clear();
    });

    this.displayLines();

    this.stage.enableMouseOver(10);

    $('#modal-save').on('click', () => {
      let sound = $("#sound").val(),
          type = $("#type").val();

      if (!this.patterns[`${type} ${sound}`]) {
        this.patterns[`${type} ${sound}`] = new Pattern({
          stage: this.stage,
          sound: sound,
          soundId: type + '_' + sound,
          type: type
        });
        $('#modal-close').click();
      }
      this.displayLines();
    });
  }

  displayLines() {
    let space = 20;
    for (let pattern in this.patterns) {
      if (this.patterns.hasOwnProperty(pattern) && this.patterns[pattern] instanceof Pattern) {

        this.patterns[pattern].line = new Line({ space: space });
        this.patterns[pattern].line.display();

        this.patterns[pattern].line.addEventListener("click", (event) => {
          this.toggleMute(event.target);
        });

        this.patterns[pattern].text = new createjs.Text(pattern, "20px Arial", "#fff");
        this.patterns[pattern].text.x = 20;
        this.patterns[pattern].text.y = space + 15;
        this.patterns[pattern].text.textBaseline = "middle";

        this.stage.addChild(this.patterns[pattern].line);
        this.stage.addChild(this.patterns[pattern].text);

        this.patterns[pattern].displayPattern(space + 15);

        space = space + 50;
      }
    }
    this.addButton.space = space;
    this.addButton.display();

    this.stage.update();
  }

  loop() {
    if (this.play) {
      return false;
    }
    let beat = 0;
    this.play = setInterval(() => {
      for (let pattern in this.patterns) {
        if (this.patterns.hasOwnProperty(pattern) && this.patterns[pattern] instanceof Pattern) {

          this.patterns[pattern].displayBeats(beat);

          if (this.patterns[pattern].beat[beat].read && !this.patterns[pattern].line.mute) {
            this.patterns[pattern].sound.playSound();
          }
        }
      }

      beat == 7 ? beat = 0 : beat++;
    }, (60000 / this.bpm) / 2);
  }

  toggleMute(line) {
    if (line.mute) {
      line.mute = false;
      line.graphics.clear().beginFill("#000").drawRect(0, line.space, 1000, 30);
    } else {
      line.mute = true;
      line.graphics.clear().beginFill("#a4a4a4").drawRect(0, line.space, 1000, 30);
    }
    return this.stage.update();
  }
}