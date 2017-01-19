import Stage from "./stage";

const stage = new Stage("canvasElementId");

$('.playSound').on('click', () => {
  stage.loop();
});

$('.stopSound').on('click', () => {
  clearInterval(stage.play);
  stage.play = false;
});