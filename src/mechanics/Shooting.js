import Bullet from "../components/Bullets/Bullet";

export default class Shooting {
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
        this.addBullet();
        break;

      default:
        break;
    }
  }
  hadleKeyUp(e) {
    switch (e.code) {
      case "ControlLeft":
        this.isShooting = false;
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
    bullet.currentBullet.bulletForm.x = this.shooter.x;
    bullet.currentBullet.bulletForm.y = this.shooter.y;
    const newBullet = bullet.drawBullet();
    this.itemArr.push(newBullet);
  }

  startShooting() {
    this.itemArr.forEach((item) => {
      item.x += 10;
    });
  }
}
