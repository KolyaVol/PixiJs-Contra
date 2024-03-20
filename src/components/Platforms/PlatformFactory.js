import { Sprite } from "../../../libs/pixi.mjs";
import BridgePlatform from "./BridgePlatform.js";
import Platform from "./Platform.js";
import PlatformView from "./PlatformView.js";

export default class PlatformFactory {
  constructor(worldContainer, assets, entityArr, target) {
    this.worldContainer = worldContainer;
    this.assets = assets;
    this.entityArr = entityArr;
    this.platformWidth = 129;
    this.platformHeight = 40;
    this.target = target;
  }

  createPlatform(x, y, width, height, type) {
    const platformView = new PlatformView(
      width,
      height,
      this.assets,
      this.platformWidth
    );
    switch (type) {
      case "platform":
        platformView.drawPlatform();
        this.worldContainer.game.addChild(platformView);
        break;
      case "bPlatform":
        platformView.drawPlatform();
        this.worldContainer.background.addChild(platformView);
        break;
      case "water":
        platformView.drawWater();
        this.worldContainer.foreground.addChild(platformView);
        break;

      default:
        platformView.drawPlatform();
        this.worldContainer.background.addChild(platformView);
        break;
    }

    const platform = new Platform(platformView);
    platform.x = x * this.platformWidth;
    platform.y = y;
    this.entityArr.push(platform);
    return platform;
  }

  createBridge(x, y) {
    const skin = new Sprite(this.assets.getTexture("bridge0000"));
    const view = new PlatformView(
      1,
      this.platformHeight,
      this.assets,
      this.platformWidth
    );

    view.addChild(skin);

    const platform = new BridgePlatform(view, this.assets);
    platform.setTarget(this.target);
    platform.x = x * this.platformWidth;
    platform.y = y;

    this.worldContainer.background.addChild(view);
    this.entityArr.push(platform);
    return platform;
  }

  createPlatforms(platformArr) {
    platformArr.forEach((platform) => {
      this.createPlatform(
        platform.x,
        platform.y,
        platform.width,
        platform.height,
        platform.type
      );
    });
  }
}
