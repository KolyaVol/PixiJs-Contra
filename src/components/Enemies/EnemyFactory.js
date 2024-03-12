import Runner from "./Runner/Runner.js";
import RunnerView from "./Runner/RunnerView.js";
import Tourelle from "./Tourelle/Tourelle.js";
import TourelleView from "./Tourelle/TourelleView.js";
import BossView from "./Boss/BossView.js";
import Boss from "./Boss/Boss.js";
import BossGunView from "./Boss/BossGunView.js";
import BossGun from "./Boss/BossGun.js";
import BulletFactory from "../Bullets/BulletFactory.js";

export default class EnemyFactory {
  worldContainer;
  #assets;
  constructor(worldContainer, assets, target, entityArr, bulletArr) {
    this.#assets = assets;
    this.worldContainer = worldContainer;
    this.target = target;
    this.entityArr = entityArr;
    this.bulletArr = bulletArr;
    this.bulletFactory = new BulletFactory(worldContainer, this.entityArr);
  }

  createRunner(x, y) {
    const runnerView = new RunnerView(this.#assets);
    runnerView.showRun();
    this.worldContainer.addChild(runnerView);
    const runner = new Runner(runnerView);
    runner.x = x;
    runner.y = y;
    this.entityArr.push(runner);
    return runner;
  }

  createTourelle(x, y) {
    const view = new TourelleView(this.#assets);
    this.worldContainer.addChild(view);

    const tourelle = new Tourelle(
      view,
      this.target,
      this.bulletFactory,
      this.entityArr,
      this.bulletArr
    );
    tourelle.x = x;
    tourelle.y = y;

    this.entityArr.push(tourelle);

    return tourelle;
  }

  createBoss(x, y) {
    const view = new BossView(this.#assets);
    this.worldContainer.addChild(view);

    const boss = new Boss(view);
    boss.x = x - 35;
    boss.y = y + 95;

    this.entityArr.push(boss);

    const gun1 = this.#createBossGun();
    gun1.x = x - 56;
    gun1.y = y;

    const gun2 = this.#createBossGun();
    gun2.x = x + 34;
    gun2.y = y;

    return boss;
  }

  #createBossGun() {
    const gunView = new BossGunView(this.#assets);
    this.worldContainer.addChild(gunView);
    const bossGun = new BossGun(gunView, this.target, this.bulletFactory);
    this.entityArr.push(bossGun);
    return bossGun;
  }
}
