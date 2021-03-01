const createKey = (nameR, id) => {
  return `${nameR}-${id}`;
}

export default class ObstaclesController {
  constructor() {
    this.obstacles = new Map();
  }
  add(name1, body) {
    const key = createKey(name1, body.id);
    if (this.obstacles.has(key)) {
      throw new Error('Obstacle exists for this key')
    }
    this.obstacles.set(key, body)
  }

  is(name2, body){
    const key = createKey(name2, body.id);
    if (!this.obstacles.has(key)) {
      return false;
    }
    return true;
  }
}