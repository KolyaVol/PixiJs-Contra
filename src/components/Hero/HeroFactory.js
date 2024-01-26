import Hero from "./Hero";
import HeroView from "./HeroView";

export default class HeroFactory {
  worldContainer;
  constructor(worldContainer) {
    this.worldContainer = worldContainer;
  }
  createHero(x, y) {
    const heroView = new HeroView(this.worldContainer);
    this.worldContainer.addChild(heroView);
    const hero = new Hero(heroView);
    hero.x = x;
    hero.y = y;
    return hero;
  }
}
