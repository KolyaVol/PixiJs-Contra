import Bullet from "./Bullet.js";
import BulletView from "./BulletView.js";

export default class BulletFactory {
  worldContainer;
  #assets;
  constructor(worldContainer) {
    this.worldContainer = worldContainer;
  }

  createBullet(x, y) {
    const bulletView = new BulletView(this.#assets);
    bulletView.drawBullet();
    this.worldContainer.addChild(bulletView);
    const bullet = new Bullet(bulletView);
    bullet.x = x;
    bullet.y = y;
    return bullet;
  }
}
