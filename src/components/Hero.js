import { Container, Graphics } from "pixi.js";
import Gun from "./Gun";

const heroGraphics = new Graphics();

export default class Hero extends Container {
  worldContainer;

  stats = {
    lineStyle: { lineWidth: 2, lineColor: 0xff0000 },
    width: 20,
    height: 60,
    maxSpeed: 4,
    startFallSpeed: 1,
  };

  state = { isJump: false, isWithGun: false };

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
    this.worldContainer.addChild(this);
    const gun = new Gun(this);
    gun.drawGun(true);
  }
}
