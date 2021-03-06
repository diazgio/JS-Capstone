import Phaser from 'phaser';
import config from '../config/Config';
import Button from '../objects/Buttons';

export default class WinScene extends Phaser.Scene {
  constructor() {
    super('WinScene');
  }

  create() {
    const { width, height } = this.scale;
    this.add.text(width * 0.5, height * 0.1, 'You Win!!', {
      fontSize: '52px',
      color: '#ff0000',
    })
      .setOrigin(0.5);
    // Menu
    this.menuButton = new Button(this, config.width / 2, config.height / 2, 'pinkButton1', 'pinkButton2', 'Menu', 'Title');
  }
}