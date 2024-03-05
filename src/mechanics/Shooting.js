import BulletFactory from "../components/Bullets/BulletFactory.js";
import Collision from "./Collision.js";

export default class Shooting {
  isControlDown = false;
  isShooting = false;
  bulletArr;
  shooter;
  col = new Collision();
  bulletFactory;
  shootingDelay = 350;
  currentGun = 1;

  constructor(worldContainer, bulletArr, shooter, camera, entityArr) {
    this.worldContainer = worldContainer;
    this.bulletArr = bulletArr;
    this.shooter = shooter;
    this.camera = camera;
    this.bulletFactory = new BulletFactory(this.worldContainer);
    this.entityArr = entityArr;
  }

  hadleKeyDown(e) {
    if (e.code === "ControlLeft") {
      this.isControlDown = true;
    } else if (e.code === "Digit1") {
      this.currentGun = 1;
      this.shootingDelay = 350;
    } else if (e.code === "Digit2") {
      this.currentGun = 2;
      this.shootingDelay = 550;
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
    switch (this.currentGun) {
      case 1:
        const bullet = this.bulletFactory.createBullet(
          this.shooter.bulletContext,
          this.shooter
        );
        this.bulletArr.push(bullet);
        this.entityArr.push(bullet);
        break;

      case 2:
        let angleShift = -20;
        for (let i = 0; i < 5; i++) {
          const localBulletContext = {
            x: this.shooter.bulletContext.x,
            y: this.shooter.bulletContext.y,
            angle: this.shooter.bulletContext.angle + angleShift,
          };
          const fraction = this.bulletFactory.createFraction(
            localBulletContext,
            this.shooter
          );
          this.bulletArr.push(fraction);
          this.entityArr.push(fraction);
          angleShift += 10;
        }
        break;

      default:
        break;
    }
  }

  removeBullet(item, id) {
    this.bulletArr.splice(id, 1);
    item.removeFromStage();
  }

  startShooting(entityArr, shooter) {
    //SHOOTING DELAY
    if (this.isControlDown && !this.isShooting) {
      this.addBullet();
      this.isShooting = true;

      setTimeout(() => {
        this.isShooting = false;
      }, this.shootingDelay);
    }

    // MOVEMENT AND REMOVEMENT OF ALL BULLETS IN ARRAY
    for (let i = 0; i < this.bulletArr.length; i++) {
      if (this.bulletArr[i]) {
        const item = this.bulletArr[i];

        if (
          this.col.checkArrCollisionOrientation(item, entityArr).vertical ||
          item.prevPoint.x > shooter.x + 2000
        ) {
          this.removeBullet(item, i);
        }
      }
    }
  }
}
