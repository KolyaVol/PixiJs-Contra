import BulletFactory from "../components/Bullets/BulletFactory.js";
import Collision from "./Collision.js";

export default class Shooting {
  isControlDown = false;
  isShooting = false;
  bulletArr;
  shooter;
  col = new Collision();
  bulletFactory;

  constructor(worldContainer, bulletArr, shooter, camera) {
    this.worldContainer = worldContainer;
    this.bulletArr = bulletArr;
    this.shooter = shooter;
    this.camera = camera;
    this.bulletFactory = new BulletFactory(this.worldContainer);
  }

  hadleKeyDown(e) {
    if (e.code === "ControlLeft") {
      this.isControlDown = true;
    }
  }
  hadleKeyUp(e) {
    if (e.code === "ControlLeft") {
      this.isControlDown = false;
    }
  }
  startObserve() {
    document.addEventListener("keydown", (e) => this.hadleKeyDown(e));
    document.addEventListener("keyup", (e) => this.hadleKeyUp(e));
  }

  addBullet() {
    const bullet = this.bulletFactory.createBullet(this.shooter.bulletContext);

    this.bulletArr.push(bullet);
  }

  removeBullet(item, id) {
    this.bulletArr.splice(id, 1);
    item.removeFromStage();
  }

  startShooting(entityArr) {
    if (this.isControlDown && !this.isShooting) {
      this.addBullet();
      this.isShooting = true;
      setTimeout(() => {
        this.isShooting = false;
      }, 250);
    }

    for (let i = 0; i < this.bulletArr.length; i++) {
      if (this.bulletArr[i]) {
        const item = this.bulletArr[i];
        item.update(this.shooter);

        if (
          this.col.checkArrCollisionOrientation(item, entityArr).vertical ||
          item.prevPoint.x > this.shooter.x + 2000
        ) {
          this.removeBullet(item, i);
        }
      }
    }
  }
}
