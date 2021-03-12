import Phaser from 'phaser';
import config from '../config/Config';
import Button from '../objects/Buttons';


export default class InstructionsScene extends Phaser.Scene {
  constructor() {
    super('InstructionsScene');
  }

  create() {
    this.add.image(config.width / 2, config.height / 2, 'board').setScale(2);
    const { width, height } = this.scale;
    this.add.text(width * 0.5, height * 0.1, 'Instructions', {
      fontSize: '52px',
      color: '#ff00e5',
      fontFamily: 'Franklin Gothic Medium',
      fontStyle: 'bolder',
    })
      .setOrigin(0.5);
    // Instructions to move
    this.add.text(config.width / 2 - 220, config.height / 2 - 170, '1. To move press the direction keys in your keyboard:', {
      color: '#5d1512',
      fontFamily: 'Franklin Gothic Medium',
      fontSize: '20px',
      fontStyle: 'bolder',
    });
    this.add.image(width * 0.5, height * 0.5 - 100, 'cursors');
    // Instructions to jump
    this.add.text(config.width / 2 - 220, config.height / 2 - 60, '2. To move press the space bar in your keyboard:', {
      color: '#5d1512',
      fontFamily: 'Franklin Gothic Medium',
      fontSize: '20px',
      fontStyle: 'bolder',
    });
    this.add.image(width * 0.5, height * 0.5 + 30, 'spacebar');
    // Instructions to do double jump
    this.add.text(config.width / 2 - 220, config.height / 2 + 90, '3. To make a double jump You have to touch some object', {
      color: '#5d1512',
      fontFamily: 'Franklin Gothic Medium',
      fontSize: '20px',
      fontStyle: 'bolder',
    });
    this.add.text(config.width / 2 - 200, config.height / 2 + 115, 'And press again space bar.', {
      color: '#5d1512',
      fontFamily: 'Franklin Gothic Medium',
      fontSize: '20px',
      fontStyle: 'bolder',
    });

    //  // Menu
    this.menuButton = new Button(this, config.width / 2, config.height / 2 + 200, 'pinkButton1', 'pinkButton2', 'Menu', 'Title');
  }
}