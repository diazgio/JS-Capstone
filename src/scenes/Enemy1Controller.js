import StateMachine from '../statemachine/stateMachine';
import { shareInstance as events } from './EventCenter';

export default class Enemy1Controller {
  constructor(scene, sprite) {
    this.scene = scene;
    this.sprite = sprite;
    this.createAnimations();
    this.stateMachine = new StateMachine(this, 'enemy1');
    this.moveTime = 0;
    this.stateMachine.addState('idle', {
      onEnter: this.idleOnEnter
    })
    .addState('move-left', {
      onEnter: this.moveLeftOnEnter,
      onUpdate: this.moveLeftOnUpdate
    })
    .addState('move-right', {
      onEnter: this.moveRightOnEnter,
      onUpdate: this.moveRightOnUpdate
    })
    .addState('dead')
    .setState('idle');

    events.on('enemy1-stomped', this.handleStomped, this);
  }

  destroy() {
    events.off('enemy1-stomped', this.handleStomped, this);
  }

  update(dt) {
    this.stateMachine.update(dt);
  }

  idleOnEnter() {
    this.sprite.play('idle');
    const randomNum = Phaser.Math.Between(1, 100);
    if(randomNum < 50) {
      this.stateMachine.setState('move-left');
    } else {
      this.stateMachine.setState('move-right');
    }
  }

  moveLeftOnEnter() {
    this.moveTime = 0;
    this.sprite.play('move-left');
  }

  moveLeftOnUpdate(dt) {
    this.moveTime += dt;
    this.sprite.setVelocityX(-3);
    if(this.moveTime > 2000) {
      this.stateMachine.setState('move-right');
    }
  }

  moveRightOnEnter() {
    this.moveTime = 0;
    this.sprite.play('move-right');
  }

  moveRightOnUpdate(dt) {
    this.moveTime += dt;
    this.sprite.setVelocityX(3);
    if(this.moveTime > 2000) {
      this.stateMachine.setState('move-left');
    }
  }

  handleStomped(enemy1) {
    if(this.sprite !== enemy1) {
      return
    }
    events.off('enemy1-stomped', this.handleStomped, this);

    this.scene.tweens.add({
      targets: this.sprite,
			displayHeight: 0,
			y: this.sprite.y + (this.sprite.displayHeight * 0.5),
			duration: 200,
			onComplete: () => {
				this.sprite.destroy()
			}
    })
    this.stateMachine.setState('dead');
  }

  createAnimations() {
    this.sprite.anims.create({
      key: 'idle',
      frames: [{ key: 'enemy1', frame: 'enemy_walk_09.png'}]
    });
    this.sprite.anims.create({
      key: 'move-left',
      frames: this.sprite.anims.generateFrameNames('enemy1', {
				start: 1,
				end: 5,
				prefix: 'enemy_walk_0',
				suffix: '.png'
			}),
			frameRate: 5,
			repeat: -1
    });
    this.sprite.anims.create({
      key: 'move-right',
      frames: this.sprite.anims.generateFrameNames('enemy1', {
				start: 6,
				end: 9,
				prefix: 'enemy_walk_0',
				suffix: '.png'
			}),
			frameRate: 5,
			repeat: -1
    });
  }
}