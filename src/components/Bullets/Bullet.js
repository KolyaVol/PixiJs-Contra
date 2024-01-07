import { Container, Graphics } from "pixi.js";

export default class Bullet extends Container {
  app;
  currentBullet = {
    name: "5.45",
    lineStyle: { lineWidth: 1, lineColor: 0xff0000 },
    bulletForm: { x: 100, y: 30, width: 10, height: 10 },
  };
  constructor(app, bulletSpeed) {
    super();
    this.bulletSpeed = bulletSpeed;
    this.app = app;
  }
  drawBullet() {
    const bullet = new Graphics();
    bullet.lineStyle(
      this.currentBullet.lineStyle.lineWidth,
      this.currentBullet.lineStyle.lineColor
    );
    bullet.drawRect(
      this.currentBullet.bulletForm.x,
      this.currentBullet.bulletForm.y,
      this.currentBullet.bulletForm.width,
      this.currentBullet.bulletForm.height
    );

    this.addChild(bullet);
    this.app.stage.addChild(bullet);
    return bullet;
  }
}
