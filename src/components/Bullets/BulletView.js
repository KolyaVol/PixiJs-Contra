import { Container, Graphics } from "../../../libs/pixi.mjs";

export default class BulletView extends Container {
  worldContainer;
  #rootNode;

  collisionBox = {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
  };

  constructor() {
    super();
    this.#createNodeStructure();
  }

  #createNodeStructure() {
    const rootNode = new Container();
    this.addChild(rootNode);
    this.#rootNode = rootNode;
  }

  drawBullet() {
    const bulletGraphics = new Graphics();
    bulletGraphics.lineStyle(1, 0xff0000);
    bulletGraphics.beginFill(0xff0000);
    bulletGraphics.drawRect(
      this.collisionBox.x,
      this.collisionBox.y,
      this.collisionBox.width,
      this.collisionBox.height
    );

    this.#rootNode.addChild(bulletGraphics);
  }
  
  drawFraction() {
    const fractionGraphics = new Graphics();
    fractionGraphics.beginFill(0xff2222);
    fractionGraphics.drawCircle(0, 0, 6);
    fractionGraphics.beginFill(0xdddddd);
    fractionGraphics.drawCircle(-3, -3, 3);

    this.#rootNode.addChild(fractionGraphics);
  }
}
