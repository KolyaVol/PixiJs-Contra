import { Container, Graphics } from "../../../libs/pixi.mjs";

export default class PlatformView extends Container {
  #collisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  #rootNode;

  constructor(width, height) {
    super();
    this.#collisionBox.width = width;
    this.#collisionBox.height = height;
    this.#createNodeStructure();
  }

  get collisionBox() {
    this.#collisionBox.x = this.x;
    this.#collisionBox.y = this.y;
    return this.#collisionBox;
  }

  #createNodeStructure() {
    const rootNode = new Container();
    this.addChild(rootNode);
    this.#rootNode = rootNode;
  }

  drawPlatform() {
    const platformGraphics = new Graphics();
    platformGraphics.lineStyle(1, 0xff0000);
    platformGraphics.beginFill(0x00ffff);
    platformGraphics.drawRect(
      this.collisionBox.x,
      this.collisionBox.y,
      this.collisionBox.width,
      this.collisionBox.height
    );
    this.#rootNode.addChild(platformGraphics);
  }

  drawWater() {
    const platformGraphics = new Graphics();
    platformGraphics.lineStyle(1, 0xf21300);
    platformGraphics.beginFill(0x04342f);
    platformGraphics.drawRect(
      this.collisionBox.x,
      this.collisionBox.y - this.collisionBox.height,
      this.collisionBox.width,
      this.collisionBox.height
    );
    this.#rootNode.addChild(platformGraphics);
  }
}
