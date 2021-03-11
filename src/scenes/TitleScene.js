import Phaser from 'phaser';
import config from '../config/Config';
import Button from '../objects/Buttons';
 
export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }

  create () {
    this.add.image(config.width / 2, config.height / 2, 'bg').setDepth(-1);
    //Instruccions
    this.instructionsButton = new Button(this, config.width/2, config.height/2 - 200, 'pinkButton1', 'pinkButton2', 'Instructions', 'InstructionsScene');

    // Game
    this.gameButton = new Button(this, config.width/2, config.height/2 - 100, 'pinkButton1', 'pinkButton2', 'Play', 'InputScene');
    
    // Options
    this.optionsButton = new Button(this, config.width/2, config.height/2, 'pinkButton1', 'pinkButton2', 'Options', 'Options');

    // Ranking
    this.rankingButton = new Button(this, config.width/2, config.height/2 + 100, 'pinkButton1', 'pinkButton2', 'Ranking', 'Ranking');
    
    // Credits
    this.creditsButton = new Button(this, config.width/2, config.height/2 + 200, 'pinkButton1', 'pinkButton2', 'Credits', 'Credits');
    
    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
};