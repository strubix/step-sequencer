export default class SoundFactory {
  constructor(options) {
    this.soundId = options.soundId;
    this.sound = options.sound;
    this.path = `./assets/soundbank/${options.type}/`;
    this.play = false;
    this.loadSound();
  }

  loadSound() {
    createjs.Sound.registerSound(`${this.path}${this.sound}.wav`, this.soundId);
  }

  playSound() {
    createjs.Sound.play(this.soundId);
  }
}