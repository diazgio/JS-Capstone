/* eslint-disable import/prefer-default-export */
import Phaser from 'phaser';

const shareInstance = new Phaser.Events.EventEmitter();

export { shareInstance };