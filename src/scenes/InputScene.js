import Phaser from 'phaser';
import config from '../config/Config';
import scoreData from '../score/api';


export default class InputScene extends Phaser.Scene {
  constructor () {
    super('InputScene');
  }

  create() {
    this.add.image(config.width / 2, config.height / 2, 'bg').setDepth(-1);
    const { width, height } = this.scale;
    this.add.text(width *0.5, height * 0.1, 'Register', {
      fontSize: '58px',
      color: '#ff00e5',
      fontFamily: 'Franklin Gothic Medium',
      fontStyle: 'bolder'
    })
    .setOrigin(0.5);
    const element = document.getElementById('name-form');
    element.style.display = 'block';


    element.addEventListener('click', (event) => {
      if (event.target.name === 'saveNameBtn') {
        const inputName = document.getElementById('name');


        if (inputName.value !== '') {
          element.style.display = 'none';
          scoreData.nameSetter(inputName.value);
          this.scene.start('LevelOne');
        } else {
          const warning = document.getElementById('warning');
          warning.style.display = 'block';

          setInterval(() => {
            warning.style.display = 'none';
          }, 6000);
        }
      } else if (event.target.name === 'back') {
        element.style.display = 'none';
        this.scene.start('Title');
      }
    });
  }
};