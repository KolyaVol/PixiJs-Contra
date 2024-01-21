import { Graphics } from "pixi.js";
import Entity from "../Entity";

export default class Bullet extends Entity {
  app;
  stats = { name: "bullet", x: 100, y: 30, width: 10, height: 10 };
  currentBullet = {
    name: "5.45",
    lineStyle: { lineWidth: 1, lineColor: 0xff0000 },
  };
  collisionPoint = { x: 0, y: 0 };
  bulletSpeed;
  constructor(worldContainer, bulletSpeed) {
    super();
    this.bulletSpeed = bulletSpeed;
    this.worldContainer = worldContainer;
  }

  drawBullet() {
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
  }
  update(shooter) {
    this.collisionPoint.x =
      shooter.x + shooter.stats.width * 1.6 + this.prevPoint.x;
    this.collisionPoint.y = this.prevPoint.y + shooter.y;
    this.prevPoint.x = this.x;
    this.prevPoint.y += this.y;
  }
}
