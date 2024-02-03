import {
  Container,
  Graphics,
  Sprite,
  TilingSprite,
} from "../../../libs/pixi.mjs";

export default class PlatformView extends Container {
  #collisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  #assets;
  #rootNode;

  constructor(width, height, assets) {
    super();
    this.#collisionBox.width = width;
    this.#collisionBox.height = height;
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

  drawPlatform() {
    const platformGraphics = new Graphics();
    platformGraphics.lineStyle(0, 0xff0000);
    platformGraphics.beginFill(0x00ffff);
    platformGraphics.drawRect(
      this.collisionBox.x,
      this.collisionBox.y,
      this.collisionBox.width,
      this.collisionBox.height
    );
    const view = new TilingSprite(
      this.#assets.getTexture("platform0000"),
      this.collisionBox.width,
      129
    );
    const ground = new TilingSprite(
      this.#assets.getTexture("ground0000"),
      this.collisionBox.width,
      129
    );
    ground.y = view.height - 1;
    const ground2 = new TilingSprite(
      this.#assets.getTexture("ground0000"),
      this.collisionBox.width,
      129
    );
    ground2.y = view.height * 2 - 2;
    const ground3 = new TilingSprite(
      this.#assets.getTexture("ground0000"),
      this.collisionBox.width,
      129
    );
    ground3.y = view.height * 3 - 4;

    view.addChild(ground);
    view.addChild(ground2);
    view.addChild(ground3);

    view.clampMargin = 1.5;
    platformGraphics.addChild(view);
    this.#rootNode.addChild(platformGraphics);
  }

  drawWater() {
    const platformGraphics = new Graphics();
    platformGraphics.lineStyle(1, 0xffffff);
    platformGraphics.beginFill(0xffffff);

    platformGraphics.drawRect(
      this.collisionBox.x,
      this.collisionBox.y - this.collisionBox.height,
      this.collisionBox.width,
      this.collisionBox.height
    );

    const view = new TilingSprite(
      this.#assets.getTexture("water0000"),
      this.collisionBox.width
    );
    view.y = -this.collisionBox.height;
    view.clampMargin = 1.5;
    platformGraphics.addChild(view);
    this.#rootNode.addChild(platformGraphics);
  }
}
