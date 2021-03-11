import Phaser from 'phaser';
import WinScene from '../scenes/WinScene';
import 'jest-expect-subclass';

test('WinScene should be a subclass of Phaser.Scene', () => {
  expect(WinScene).toBeSubclassOf(Phaser.Scene);
});