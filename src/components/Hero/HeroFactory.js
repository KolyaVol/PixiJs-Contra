import Hero from "./Hero";
import HeroView from "./HeroView";

export default class HeroFactory {
  worldContainer;
  assets;
  constructor(worldContainer, assets) {
    this.assets = assets;
    this.worldContainer = worldContainer;
  }
  createHero(x, y) {
    const heroView = new HeroView(this.assets);
    this.worldContainer.addChild(heroView);
    const hero = new Hero(heroView);
    hero.x = x;
    hero.y = y;
    return hero;
  }
}
