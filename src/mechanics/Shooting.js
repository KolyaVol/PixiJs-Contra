import BulletFactory from "../components/Bullets/BulletFactory.js";
import Collision from "./Collision.js";

export default class Shooting {
  isControlDown = false;
  isShooting = false;

  col = new Collision();
  bulletFactory;
  shootingDelay = 350;
  currentGun = 1;

  constructor(worldContainer, shooter, entityArr) {
    this.worldContainer = worldContainer;

    this.shooter = shooter;

    this.entityArr = entityArr;
    this.bulletFactory = new BulletFactory(this.worldContainer, this.entityArr);
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
    console.log(this.entityArr);
    switch (this.shooter.currentGun) {
      case 1:
        this.shootingDelay = 350;

        const bullet = this.bulletFactory.createBullet(
          this.shooter.bulletContext,
          this.shooter
        );
        bullet.type = "heroBullet";

        break;

      case 2:
        this.shootingDelay = 550;
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
          fraction.type = "heroFraction";

          angleShift += 10;
        }
        break;

      default:
        break;
    }
  }

  removeBullet(item) {
    item.dead();
    item.destroyIfDead();
  }

  startShooting() {
    //SHOOTING DELAY
    if (this.isControlDown && !this.isShooting) {
      this.addBullet();
      this.isShooting = true;

      setTimeout(() => {
        this.isShooting = false;
      }, this.shootingDelay);
    }
  }
}
