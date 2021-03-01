import Phaser from 'phaser';
import Game from './scenes/Game';
import UI from './scenes/UI';

const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,
    physics: {
        default: 'matter',
        matter: {
            debug: true
        }
    },
    scene: [Game, UI]
};
export default new Phaser.Game(config);