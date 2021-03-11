import 'phaser';
import 'regenerator-runtime/runtime';
import config from './config/Config';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import InstructionsScene from './scenes/InstructionsScene';
import InputScene from './scenes/InputScene';
import OptionsScene from './scenes/OptionsScene';
import CreditsScene from './scenes/CreditsScene';
import LevelOne from './scenes/LevelOne';
import WinScene from './scenes/WinScene';
import UI from './scenes/UI';
import GameOver from './scenes/GameOver';
import Ranking from './scenes/RankingScene';
import Model from './Model';
import '../src/CSS/style.css';

class FullGame extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('InstructionsScene', InstructionsScene);
    this.scene.add('InputScene', InputScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('LevelOne', LevelOne);
    this.scene.add('WinScene', WinScene);
    this.scene.add('Ranking', Ranking);
    this.scene.add('UI', UI);
    this.scene.add('GameOver', GameOver);
    this.scene.start('Boot');
  }
}

window.game = new FullGame();