import Bullet from "../components/Bullets/Bullet.js";
import BulletFactory from "../components/Bullets/BulletFactory.js";
import Collision from "./Collision.js";

export default class Shooting {
  isControlDown = false;
  isShooting = false;
  itemArr;
  shooter;
  col = new Collision();
  bulletFactory;
  constructor(worldContainer, itemArr, shooter, camera) {
    this.worldContainer = worldContainer;
    this.itemArr = itemArr;
    this.shooter = shooter;
    this.camera = camera;
    this.bulletFactory = new BulletFactory(this.worldContainer);
  }
  hadleKeyDown(e) {
    switch (e.code) {
      case "ControlLeft":
        this.isControlDown = true;

        break;

      default:
        break;
    }
  }
  hadleKeyUp(e) {
    switch (e.code) {
      case "ControlLeft":
        this.isControlDown = false;

        break;

      default:
        break;
    }
  }
  startObserve() {
    document.addEventListener("keydown", (e) => this.hadleKeyDown(e));
    document.addEventListener("keyup", (e) => this.hadleKeyUp(e));
  }

  addBullet() {
    const bullet = this.bulletFactory.createBullet(
      this.shooter.x + this.shooter.view.bulletPointShift.x,
      this.shooter.y + this.shooter.view.bulletPointShift.y
    );
    bullet.prevPoint.x =
      this.shooter.x + this.shooter.view.collisionBox.width * 0.7;
    bullet.prevPoint.y = this.shooter.y + this.shooter.height / 2.4;
    bullet.view.drawBullet();
    this.itemArr.push(bullet);
  }

  removeBullet(item, id) {
    this.itemArr.splice(id, 1);
    this.worldContainer.removeChild(item.view);
  }

  startShooting(platformArr) {
    if (this.isControlDown) {
      if (!this.isShooting) {
        this.addBullet();
        this.isShooting = true;
        setTimeout(() => {
          this.isShooting = false;
        }, 250);
      }
    }

    for (let i = 0; i < this.itemArr.length; i++) {
      if (this.itemArr[i]) {
        const item = this.itemArr[i];
        item.update(this.shooter);

        if (
          this.col.checkArrCollisionOrientation(item, platformArr).vertical ||
          item.prevPoint.x > 2000
        ) {
          this.removeBullet(item, i);
        } else {
          item.x += item.bulletSpeed;
        }
      }
    }
  }
}
