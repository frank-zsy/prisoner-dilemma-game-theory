import { Utils } from "./utils";

class PrisonerDillemaPlayground {

  public async start() {

    console.log('Going to play the games');
    const strategies = await Utils.loadStrategies();
    console.log(`Load ${strategies.length} strategies: ${strategies.map(s => s.getName()).join(',')}`);

    for (let i = 0; i < strategies.length; i++) {
      for (let j = i; j < strategies.length; j++) {
        const s1 = strategies[i];
        const s2 = strategies[j];
        const result = Utils.play({ s1, s2 });
        console.log(`Strategy 1: ${s1.getName()}, strategy 2: ${s2.getName()}, result is [${result.s1Reward},${result.s2Reward}]`);
      }
    }
  }

}

(async () => {
  const playground = new PrisonerDillemaPlayground();
  await playground.start();
})();
