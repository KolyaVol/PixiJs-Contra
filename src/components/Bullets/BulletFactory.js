import Bullet from "./Bullet.js";
import BulletView from "./BulletView.js";

export default class BulletFactory {
  worldContainer;
  #assets;
  constructor(worldContainer) {
    this.worldContainer = worldContainer;
  }

  createBullet(bulletContext) {
    const bulletView = new BulletView(this.#assets);
    bulletView.drawBullet();
    this.worldContainer.addChild(bulletView);
    const bullet = new Bullet(bulletView, bulletContext);
    bullet.x = bulletContext.x;
    bullet.y = bulletContext.y;
    return bullet;
  }

  createFraction(x, y) {
    const fractionView = new BulletView(this.#assets);
    fractionView.drawFraction();
    this.worldContainer.addChild(fractionView);
    const fraction = new Bullet(fractionView);
    fraction.x = x;
    fraction.y = y;
    fraction.bulletSpeed = 8;
    return fraction;
  }

  // createSpreadGunBullet(bulletContext) {
  //   const skin = new Graphics();
  //   skin.beginFill(0xff2222);
  //   skin.drawCircle(0, 0, 6);
  //   skin.beginFill(0xdddddd);
  //   skin.drawCircle(-3, -3, 3);

  //   const view = new BulletView();
  //   view.addChild(skin);

  //   this.#worldContainer.addChild(view);

  //   const bullet = new Bullet(view, bulletContext.angle);
  //   bullet.x = bulletContext.x;
  //   bullet.y = bulletContext.y;
  //   bullet.type = bulletContext.type;
  //   bullet.speed = 7;

  //   this.#entities.push(bullet);
  // }
}
