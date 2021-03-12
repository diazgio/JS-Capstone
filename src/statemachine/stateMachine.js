/* eslint-disable no-void, max-len, no-plusplus, no-cond-assign, no-console */
let idCount = 0;
export default class StateMachine {
  constructor(context, id) {
    this.id = (++idCount).toString();
    this.states = new Map();
    this.isChangingState = false;
    this.changeStateQueue = [];
    this.id = id !== null && id !== void 0 ? id : this.id;
    this.context = context;
  }

  get previousStateName() {
    if (!this.previousState) {
      return '';
    }
    return this.previousState.name;
  }

  isCurrentState(name) {
    if (!this.currentState) {
      return false;
    }
    return this.currentState.name === name;
  }

  addState(name, config) {
    let a; let b; let
      c;
    const { context } = this;
    this.states.set(name, {
      name,
      onEnter: (a = config === null || config === void 0 ? void 0 : config.onEnter) === null || a === void 0 ? void 0 : a.bind(context),
      onUpdate: (b = config === null || config === void 0 ? void 0 : config.onUpdate) === null || b === void 0 ? void 0 : b.bind(context),
      onExit: (c = config === null || config === void 0 ? void 0 : config.onExit) === null || c === void 0 ? void 0 : c.bind(context),
    });
    return this;
  }

  setState(name) {
    if (!this.states.has(name)) {
      console.warn(`Tried to change to unknown state: ${name}`);
      return;
    }
    if (this.isCurrentState(name)) {
      return;
    }
    if (this.isChangingState) {
      this.changeStateQueue.push(name);
      return;
    }
    this.isChangingState = true;
    if (this.currentState && this.currentState.onExit) {
      this.currentState.onExit();
    }
    this.previousState = this.currentState;
    this.currentState = this.states.get(name);
    if (this.currentState.onEnter) {
      this.currentState.onEnter();
    }
    this.isChangingState = false;
  }

  update(dt) {
    if (this.changeStateQueue.length > 0) {
      this.setState(this.changeStateQueue.shift());
      return;
    }
    if (this.currentState && this.currentState.onUpdate) {
      this.currentState.onUpdate(dt);
    }
  }
}