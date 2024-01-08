import Bullet from "../components/Bullets/Bullet";

export default class Shooting {
  isControlDown = false;
  isShooting = false;
  itemArr;
  shooter;
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

    this.itemArr.forEach((item) => {
      item.x += 10;
    });
  }
}
