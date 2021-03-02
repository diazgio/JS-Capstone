import Phaser from 'phaser';
 
export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 900,
  height: 600,
  physics: {
    default: 'matter',
    matter: {
        debug: true
    }
  }
};