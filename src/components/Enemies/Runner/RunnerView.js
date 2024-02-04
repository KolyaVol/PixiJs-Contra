import {
  AnimatedSprite,
  Container,
  Sprite,
} from "../../../../libs/pixi.mjs";

export default class RunnerView extends Container {
  worldContainer;
  #assets;
  #rootNode;

  collisionBox = {
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
  #stm = {
    currentState: "default",
    states: {},
  };

  constructor(assets) {
    super();

    this.#assets = assets;

    this.#createNodeStructure();
    this.#rootNode.x = 10;

    this.collisionBox.width = 20;
    this.collisionBox.height = 90;

    this.#rootNode.pivot.x = 10;

    this.#stm.states.run = this.#getRunImage();
    this.#stm.states.jump = this.#getJumpImage();
    this.#stm.states.fall = this.#getFallImage();

    for (let key in this.#stm.states) {
      this.#rootNode.addChild(this.#stm.states[key]);
    }
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

  showRun() {
    this.#toState("run");
    this.#hitBox.width = 20;
    this.#hitBox.height = 90;
    this.#hitBox.shiftX = 0;
    this.#hitBox.shiftY = 0;
  }

  showJump() {
    this.#toState("jump");

    this.#hitBox.width = 40;
    this.#hitBox.height = 40;
    this.#hitBox.shiftX = -10;
    this.#hitBox.shiftY = 25;
  }

  showFall() {
    this.#toState("fall");

    this.#hitBox.width = 20;
    this.#hitBox.height = 90;
    this.#hitBox.shiftX = 0;
    this.#hitBox.shiftY = 0;
  }

  #toState(key) {
    if (this.#stm.currentState == key) {
      return;
    }
    for (let key in this.#stm.states) {
      this.#stm.states[key].visible = false;
    }
    this.#stm.states[key].visible = true;
    this.#stm.currentState = key;
  }

  #getRunImage() {
    const view = new AnimatedSprite(this.#assets.getAnimationTextures("run"));
    view.animationSpeed = 1 / 10;
    view.play();
    view.y -= 3;
    return view;
  }

  #getJumpImage() {
    const view = new AnimatedSprite(this.#assets.getAnimationTextures("jump"));
    view.animationSpeed = 1 / 10;
    view.play();
    view.y -= 3;
    view.x -= 10;
    return view;
  }

  #getFallImage() {
    const view = new Sprite(this.#assets.getTexture("run0003"));
    return view;
  }
}
