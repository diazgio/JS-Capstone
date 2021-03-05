import 'phaser';
import config from './config/Config';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import OptionsScene from './scenes/OptionsScene';
import CreditsScene from './scenes/CreditsScene';
import LevelOne from './scenes/LevelOne';
import LevelTwo from './scenes/LevelTwo';
import LevelThree from './scenes/LevelThree';
import UI from './scenes/UI';
import GameOver from './scenes/GameOver';
import Model from './Model';

class FullGame extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('LevelOne', LevelOne);
    this.scene.add('LevelTwo', LevelTwo);
    this.scene.add('LevelThree', LevelThree);
    this.scene.add('UI', UI);
    this.scene.add('GameOver', GameOver);
    this.scene.start('Boot');
  }
}

window.game = new FullGame();