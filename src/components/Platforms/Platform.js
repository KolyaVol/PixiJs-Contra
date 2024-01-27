import { Container, Graphics } from "../../../libs/pixi.mjs";

const graphics = new Graphics();

export default class Platform extends Container {
  constructor(lineStyle, drawRect) {
    super();
    this.lineStyle = lineStyle;
    this.drawRect = drawRect;

    graphics.lineStyle(this.lineStyle.lineWidth, this.lineStyle.lineColor);
    graphics.drawRect(
      this.drawRect.x,
      this.drawRect.y,
      this.drawRect.width,
      this.drawRect.height
    );

    this.addChild(graphics);
  }
}
