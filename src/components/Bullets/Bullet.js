import Entity from "../Entity.js";

export default class Bullet extends Entity {
  app;

  bulletSpeed = 10;
  #angle = 0;
  constructor(view, angle) {
    super(view);
    this.view = view;
    this.name = "Bullet";
    this.#angle = (angle * Math.PI) / 180;
  }

  update(shooter) {
    this.view.collisionBox.x =
      shooter.x + shooter.view.collisionBox.width + this.prevPoint.x;
    this.view.collisionBox.y = this.prevPoint.y + shooter.y;
    this.prevPoint.x = this.x;
    this.prevPoint.y += this.y;
    console.log(this.#angle);
    this.x += this.bulletSpeed * Math.cos(this.#angle);
    // this.x += this.speed * Math.cos(this.#angle);
    // this.y += this.speed * Math.sin(this.#angle);
  }
}
