export default class SoundFactory {
  constructor(options) {
    this.soundId = options.soundId;
    this.path = `./assets/soundbank/${options.type}/`;
    this.play = false;
    this.loadSound();
  }

  loadSound() {
    createjs.Sound.registerSound(`${this.path}${this.soundId}.wav`, this.soundId);
  }

  playSound() {
    createjs.Sound.play(this.soundId);
  }
}