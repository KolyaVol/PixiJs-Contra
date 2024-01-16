export default class Gravitation {
  constructor() {}
  fall(item) {
    item.y += item.stats.fallSpeed;
    item.stats.fallSpeed += 0.2;
  }
  stay(item, platform) {
    console.log(`${item.y} + ${platform.y}
    =======`);
    if (item.y >= platform.y) {
      
      item.y = platform.y + platform.height;
      item.stats.fallSpeed = 2;
      item.y += 1;
    } else {
      item.stats.fallSpeed = 0;
      !item.state.isJump ? (item.y = platform.y - item.stats.height) : "";
      item.state.isFly = false;
    }
  }
  jump(item) {
    item.state.isJump && item.state.isFly
      ? ""
      : (item.stats.fallSpeed = item.stats.jumpPower);
    item.state.isJump = true;
  }
}
