import Phaser from 'phaser';
import StateMachine from '../statemachine/stateMachine';

export default class PlayerController {
  constructor(sprite, cursors) {
    this.sprite = sprite;
    this.cursors = cursors;
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
        .setState('idle');
    this.sprite.setOnCollide((data) => {

      const body = data.bodyB;
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
    this.sprite.setVelocityY(-10);
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