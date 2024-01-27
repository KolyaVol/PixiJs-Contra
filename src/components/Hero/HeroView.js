import { Container, Sprite } from "../../../libs/pixi.mjs";

export default class HeroView extends Container {
  worldContainer;
  #assets;
  #rootNode;
  constructor(worldContainer, assets) {
    super();
    this.#assets = assets;
    this.worldContainer = worldContainer;
    this.#getStayImage();
    this.#createNodeStructure();
  }

  #getStayImage() {
    const view = new Sprite(this.#assets.getTexture("stay0000"));
    return view;
  }

  flip(direction) {
    switch (direction) {
      case 1:
      case -1:
        this.#rootNode.scale.x = direction;
    }
  }

  #createNodeStructure() {
    const rootNode = new Container();
    this.addChild(rootNode);
    this.#rootNode = rootNode;
  }
}
