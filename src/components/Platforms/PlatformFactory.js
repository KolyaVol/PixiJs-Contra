import Platform from "./Platform";

export default class PlatformFactory {
  constructor(app) {
    this.app = app;
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
      this.app.stage.addChild(platform);
    });
  }
}
