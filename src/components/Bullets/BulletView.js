import { Container, Graphics } from "../../../libs/pixi.mjs";

export default class BulletView extends Container {
  worldContainer;
  #assets;
  #rootNode;
  stats = { name: "bullet", x: 100, y: 30, width: 10, height: 10 };
  currentBullet = {
    name: "5.45",
    lineStyle: { lineWidth: 1, lineColor: 0xff0000 },
  };
  #bounds = {
    width: 0,
    height: 0,
  };

  #collisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  #hitBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    shiftX: 0,
    shiftY: 0,
  };

  constructor(assets) {
    super();
    this.#createNodeStructure();
    this.#assets = assets;

    this.#bounds.width = 10;
    this.#bounds.height = 10;

    this.#collisionBox.width = this.#bounds.width;
    this.#collisionBox.height = this.#bounds.height;
  }

  #createNodeStructure() {
    const rootNode = new Container();
    this.addChild(rootNode);
    this.#rootNode = rootNode;
  }

  drawBullet() {
    const bulletGraphics = new Graphics();
    bulletGraphics.lineStyle(1, 0xff0000);
    bulletGraphics.drawRect(50, 25, this.stats.width, this.stats.height);
    this.#rootNode.addChild(bulletGraphics);
  }
}
