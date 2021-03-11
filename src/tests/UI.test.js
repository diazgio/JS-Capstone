
import Phaser from 'phaser';
import UI from '../scenes/UI';
import 'jest-expect-subclass';

test('UI should be a subclass of Phaser.Scene', () => {
  expect(UI).toBeSubclassOf(Phaser.Scene);
});