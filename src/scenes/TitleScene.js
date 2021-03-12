import Phaser from 'phaser';
import config from '../config/Config';
import Button from '../objects/Buttons';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // Background
    this.add.image(config.width / 2, config.height / 2, 'bg').setDepth(-1);
    // Title
    const { width, height } = this.scale;
    this.add.text(width * 0.5, height * 0.1, 'Peque in The Candy World', {
      fontSize: '58px',
      color: '#ff00e5',
      fontFamily: 'Franklin Gothic Medium',
      fontStyle: 'bolder',
      backgroundColor: 'white',
    })
      .setOrigin(0.5);
    // Instruccions
    this.instructionsButton = new Button(this, config.width / 2, config.height / 2 - 150, 'pinkButton1', 'pinkButton2', 'Instructions', 'InstructionsScene');

    // Game
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 70, 'pinkButton1', 'pinkButton2', 'Play', 'InputScene');

    // Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2 + 20, 'pinkButton1', 'pinkButton2', 'Options', 'Options');

    // Ranking
    this.rankingButton = new Button(this, config.width / 2, config.height / 2 + 100, 'pinkButton1', 'pinkButton2', 'Ranking', 'Ranking');

    // Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 190, 'pinkButton1', 'pinkButton2', 'Credits', 'Credits');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}