import Bullet from "../components/Bullets/Bullet";
import Collision from "./Collision";

export default class Shooting {
  isControlDown = false;
  isShooting = false;
  itemArr;
  shooter;
  col = new Collision();
  constructor(app, itemArr, shooter) {
    this.app = app;
    this.itemArr = itemArr;
    this.shooter = shooter;
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
    bullet.currentBullet.bulletForm.x = this.shooter.x + 30;
    bullet.currentBullet.bulletForm.y =
      this.shooter.y + this.shooter.height / 2.4;
    const newBullet = bullet.drawBullet();
    this.itemArr.push(newBullet);
  }

  removeBullet(item, id) {
    this.itemArr.splice(id, 1);
    this.app.stage.removeChild(item);
  }

  startShooting() {
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
      item.x += 10;

      if (
        this.col.bulletCollision(
          [
            {
              lineWidth: 2,
              lineColor: 0xfffff,
              x: this.app.renderer.width / 2.2,
              y: 500,
              width: 600,
              height: 30,
            },
            {
              lineWidth: 1,
              lineColor: 0xff1111,
              x: 100,
              y: 300,
              width: 100,
              height: 10,
            },
            {
              lineWidth: 1,
              lineColor: 0xf22221,
              x: 200,
              y: 400,
              width: 100,
              height: 20,
            },
            {
              lineWidth: 1,
              lineColor: 0xf33331,
              x: 300,
              y: 500,
              width: 100,
              height: 30,
            },
            {
              lineWidth: 4,
              lineColor: 0x77777,
              x: 600,
              y: 300,
              width: 100,
              height: 400,
            },
          ],
          item,
          this.shooter
        )
      ) {
        item.removeFromParent();
        this.itemArr.splice(i, 1);
      }
    }
  }
}
