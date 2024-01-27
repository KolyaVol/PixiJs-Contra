import Bullet from "../components/Bullets/Bullet.js";
import Collision from "./Collision.js";

export default class Shooting {
  isControlDown = false;
  isShooting = false;
  itemArr;
  shooter;
  col = new Collision();
  constructor(worldContainer, itemArr, shooter, camera) {
    this.worldContainer = worldContainer;
    this.itemArr = itemArr;
    this.shooter = shooter;
    this.camera = camera;
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
    const bullet = new Bullet(this.worldContainer, 10);
    bullet.prevPoint.x = this.shooter.x + this.shooter.stats.width * 0.7;
    bullet.prevPoint.y = this.shooter.y + this.shooter.height / 2.4;
    bullet.drawBullet();
    this.itemArr.push(bullet);
  }

  removeBullet(item, id) {
    this.itemArr.splice(id, 1);
    this.worldContainer.removeChild(item);
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
          this.col.checkArrCollisionOrientation(item, platformArr).horizontal ||
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
