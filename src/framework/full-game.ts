import { Strategy } from "./types";
import { Utils } from "./utils";

const ACTOR_COUNT = 10;
const RANDOM_PLAY_IN_ONE_ROUND = 5;

class Actor {
  public strategy: Strategy;
  public index: number;
  public rewards: number;
  public gamesCount: number;

  constructor(s: Strategy, i: number) {
    this.strategy = s;
    this.index = i;
    this.rewards = 0;
    this.gamesCount = 0;
  }
}

class FullGame {

  private actors: Actor[];

  private async init() {
    const strategies = await Utils.loadStrategies();
    this.actors = [];
    while (this.actors.length < ACTOR_COUNT) {
      for (const s of strategies) {
        this.actors.push(new Actor(s, this.actors.length));
      }
    }
  }

  // play a whole round game
  // for every actor, will randomly choose other actors to play
  private playWholeRound() {
    for (const a of this.actors) {
      for (let i = 0; i < RANDOM_PLAY_IN_ONE_ROUND; i++) {
        const s1 = a.strategy;
        let opponentIndex = -1;
        while (opponentIndex < 0 || opponentIndex === a.index) {
          opponentIndex = Utils.getRandom(0, this.actors.length - 1);
        }
        const actor2 = this.actors[opponentIndex];
        const s2 = actor2.strategy;
        const result = Utils.play({ s1, s2 });
        a.rewards += result.s1Reward;
        actor2.rewards += result.s2Reward;
        a.gamesCount++;
        actor2.gamesCount++;
        console.log(`Actor ${a.index}(${a.strategy.getName()}) meet ${actor2.index}(${actor2.strategy.getName()}), result is [${result.s1Reward}, ${result.s2Reward}]`);
      }
    }
  }

  public async start() {
    await this.init();
    this.playWholeRound();
    this.outputActors();
  }

  public outputActors() {
    for (const a of this.actors) {
      console.log(a.index, a.strategy.getName(), a.rewards / a.gamesCount);
    }
  }

}

(async () => {
  const playground = new FullGame();
  await playground.start();
})();
