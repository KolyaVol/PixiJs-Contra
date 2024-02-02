import Platform from "./Platform.js";
import PlatformView from "./PlatformView.js";

export default class PlatformFactory {
  constructor(worldContainer) {
    this.worldContainer = worldContainer;
  }

  createPlatform(x, y, width, height) {
    const platformView = new PlatformView(width, height);
    platformView.drawPlatform();
    this.worldContainer.addChild(platformView);
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
        platform.height
      );
    });
  }
}
