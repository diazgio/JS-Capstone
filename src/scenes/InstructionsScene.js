import Phaser from 'phaser';
import config from '../config/Config';
import Button from '../objects/Buttons';


export default class InstructionsScene extends Phaser.Scene {
  constructor () {
    super('InstructionsScene');
  }
 
  create() {
    this.add.image(config.width / 2, config.height / 2, 'board').setScale(2);
    const { width, height } = this.scale;
    this.add.text(width *0.5, height * 0.1, 'Instructions', {
      fontSize: '52px',
      color: '#ff00e5',
      fontFamily: 'Franklin Gothic Medium',
      fontStyle: 'bolder'
    })
    .setOrigin(0.5);
    
    //  // Menu
    this.menuButton = new Button(this, config.width/2, config.height/2, 'pinkButton1', 'pinkButton2', 'Menu', 'Title');
  }
};