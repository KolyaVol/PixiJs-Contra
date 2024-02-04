import Runner from "./Runner.js";
import RunnerView from "./RunnerView.js";

export default class RunnerFactory {
  worldContainer;
  #assets;
  constructor(worldContainer, assets) {
    this.#assets = assets;
    this.worldContainer = worldContainer;
  }

  createRunner(x, y) {
    const runnerView = new RunnerView(this.#assets);
    runnerView.showRun();
    this.worldContainer.addChild(runnerView);
    const runner = new Runner(runnerView);
    runner.x = x;
    runner.y = y;
    return runner;
  }
}
