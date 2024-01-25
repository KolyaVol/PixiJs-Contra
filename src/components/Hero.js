import { Graphics } from "pixi.js";
import Gun from "./Gun";
import Entity from "./Entity";

const heroGraphics = new Graphics();

export default class Hero extends Entity {
  worldContainer;

  stats = {
    lineStyle: { lineWidth: 2, lineColor: 0xff0000 },
    width: 20,
    height: 60,
    speed: 4,
    fallSpeed: 0,
    jumpPower: -8,
  };

  state = {
    isMoveRight: false,
    isMoveLeft: false,
    isJump: false,
    isFly: false,
    isWithGun: false,
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
    this.width = this.stats.width;
    this.isActive = true;
    this.isDead = false;
    this.pivot.x = 11;
    const gun = new Gun(this);
    gun.drawGun(true);
  }

  update() {}
}
