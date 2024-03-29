export default class Gravitation {
  constructor() {}

  fall(item) {
    if (!item.state.isPaused) {
      item.y += item.fallSpeed;
      item.fallSpeed += 0.2;
    }
  }

  stay(item, platform) {
    if (item.y >= platform.y) {
      item.y = platform.y + platform.height;
      item.fallSpeed = 2;
      item.y += 1;
    } else {
      item.fallSpeed = 0;
      item.state.isJump
        ? ""
        : (item.y = platform.y - item.view.collisionBox.height);
      item.state.isFly = false;
    }
  }

  jump(item) {
    if (!item.state.isJump && !item.state.isFly) {
      item.state.isJump = true;
      item.fallSpeed = item.jumpPower;
    }
  }
}
