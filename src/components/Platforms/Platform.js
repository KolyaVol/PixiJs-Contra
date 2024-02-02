import { Graphics } from "../../../libs/pixi.mjs";
import Entity from "../Entity.js";

const graphics = new Graphics();

export default class Platform extends Entity {
  constructor(view) {
    super(view);
    this.view = view;
  }
}
