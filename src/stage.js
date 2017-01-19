import Pattern from "./pattern";

export default class StageController {
  constructor(canvasId) {
    this.bpm = 200;
    this.stage = new createjs.Stage(canvasId);
    this.play = false;
    this.patterns = {
      kick: new Pattern({ stage: this.stage, sound: 'kick', type: 'minimal' }),
      'hit-hat': new Pattern({ stage: this.stage, sound: 'hit-hat', type: 'minimal' }),
      filter: new Pattern({ stage: this.stage, sound: 'C3', type: 'acid' }),
      snare: new Pattern({ stage: this.stage, sound: 'snare', type: 'minimal' })
    };
    this.displayLines();
  }

  displayLines() {
    let space = 20;
    for (let pattern in this.patterns) {
      if (this.patterns.hasOwnProperty(pattern) && this.patterns[pattern] instanceof Pattern) {

        this.patterns[pattern].line = new createjs.Shape();
        this.patterns[pattern].line.addEventListener("click", () => {
          this.patterns[pattern].mute = !this.patterns[pattern].mute;
          this.stage.update();
        });
        this.patterns[pattern].line.graphics.beginFill("#000").drawRect(0, space, 1000, 30);

        this.patterns[pattern].text = new createjs.Text(pattern, "20px Arial", "#fff");
        this.patterns[pattern].text.x = 60;
        this.patterns[pattern].text.y = space + 15;
        this.patterns[pattern].text.textBaseline = "middle";

        this.stage.addChild(this.patterns[pattern].line);
        this.stage.addChild(this.patterns[pattern].text);

        this.patterns[pattern].displayPattern(space + 15);

        space = space + 50;
      }
    }

    // Add button
    let button = new createjs.Shape(),
        buttonText = new createjs.Text('+', "20px Arial", "#fff");

    button.graphics.beginFill("#0275d8").drawRoundRectComplex(60, space, 40, 35, 5, 5, 5, 5);

    buttonText.x = 75;
    buttonText.y = space + 17;
    buttonText.textBaseline = "middle";

    button.addEventListener("click", (evt) => {
      this.toggleRead(this.beat[i]);
      this.stage.update();
    });

    this.stage.addChild(button);
    this.stage.addChild(buttonText);

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

          if (this.patterns[pattern].beat[beat].read && !this.patterns[pattern].mute) {
            this.patterns[pattern].sound.playSound();
          }
        }
      }

      beat == 7 ? beat = 0 : beat++;
    }, 60000 / this.bpm);
  }
}