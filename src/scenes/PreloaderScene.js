/* eslint-disable class-methods-use-this, radix, no-plusplus */
import Phaser from 'phaser';
import button1 from '../../public/assets/pink_button01.png';
import button2 from '../../public/assets/pink_button02.png';
import box from '../../public/assets/grey_box.png';
import checkbox from '../../public/assets/pink_boxCheckmark.png';
import bg from '../../public/assets/bgtitle.png';
import board from '../../public/assets/board.png';
import cursors from '../../public/assets/cursors.png';
import spacebar from '../../public/assets/spacebar.png';
import home from '../../public/assets/home.png';
import home1 from '../../public/assets/home1.jpg';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    // add logo image
    this.add.image(400, 200, 'logo');

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(280, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(290, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('pinkButton1', button1);
    this.load.image('pinkButton2', button2);
    this.load.image('home', home);
    this.load.image('home1', home1);
    this.load.image('box', box);
    this.load.image('cursors', cursors);
    this.load.image('spacebar', spacebar);
    this.load.image('checkedBox', checkbox);
    this.load.image('bg', bg);
    this.load.image('board', board);
    this.load.audio('bgMusic', ['../src/assets/TownTheme.mp3']);
  }

  create() {
  }

  ready() {
    this.scene.start('Title');
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}