import Stage from "./stage";

const stage = new Stage("canvasElementId");

createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener("tick", stage.stage);

$('.playSound').on('click', () => {
  stage.loop();
});

$('.stopSound').on('click', () => {
  clearInterval(stage.play);
  stage.play = false;
});

$(document).on('click', function(){
  let bpm = $('#bpm').val();
  if(bpm > 1){
    stage.bpm = bpm;
  }
});