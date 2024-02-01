import { Graphics } from "../../../libs/pixi.mjs";
import Entity from "../Entity.js";

export default class Bullet extends Entity {
  app;
  
  collisionPoint = { x: 0, y: 0 };
  bulletSpeed = 10;

  constructor(view) {
    super(view);
    this.view = view;
    this.name = "Bullet";
  }

  /* drawBullet() {
    const bulletGraphics = new Graphics();
    bulletGraphics.lineStyle(
      this.currentBullet.lineStyle.lineWidth,
      this.currentBullet.lineStyle.lineColor
    );
    bulletGraphics.drawRect(
      this.prevPoint.x,
      this.prevPoint.y,
      this.stats.width,
      this.stats.height
    );

    this.addChild(bulletGraphics);
    this.worldContainer.addChild(this);
  }*/

  update(shooter) {
    this.collisionPoint.x =
      shooter.x + shooter.view.collisionBox.width * 1.6 + this.prevPoint.x;
    this.collisionPoint.y = this.prevPoint.y + shooter.y;
    this.prevPoint.x = this.x;
    this.prevPoint.y += this.y;
  }
}
