import { Container, Graphics } from "../../../libs/pixi.mjs";

export default class BulletView extends Container {
  worldContainer;
  #assets;
  #rootNode;

  #hitBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    shiftX: 0,
    shiftY: 0,
  };

  #collisionBox = {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
  };

  constructor(assets) {
    super();
    this.#createNodeStructure();
    this.#assets = assets;
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

  drawBullet() {
    const bulletGraphics = new Graphics();
    bulletGraphics.lineStyle(1, 0xff0000);
    bulletGraphics.drawRect(
      this.#collisionBox.x,
      this.#collisionBox.y,
      this.#collisionBox.width,
      this.#collisionBox.height
    );
    this.#rootNode.addChild(bulletGraphics);
  }
}
