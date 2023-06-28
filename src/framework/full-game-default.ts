import { Actor, FullGame } from "./full-game-framework";
import { Utils } from "./utils";

export class DefaultFullGame extends FullGame {

  private ACTOR_COUNT = 100;
  private RANDOM_PLAY_IN_ONE_ROUND = 30;

  protected async init() {
    const strategies = await Utils.loadStrategies();
    this.actors = [];
    while (this.actors.length < this.ACTOR_COUNT) {
      for (const s of strategies) {
        this.actors.push(new Actor(s, this.actors.length));
      }
    }
  }

  protected playWholeRound() {
    for (const a of this.actors) {
      for (let i = 0; i < this.RANDOM_PLAY_IN_ONE_ROUND; i++) {
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
      }
    }
  }

  protected changeStrategy(): void {
    // sort by average rewards
    this.actors.sort((a, b) => b.rewards / b.gamesCount - a.rewards / a.gamesCount);
    for (let i = 1; i <= 10; i++) {
      this.actors[this.actors.length - i].strategy = this.actors[i - 1].strategy;
    }
  }

}
