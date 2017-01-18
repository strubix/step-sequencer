import Pattern from "./pattern";

const bpm = 100;
const stage = new createjs.Stage("canvasElementId");

const kick = new Pattern({stage: stage});

$('.playSound').on('click', function() {
  let beat = 0;
  kick.sound.loop = setInterval(() => {
    kick.displayBeats(beat);
    if(kick.beat[beat].read){
      kick.sound.playSound();
    }
    beat == 8 ? beat = 0 : beat++;
  }, 60000 / bpm);
});

$('.stopSound').on('click', function() {
  clearInterval(sound.loop);
});
