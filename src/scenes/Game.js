import Phaser from 'phaser';
import pinkJ from '../../public/assets/pinkProta2.json';
import pinkP from '../../public/assets/pinkProta2.png';
import star from '../../public/assets/star.png';
import health from '../../public/assets/health.png';
import candyMap from '../../public/assets/sheetCandy.png';
import candyMapJ from '../../public/assets/candymap3.json';
import PlayerController from './PlayerController';
import Enemy1Controller from './Enemy1Controller';
import ObstaclesController from './ObstaclesController';
import enemy1P from '../../public/assets/enemy1.png';
import enemy1J from '../../public/assets/enemy1.json';

export default class Game extends Phaser.Scene {
  
  constructor()
	{
    super('Game')
    this.Hero = Phaser.Physics.Matter.Sprite;
    this.enemy1 = [];
	}

  init(){
    this.cursors = this.input.keyboard.createCursorKeys();
    this.obstacles = new ObstaclesController();
    this.enemy1 = [];
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
			this.destroy()
		})
  }

	preload() {
    this.load.atlas('pinkHero', pinkP, pinkJ);
    this.load.image('tiles', candyMap);
    this.load.tilemapTiledJSON('tilemap', candyMapJ);
    this.load.image('star', star);
    this.load.image('health', health);
    this.load.atlas('enemy1', enemy1P, enemy1J);
  }

  create() {
    this.scene.launch('ui')
    const map = this.make.tilemap({ key: 'tilemap' });
    const tileSet = map.addTilesetImage('CandyWorld', 'tiles');
    const ground = map.createLayer('ground', tileSet);

    ground.setCollisionByProperty({ collides: true });
    map.createLayer('obstacles', tileSet);
    
    const objectLayer = map.getObjectLayer('Objects');
    objectLayer.objects.forEach(objData => {
      const { x = 0, y = 0, name, width = 0, height = 0 } = objData;
      switch(name) {
        case 'HeroSpwam': {
          this.Hero = this.matter.add.sprite(x + (width * 0.5), y, 'pinkHero')
              .setFixedRotation();
          
          this.playerController = new PlayerController(this, this.Hero, this.cursors, this.obstacles);
          this.cameras.main.startFollow(this.Hero, true);
          break;
        }
        case 'enemy1': {
          const enemy1 = this.matter.add.sprite(x + (width * 0.5), y, 'enemy1')
                          .setFixedRotation()
          this.enemy1.push(new Enemy1Controller(this, enemy1));
          this.obstacles.add('enemy1', enemy1.body);
          break;
        }
        case 'star': {
          const star = this.matter.add.sprite(x, y, 'star', undefined, {
            isStatic: true,
            isSensor: true
          });
          star.setData('type', 'star');
          break;
        }
        case 'health': {
          const health = this.matter.add.sprite(x, y, 'health', undefined, {
            isStatic: true,
            isSensor: true
          });
          health.setData('type', 'health');
          health.setData('healthPoints', 10);
          break;
        }
        case 'cream': {
          const cream = this.matter.add.rectangle(x + (width * 0.5), y + (height * 0.5), width, height, {
            isStatic: true
          });
          this.obstacles.add('cream', cream);
          break;
        }
      }
    });

    this.matter.world.convertTilemapLayer(ground);
  }
  destroy() {
    this.scene.stop('ui');
    this.enemy1.forEach(enemy1 => enemy1.destroy());
  }
  update(t, dt){

    if(this.playerController) {
      this.playerController.update(dt);
    }
    this.enemy1.forEach(enemy1 => enemy1.update(dt));
  }
}