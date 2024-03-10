import Entity from "../Entity.js";

export default class Bullet extends Entity {
  app;
  shooter;
  bulletSpeed = 10;
  #angle;
  isEnemy = true;
  constructor(view, bulletContext) {
    super(view);
    this.view = view;
    this.type = "Bullet";
    this.#angle = (bulletContext.angle * Math.PI) / 180;
  }

  doDamage(collisionResult) {
    let target = null;
    collisionResult.forEach((result) => {
      if (
        (result.area?.type !== "platform" || result.area?.type !== "water") &&
        result.isCollide
      ) {
        target = result.area;
      }
    });

    if (target) {
      if (target.type === "Tourelle" && this.isEnemy) {
        return;
      } else target.damage();
    }
  }

  update(collisionResult) {
    console.log(collisionResult);
    let shooter = this.shooter;

    this.view.collisionBox.x =
      shooter.x + shooter.view.collisionBox.width + this.prevPoint.x;
    this.view.collisionBox.y = this.prevPoint.y + shooter.y;

    this.prevPoint.x = this.x;
    this.prevPoint.y += this.y;

    this.x += this.bulletSpeed * Math.cos(this.#angle);
    this.y += this.bulletSpeed * Math.sin(this.#angle);

    this.doDamage(collisionResult);
  }
}
