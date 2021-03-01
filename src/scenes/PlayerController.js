import Phaser from 'phaser';
import StateMachine from '../statemachine/stateMachine';
import { shareInstance as events } from './EventCenter';
import ObstaclesController from './ObstaclesController';

export default class PlayerController {
  constructor(scene, sprite, cursors, obstacles) {
    this.scene = scene;
    this.sprite = sprite;
    this.cursors = cursors;
    this.obstacles = obstacles;
    this.createAnimations();
    this.stateMachine = new StateMachine(this, 'player');
    this.stateMachine.addState('idle', {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate
    })
    .addState('walk', {
      onEnter: this.walkOnEnter,
      onUpdate: this.walkOnUpdate
    })
    .addState('jump', {
      onEnter: this.jumpOnEnter,
      onUpdate: this.jumpOnUpdate
    })
    .addState('cream-hit', {
      onEnter: this.creamHitOnEnter
    })
    .setState('idle');

    this.sprite.setOnCollide((data) => {

      const body = data.bodyB;
      if(this.obstacles.is('cream', body)){
        this.stateMachine.setState('cream-hit');
        return
      }
      const gameItem = body.gameObject;

      if(!gameItem) {
        return
      }

      if(gameItem instanceof Phaser.Physics.Matter.TileBody) {
        if(this.stateMachine.isCurrentState('jump')) {
          this.stateMachine.setState('idle');
        }
        return
      }
      const sprite = gameItem;
      const type = sprite.getData('type');

      switch(type) {
        case 'star': {
          events.emit('star-collected')
          sprite.destroy();
          break
        }
      }

    });
  }

  update(dt) {
    this.stateMachine.update(dt);
  }

  idleOnEnter() {
    this.sprite.play('player-idle');
  }

  idleOnUpdate() {
    if (this.cursors.left.isDown || this.cursors.right.isDown) {
        this.stateMachine.setState('walk');
    }
    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space);
    if (spaceJustPressed) {
        this.stateMachine.setState('jump');
    }
  }

  walkOnEnter() {
    this.sprite.play('player-walk');
  }

  walkOnUpdate() {
    const speed = 5;
    if (this.cursors.left.isDown) {
        this.sprite.flipX = true;
        this.sprite.setVelocityX(-speed);
    }
    else if (this.cursors.right.isDown) {
        this.sprite.flipX = false;
        this.sprite.setVelocityX(speed);
    }
    else {
        this.sprite.setVelocityX(0);
        this.stateMachine.setState('idle');
    }
    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space);
    if (spaceJustPressed) {
        this.stateMachine.setState('jump');
    }
  }

  jumpOnEnter() {
    this.sprite.setVelocityY(-13);
    this.sprite.play('player-jump');
  }

  jumpOnUpdate() {
    const speed = 5;
    if (this.cursors.left.isDown) {
        this.sprite.flipX = true;
        this.sprite.setVelocityX(-speed);
    }
    else if (this.cursors.right.isDown) {
        this.sprite.flipX = false;
        this.sprite.setVelocityX(speed);
    }
  }

  creamHitOnEnter() {
    this.sprite.setVelocityY(-8);
    const startColor = Phaser.Display.Color.ValueToColor(0xffffff);
    const endColor = Phaser.Display.Color.ValueToColor(0xff0000);
    this.scene.tweens.addCounter({
      from: 0,
      to: 100,
      duration: 100,
      repeat: 2,
      yoyo: true,
      ease: Phaser.Math.Easing.Sine.InOut,
      onUpdate: tween => {
        const value = tween.getValue()
        const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(startColor, endColor, 100, value)
        const color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b)
        this.sprite.setTint(color)
      }
    })
    this.stateMachine.setState('idle');
  }

  createAnimations() {
    this.sprite.anims.create({
        key: 'player-idle',
        frames: [{ key: 'pinkHero', frame: 'Pink_Monster_Walk_06.png' }]
    });
    this.sprite.anims.create({
        key: 'player-walk',
        frameRate: 10,
        frames: this.sprite.anims.generateFrameNames('pinkHero', {
            start: 1,
            end: 6,
            prefix: 'Pink_Monster_Walk_0',
            suffix: '.png'
        }),
        repeat: -1
    });
    this.sprite.anims.create({
        key: 'player-jump',
        frameRate: 5,
        frames: this.sprite.anims.generateFrameNames('pinkHero', {
            start: 1,
            end: 8,
            prefix: 'Pink_Monster_Jump_0',
            suffix: '.png'
        })
    });
  }
}