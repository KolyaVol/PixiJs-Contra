export default class Gravitation {
  constructor(item, fallSpeed = 0) {
    this.item = item;
    this.fallSpeed = fallSpeed;
  }
  fall() {
    this.item.y += this.fallSpeed;
    this.fallSpeed += 0.2;
  }
  stay(platformY) {
    this.fallSpeed = 0;
    this.item.y = platformY - this.item.height;
    this.item.state.isJump = false;
  }
  jump() {
    !this.item.state.isJump ? (this.fallSpeed = -6) : "";
    this.item.state.isJump = true;
  }
}
