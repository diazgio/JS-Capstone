import Phaser from 'phaser';
import config from '../config/Config';
import Button from '../objects/Buttons';
export default class GameOver extends Phaser.Scene {
  constructor() {
    super('game-over');
  }

  create() {
    this.add.image(config.width / 2, config.height / 2, 'bg').setDepth(-1);
    const { width, height } = this.scale;
    this.add.text(width *0.5, height * 0.1, 'Game Over', {
      fontSize: '52px',
      color: '#ff0000',
      fontFamily: 'Franklin Gothic Medium'
    })
    .setOrigin(0.5);
     // Game
     this.playAgainButton = new Button(this, config.width/2, config.height/2 - 100, 'pinkButton1', 'pinkButton2', 'Play Again', 'LevelOne');
    
     // Menu
     this.menuButton = new Button(this, config.width/2, config.height/2, 'pinkButton1', 'pinkButton2', 'Menu', 'Title');
  }
}