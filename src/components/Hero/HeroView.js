import {
  AnimatedSprite,
  Container,
  Graphics,
  Sprite,
} from "../../../libs/pixi.mjs";

export default class HeroView extends Container {
  worldContainer;
  #assets;
  #rootNode;
  #stm = {
    currentState: "default",
    states: {},
  };
  constructor(assets) {
    super();
    this.#assets = assets;
    this.#getStayImage();
    this.#createNodeStructure();

    this.#stm.states.stay = this.#getStayImage();
    this.#stm.states.stayUp = this.#getStayUpImage();
    this.#stm.states.run = this.#getRunImage();
    this.#stm.states.runShoot = this.#getRunShootImage();
    this.#stm.states.runUp = this.#getRunUpImage();
    this.#stm.states.runDown = this.#getRunDownImage();
    this.#stm.states.lay = this.#getLayImage();
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
  #getStayImage() {
    const view = new Sprite(this.#assets.getTexture("stay0000"));
    return view;
  }
  #getStayUpImage() {
    const view = new Sprite(this.#assets.getTexture("stayup0000"));
    view.x += 2;
    view.y -= 31;
    return view;
  }

  #getRunImage() {
    const view = new AnimatedSprite(this.#assets.getAnimationTextures("run"));
    view.animationSpeed = 1 / 10;
    view.play();
    view.y -= 3;
    return view;
  }

  #getRunShootImage() {
    const container = new Container();

    const upperPart = new Sprite(this.#assets.getTexture("stay0000"));
    upperPart.x = 8;
    upperPart.y = 2;

    const upperPartMask = new Graphics();
    upperPartMask.beginFill(0xffffff);
    upperPartMask.drawRect(0, 0, 100, 45);

    upperPart.mask = upperPartMask;

    const bottomPart = new AnimatedSprite(
      this.#assets.getAnimationTextures("run")
    );
    bottomPart.animationSpeed = 1 / 10;
    bottomPart.play();
    bottomPart.y -= 3;

    const bottomPartMask = new Graphics();
    bottomPartMask.beginFill(0xffffff);
    bottomPartMask.drawRect(0, 45, 100, 45);

    bottomPart.mask = bottomPartMask;

    container.addChild(upperPart);
    container.addChild(bottomPart);
    container.addChild(upperPartMask);
    container.addChild(bottomPartMask);

    return container;
  }

  #getRunUpImage() {
    const view = new AnimatedSprite(this.#assets.getAnimationTextures("runup"));
    view.animationSpeed = 1 / 10;
    view.play();
    view.y -= 3;
    return view;
  }

  #getRunDownImage() {
    const view = new AnimatedSprite(
      this.#assets.getAnimationTextures("rundown")
    );
    view.animationSpeed = 1 / 10;
    view.play();
    view.y -= 3;
    return view;
  }

  #getLayImage() {
    const view = new Sprite(this.#assets.getTexture("lay0000"));
    view.x -= 25;
    view.y += 50;
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
