import Bullet from "./Bullet.js";
import BulletView from "./BulletView.js";

export default class BulletFactory {
  worldContainer;
  #assets;
  constructor(worldContainer, entityArr) {
    this.worldContainer = worldContainer;
    this.entityArr = entityArr;
  }

  createBullet(bulletContext, shooter) {
    const bulletView = new BulletView(this.#assets);
    bulletView.drawBullet();
    this.worldContainer.addChild(bulletView);

    const bullet = new Bullet(bulletView, bulletContext);
    bullet.x = bulletContext.x;
    bullet.y = bulletContext.y;
    bullet.shooter = shooter;
    this.entityArr.push(bullet);
    return bullet;
  }

  createFraction(bulletContext, shooter) {
    const fractionView = new BulletView(this.#assets);
    fractionView.drawFraction();
    this.worldContainer.addChild(fractionView);
    const fraction = new Bullet(fractionView, bulletContext);
    fraction.x = bulletContext.x;
    fraction.y = bulletContext.y;
    fraction.shooter = shooter;
    fraction.bulletSpeed = 8;
    this.entityArr.push(fraction);
    return fraction;
  }
}
