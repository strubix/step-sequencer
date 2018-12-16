import 'bootstrap';
import './assets/css/style.scss';

import $ from 'jquery';
import createjs from 'createjs';

import Stage from './stage';

const stage = new Stage('canvasElementId');

function requireAll(r) {
    r.keys().forEach(r);
}

requireAll(require.context('./assets/soundbank', true, /\.wav$/));

createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener('tick', stage.stage);

$('.playSound').on('click', () => {
    stage.loop()
});

$('.stopSound').on('click', () => {
    clearInterval(stage.play);
    stage.play = false
});

$(document).on('click', function () {
    let bpm = $('#bpm').val();
    if (bpm > 1) {
        stage.bpm = bpm
    }
});
