import { Container, Graphics } from "../../libs/pixi.mjs";

const gunGraphics = new Graphics();
export default class Gun extends Container {
  currentGun = {
    name: "Ak-74",
    lineStyle: { lineWidth: 10, lineColor: 0xff0000 },
    gunForm: { x: 10, y: 30, width: 30, height: 0 },
  };
  constructor(container) {
    super();
    this.container = container;
  }
  drawGun(isWithGun) {
    if (isWithGun) {
      gunGraphics.lineStyle(
        this.currentGun.lineStyle.lineWidth,
        this.currentGun.lineStyle.lineColor
      );
      gunGraphics.drawRect(
        this.currentGun.gunForm.x,
        this.currentGun.gunForm.y,
        this.currentGun.gunForm.width,
        this.currentGun.gunForm.height
      );
      //gunGraphics.rotation = -0.1;
      
      this.addChild(gunGraphics);
      this.container.addChild(this);
    }
  }
}
