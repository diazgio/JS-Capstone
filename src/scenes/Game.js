import Phaser from 'phaser';
import pinkJ from '../../public/assets/pinkProta.json';
import pinkP from '../../public/assets/pinkProta.png';
import candyMap from '../../public/assets/sheetCandy.png';
import candyMapJ from '../../public/assets/candymap.json';

export default class Game extends Phaser.Scene {
  
  constructor()
	{
    super('Game')
    this.Hero = Phaser.Physics.Matter.Sprite;
    this.isTouchingGround = false;
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
    this.createHeroAnimations();
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
              .play('player-idle')
              .setFixedRotation();
    
          this.Hero.setOnCollide((data) => {
            this.isTouchingGround = true;
          });
          this.cameras.main.startFollow(this.Hero);
          break
        }
      }
    });

    this.matter.world.convertTilemapLayer(ground);
  }

  createHeroAnimations() {
    this.anims.create({
      key: 'player-idle',
      frames: [{ key: 'pinkHero',frame: 'Pink_Monster_Walk_06.png' }]
    })
    this.anims.create({
      key: 'player-walk',
      frameRate: 10,
      frames: this.anims.generateFrameNames('pinkHero', {
        start: 1,
        end: 6,
        prefix: 'Pink_Monster_Walk_0',
        suffix: '.png'
      }),
      repeat: -1
    })
  }

  update(){
    const speed = 5;

    if(this.cursors.left.isDown){
      this.Hero.flipX = true;
      this.Hero.setVelocityX(-speed);
      this.Hero.play('player-walk', true);

    }
    else if(this.cursors.right.isDown){
      this.Hero.flipX = false;
      this.Hero.setVelocityX(speed);
      this.Hero.play('player-walk', true);
    } else {
      this.Hero.setVelocityX(0);
      this.Hero.play('player-idle', true);
    }

    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space);
    if(spaceJustPressed && this.isTouchingGround) {
      this.Hero.setVelocityY(-10);
      this.isTouchingGround = false
    }
  }
}