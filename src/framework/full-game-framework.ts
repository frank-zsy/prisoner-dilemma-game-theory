import { Strategy } from "./types";

export class Actor {
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

  public clear() {
    this.rewards = 0;
    this.gamesCount = 0;
  }
}

export abstract class FullGame {

  protected actors: Actor[];

  public constructor() {
    this.actors = [];
  }

  // init actors
  protected abstract init(): Promise<void>;

  // play a whole round game
  // for every actor, will randomly choose other actors to play
  protected abstract playWholeRound(): void;

  // after a whole round play, actors can change strategy
  protected abstract changeStrategy(): void;

  private strategiesStat(): Map<string, number> {
    const result = new Map<string, number>();
    for (const a of this.actors) {
      result.set(a.strategy.getName(), (result.get(a.strategy.getName()) ?? 0) + 1);
    }
    return result;
  }

  private outputStat(s: Map<string, number>) {
    const arr = Array.from(s.entries()).sort((a, b) => b[1] - a[1]);
    console.log(`The strategis are ${arr.map(a => `${a[0]}:${a[1]}`).join(',')}`);
  }

  public async start() {
    await this.init();
    let rounds = 0;
    while (true) {
      rounds++;
      const formerStat = this.strategiesStat();
      this.playWholeRound();
      this.changeStrategy();
      const latterStat = this.strategiesStat();

      let converged = true;
      for (const s of formerStat.keys()) {
        if (formerStat.get(s) !== latterStat.get(s)) {
          converged = false;
        }
      }
      if (converged) break;

      // clear rewards after each round
      for (const a of this.actors) {
        a.clear();
      }
    }
    console.log(`The full game converged after ${rounds} rounds`);
    this.outputStat(this.strategiesStat());
  }

}
