import { Graphics } from "../../../libs/pixi.mjs";
import Entity from "../Entity.js";

export default class Bullet extends Entity {
  app;

  bulletSpeed = 10;

  constructor(view) {
    super(view);
    this.view = view;
    this.name = "Bullet";
  }

  update(shooter) {
    this.view.collisionBox.x =
      shooter.x + shooter.view.collisionBox.width + this.prevPoint.x;
    this.view.collisionBox.y = this.prevPoint.y + shooter.y;
    this.prevPoint.x = this.x;
    this.prevPoint.y += this.y;
  }
}
