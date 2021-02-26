import Phaser from 'phaser';
import pinkJ from '../../public/assets/pinkProta.json';
import pinkP from '../../public/assets/pinkProta.png';
import candyMap from '../../public/assets/sheetCandy.png';
import candyMapJ from '../../public/assets/candymap.json';
import PlayerController from './PlayerController';

export default class Game extends Phaser.Scene {
  
  constructor()
	{
    super('Game')
    this.Hero = Phaser.Physics.Matter.Sprite;
	}

  init(){
    this.cursors = this.input.keyboard.createCursorKeys();
  }

	preload() {
    this.load.atlas('pinkHero', pinkP, pinkJ);
    this.load.image('tiles', candyMap);
    this.load.tilemapTiledJSON('tilemap', candyMapJ);
  }

  create() {
    const map = this.make.tilemap({ key: 'tilemap' });
    const tileSet = map.addTilesetImage('CandyWorld', 'tiles');
    const ground = map.createLayer('ground', tileSet);

    ground.setCollisionByProperty({ collides: true });
    
    const objectLayer = map.getObjectLayer('Objects');
    objectLayer.objects.forEach(objData => {
      const { x, y, name, width = 0 } = objData;
      switch(name) {
        case 'HeroSpwam': {
          this.Hero = this.matter.add.sprite(x + (width * 0.5), y, 'pinkHero')
              .setFixedRotation();
          
          this.playerController = new PlayerController(this.Hero, this.cursors);
          this.cameras.main.startFollow(this.Hero);
          break
        }
      }
    });

    this.matter.world.convertTilemapLayer(ground);
  }

  update(t, dt){

    if(!this.playerController) {
      return
    }
    this.playerController.update(dt);
  }
}