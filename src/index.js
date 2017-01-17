import SoundFactory from "./sound";

const bpm = 250;
const sound = {
  kick: new SoundFactory({ soundId: 'kick', type: 'hardcore' }),
  filter: new SoundFactory({ soundId: 'filter', type: 'hardcore' }),
  loop: ''
};

const stage = new createjs.Stage("canvasElementId");

const line = new createjs.Shape();
line.graphics.beginFill("#000").drawRect(0, 30, 1000, 10);
stage.addChild(line);

const circle = [];
const circles = new createjs.Shape();

function drawDots(time) {
  let begin = 100;
  for (let i = 0; i < 9; i++) {
    circle[i] = circles.graphics.beginFill("#000").drawCircle(begin, 35, 15);
    circles.graphics.beginFill("#ffff00").drawCircle(begin, 35, 10);
    circles.addEventListener("click", function(evt) {
      console.log('toto');
    });

    if (time == i) {
      circles.graphics.beginFill("red").drawCircle(begin, 35, 10);
    }
    begin += 100;
  }
  stage.addChild(circles);
  stage.update();
}
console.log(circle);

drawDots();

$('.playSound').on('click', function() {
  let beat = 0;
  sound.loop = setInterval(() => {
    drawDots(beat);
    sound.kick.playSound();
    beat == 8 ? beat = 0 : beat++;
  }, 60000 / bpm);
});

$('.stopSound').on('click', function() {
  clearInterval(sound.loop);
});
