import 'phaser';
import StateMachine from '../statemachine/stateMachine';
import { shareInstance as events } from './EventCenter';
import ObstaclesController from './ObstaclesController';

export default class PlayerController {
  constructor(scene, sprite, cursors, obstacles) {
    this.scene = scene;
    this.sprite = sprite;
    this.cursors = cursors;
    this.obstacles = obstacles;
    this.health = 100;
    this.createAnimations();
    this.sprite.setFriction(0.008);
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
    .addState('enemy1-hit', {
      onEnter: this.enemy1HitOnEnter
    })
    .addState('enemy1-stomp', {
      onEnter: this.enemy1StompOnEnter
    })
    .addState('dead', {
      onEnter: this.deadOnEnter
    })
    .setState('idle');

    this.sprite.setOnCollide((data) => {

      const body = data.bodyB;
      if(this.obstacles.is('cream', body)){
        this.stateMachine.setState('cream-hit');
        return
      }
      if(this.obstacles.is('enemy1', body)){
        this.lastEnemy1 = body.gameObject;
        if(this.sprite.y < body.position.y) {
          this.stateMachine.setState('enemy1-stomp');
        } else {
          this.stateMachine.setState('enemy1-hit');
        }
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
          events.emit('star-collected');
          sprite.destroy();
          break
        }
        case 'health': {
          const a = sprite.getData('healthPoints')
          const value = a !== null && a !== void 0 ? a : 10;
          this.health = Phaser.Math.Clamp(this.health + value, 0, 100);
          events.emit('health-changed', this.health);
          sprite.destroy();
          break;
        }
      }

    });
  }

  update(dt) {
    this.stateMachine.update(dt);
  }

  setHealth(value) {
    this.health = Phaser.Math.Clamp(value, 0, 100);
    events.emit('health-changed', this.health);
    if(this.health <= 0) {
      this.stateMachine.setState('dead');
    }
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
    this.setHealth(this.health - 10);
  }

  enemy1HitOnEnter() {
    if(this.lastEnemy1) {
      if(this.sprite.x < this.lastEnemy1.x) {
        this.sprite.setVelocityX(-20);
      } else {
        this.sprite.setVelocityX(20);
      }
    } else {
      this.sprite.setVelocityY(-10);
    }
    const startColor = Phaser.Display.Color.ValueToColor(0xffffff);
    const endColor = Phaser.Display.Color.ValueToColor(0x0000ff);
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
    this.setHealth(this.health - 25);
  }

  enemy1StompOnEnter() {
    this.sprite.setVelocityY(-10);
    events.emit('enemy1-stomped', this.lastEnemy1);
    this.stateMachine.setState('idle');
  }

  deadOnEnter() {
    this.sprite.play('player-death');
    this.sprite.setOnCollide(() => {}); // NoOp: no option function, to stop any movement.
    this.scene.time.delayedCall(2000, () => {
      this.scene.scene.start('game-over');
    })
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
    this.sprite.anims.create({
      key: 'player-death',
        frameRate: 5,
        frames: this.sprite.anims.generateFrameNames('pinkHero', {
            start: 1,
            end: 4,
            prefix: 'Pink_Monster_Death_',
            zeroPad: 2,
            suffix: '.png'
        })
    });
  }
}