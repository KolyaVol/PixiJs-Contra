import Entity from "../Entity.js";

export default class Bullet extends Entity {
  app;
  shooter;
  bulletSpeed = 10;
  #angle;
  #selfDestroyCounter;
  constructor(view, bulletContext) {
    super(view);
    this.maxHp = 1;
    this.hp = this.maxHp;
    this.view = view;
    this.type = "enemyBullet";
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
      if (
        ((target.type === "Tourelle" || target.type === "BossGun") &&
          this.type === "enemyBullet") ||
        (this.type === "heroFraction" && target.type === "heroFraction") ||
        (this.type === "heroFraction" && target.type === "Hero") ||
        (this.type === "heroBullet" && target.type === "Hero")
      ) {
        return;
      } else {
        target.damage();
        this.damage();
        this.destroyIfDead();
      }
    }
  }

  update(collisionResult) {
    this.#selfDestroyCounter++;
    if (this.#selfDestroyCounter === 5000) {
      this.dead();
      this.destroyIfDead();
    }
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
