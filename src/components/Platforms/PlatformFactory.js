import Platform from "./Platform";

export default class PlatformFactory {
  constructor(worldContainer) {
    this.worldContainer = worldContainer;
  }
  createPlatforms(platformArr) {
    platformArr.forEach((element) => {
      const platform = new Platform(
        { lineWidth: element.lineWidth, lineColor: element.lineColor },
        {
          x: element.x,
          y: element.y,
          width: element.width,
          height: element.height,
        }
      );
      this.worldContainer.addChild(platform);
    });
  }
}
