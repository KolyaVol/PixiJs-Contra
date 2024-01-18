import Bullet from "../components/Bullets/Bullet";
import Collision from "./Collision";

export default class Shooting {
  isControlDown = false;
  isShooting = false;
  itemArr;
  shooter;
  col = new Collision();
  constructor(app, itemArr, shooter, camera) {
    this.app = app;
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
    const bullet = new Bullet(this.app, 10);
    console.log(`====
    ${this.shooter.x + 30}`);
    bullet.currentBullet.bulletForm.x =
      this.shooter.x + 30 + this.camera.world.x;
    bullet.currentBullet.bulletForm.y =
      this.shooter.y + this.shooter.height / 2.4;
    const newBullet = bullet.drawBullet();
    this.itemArr.push(newBullet);
  }

  removeBullet(item, id) {
    this.itemArr.splice(id, 1);
    this.app.stage.removeChild(item);
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
      const item = this.itemArr[i];
      if (this.col.bulletCollision(platformArr, item, this.shooter)) {
        item.removeFromParent();
        this.itemArr.splice(i, 1);
      } else item.x += 10;
    }
  }
}
