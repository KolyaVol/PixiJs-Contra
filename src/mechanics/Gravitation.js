export default class Gravitation {
  constructor() {}
  fall(item) {
    item.y += item.stats.fallSpeed;
    item.stats.fallSpeed += 0.2;
  }
  stay(item, platformY) {
    item.stats.fallSpeed = 0;
    item.state.isJump = false;
    item.y = platformY - item.stats.height;
  }
  jump(item) {
    !item.state.isJump ? (item.stats.fallSpeed = item.stats.jumpPower) : "";
    item.state.isJump = true;
  }
}
