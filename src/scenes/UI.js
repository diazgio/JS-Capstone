import Phaser from 'phaser';
import { shareInstance as events } from './EventCenter';

export default class UI extends Phaser.Scene {
  constructor() {
    super({
      key: 'ui'
    });
  }

  init() {
    this.starsCollected = 0;
  }

  create() {
    this.starsLabel = this.add.text(10, 10, 'Stars: 0', {
      fontSize: '32px'
    });
    
    events.on('star-collected', this.handleStarCollected, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      events.off('star-collected', this.handleStarCollected, this);
    });
    
  }
  
  handleStarCollected() {
    this.starsCollected += 1;
    this.starsLabel.text = `Stars: ${this.starsCollected}`;
  }
  
  
}