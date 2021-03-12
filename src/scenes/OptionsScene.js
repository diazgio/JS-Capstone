import Phaser from 'phaser';
import config from '../config/Config';
import Button from '../objects/Buttons';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.add.image(config.width / 2, config.height / 2, 'bg').setDepth(-1);
    this.model = this.sys.game.globals.model;
    const { width, height } = this.scale;
    this.text = this.add.text(width * 0.4, height * 0.1, 'Options', { 
      fontSize: '58px',
      color: '#ff00e5',
      fontFamily: 'Franklin Gothic Medium',
      fontStyle: 'bolder',
      backgroundColor: 'white',
     });
    this.musicButton = this.add.image(205, 208, 'checkedBox');
    this.musicText = this.add.text(250, 190, 'Music Enabled', {
      fontSize: '24px',
      color: '#ff00e5',
      fontFamily: 'Franklin Gothic Medium',
      fontStyle: 'bolder',
      backgroundColor: 'white',
      padding: 5
    });

    this.soundButton = this.add.image(205, 308, 'checkedBox');
    this.soundText = this.add.text(250, 290, 'Sound Enabled', {
      fontSize: '24px',
      color: '#ff00e5',
      fontFamily: 'Franklin Gothic Medium',
      fontStyle: 'bolder',
      backgroundColor: 'white',
      padding: 5
    });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    });

    this.soundButton.on('pointerdown', () => {
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    });

    this.menuButton = new Button(this, 460, 500, 'pinkButton1', 'pinkButton2', 'Menu', 'Title');

    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }

    if (this.model.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }
}