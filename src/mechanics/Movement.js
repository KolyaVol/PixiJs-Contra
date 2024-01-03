export default class Movement {
  constructor(item, speed) {
    this.item = item;
    this.speed = speed;
  }
  right() {
    this.item.x += this.speed;
  }
  left() {
    this.item.x += -this.speed;
  }
}
