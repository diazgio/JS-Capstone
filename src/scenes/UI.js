import Phaser from 'phaser';
import { shareInstance as events } from './EventCenter';

export default class UI extends Phaser.Scene {
  constructor() {
    super({
      key: 'ui',
    });
    this.starsCollected = 0;
    this.lastHealth = 100
  }

  init() {
    this.starsCollected = 0;
  }

  create() {
    this.graphics = this.add.graphics();
    this.setHealthBar(100);
    this.starsLabel = this.add.text(10, 35, 'Points: 0', {
      fontSize: '32px'
    });
    
    events.on('star-collected', this.handleStarCollected, this);
    events.on('health-changed', this.handleHealthChanged, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      events.off('star-collected', this.handleStarCollected, this);
    });
    
  }
  
  handleStarCollected() {
    this.starsCollected += 10;
    this.starsLabel.text = `Points: ${this.starsCollected}`;
  }
  
  setHealthBar(value) {
    const width = 200;
    const percent = Phaser.Math.Clamp(value, 0, 100) / 100;
    this.graphics.clear();
    this.graphics.fillStyle(0x808080);
    this.graphics.fillRoundedRect(10, 10, width, 20, 5);
    if (percent > 0) {
      this.graphics.fillStyle(0x00ff00);
      this.graphics.fillRoundedRect(10, 10, width * percent, 20, 5);
    }
  }

  handleHealthChanged(value) {
    this.tweens.addCounter({
      from: this.lastHealth,
      to: value,
      duration: 200,
      ease: Phaser.Math.Easing.Sine.InOut,
      onUpdate: tween => {
          const value = tween.getValue();
          this.setHealthBar(value);
      }
    });
    this.lastHealth = value;
  }
  
}