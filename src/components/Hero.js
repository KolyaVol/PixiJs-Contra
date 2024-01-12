import { Container, Graphics } from "pixi.js";

const heroGraphics = new Graphics();
const gunGraphics = new Graphics();

export default class Hero extends Container {
  stats = {
    lineStyle: { lineWidth: 2, lineColor: 0xff0000 },
    width: 20,
    height: 60,
  };
  worldContainer;
  maxSpeed = 4;
  startFallSpeed = 1;
  state = { isJump: false, isWithGun: false };

  currentGun = {
    name: "Ak-74",
    lineStyle: { lineWidth: 10, lineColor: 0xff0000 },
    gunForm: { x: 10, y: 30, width: 30, height: 0 },
  };
  constructor(worldContainer) {
    super();
    this.worldContainer = worldContainer;
  }

  drawHero() {
    heroGraphics.lineStyle(
      this.stats.lineStyle.lineWidth,
      this.stats.lineStyle.lineColor
    );
    heroGraphics.drawRect(0, 0, this.stats.width - 2, this.stats.height - 2);
    // heroGraphics.transform.skew.x = -0.1;
    this.addChild(heroGraphics);
    this.worldContainer.addChild(this);
  }

  drawGun() {
    if (!this.state.isWithGun) {
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
    }
  }
}
