import Powerup from "./Powerup.js";
import PowerupView from "./PowerupView.js";
import SpreadgunPowerup from "./SpreadgunPowerup.js";
import SpreadgunPowerupView from "./SpreadgunPowerupView.js";

export default class PowerupsFactory {
  #assets;
  #worldContainer;
  #target;

  constructor(assets, worldContainer, target, entityArr) {
    this.entityArr = entityArr;
    this.#assets = assets;
    this.#worldContainer = worldContainer;
    this.#target = target;
  }

  createPowerup(x, y) {
    const view = new PowerupView(this.#assets);

    const powerup = new Powerup(this, view, y, this.#target);

    view.x = x;

    this.#worldContainer.addChild(view);
    this.entityArr.push(powerup);
  }

  createSpreadGunPowerup(x, y) {
    const view = new SpreadgunPowerupView(this.#assets);
    const powerup = new SpreadgunPowerup(view);

    powerup.x = x;
    powerup.y = y;
    powerup.target = this.#target;
    
    this.#worldContainer.addChild(view);
    this.entityArr.push(powerup);
  }
}
