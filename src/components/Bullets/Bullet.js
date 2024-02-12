import Entity from "../Entity.js";

export default class Bullet extends Entity {
  app;

  bulletSpeed = 10;
  #angle;
  constructor(view, bulletContext) {
    console.log(bulletContext);
    super(view);
    this.view = view;
    this.name = "Bullet";
    this.#angle = bulletContext.angle;
  }

  update(shooter) {
    this.view.collisionBox.x =
      shooter.x + shooter.view.collisionBox.width + this.prevPoint.x;
    this.view.collisionBox.y = this.prevPoint.y + shooter.y;
    this.prevPoint.x = this.x;
    this.prevPoint.y += this.y;
    console.log(this.#angle);
    this.x += this.bulletSpeed * Math.cos(this.#angle);
    this.y += this.bulletSpeed * Math.sin(this.#angle);
  }
}
