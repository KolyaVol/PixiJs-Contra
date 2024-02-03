import Platform from "./Platform.js";
import PlatformView from "./PlatformView.js";

export default class PlatformFactory {
  constructor(worldContainer, assets) {
    this.worldContainer = worldContainer;
    this.assets = assets;
    console.log(assets);
  }

  createPlatform(x, y, width, height, type) {
    const platformView = new PlatformView(width, height, this.assets);
    switch (type) {
      case "platform":
        platformView.drawPlatform();
        this.worldContainer.background.addChild(platformView);
        break;
      case "water":
        platformView.drawWater();
        this.worldContainer.foreground.addChild(platformView);
        break;

      default:
        platformView.drawPlatform();
        this.worldContainer.game.addChild(platformView);
        break;
    }

    const platform = new Platform(platformView);
    platform.x = x;
    platform.y = y;
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
