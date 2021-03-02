import 'phaser';
import zenva from '../../public/assets/zenva_logo.png';
 
export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    this.load.image('logo', zenva);
  }
 
  create () {
    this.scene.start('Preloader');
  }
};