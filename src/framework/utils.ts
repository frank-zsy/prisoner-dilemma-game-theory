import { existsSync, readdirSync } from "fs";
import { join } from "path";
import { Step, Strategy } from "./types";

interface PlayOptions {
  s1: Strategy;
  s2: Strategy;
  totalRound?: number;
  bothCooperateReward?: number;
  bothBetrayReward?: number;
  cooperateWithBetrayReward?: number;
  betrayWithCooperateReward?: number;
};

interface PlayResult {
  s1Steps: Step[];
  s2Steps: Step[];
  s1Reward: number;
  s2Reward: number;
};

export class Utils {
  // load all the strategies
  public static async loadStrategies(): Promise<Strategy[]> {
    const strategiesBasePath = './lib/strategies';
    const dirs = readdirSync(strategiesBasePath);
    const strategies: Strategy[] = [];

    for (const path of dirs) {
      if (existsSync(join(strategiesBasePath, path, 'index.js'))) {
        const strategy = await import('../' + join('strategies', path, 'index'));
        strategies.push(strategy.default);
      }
    }
    return strategies;
  }
  // play a round
  public static play(options: PlayOptions): PlayResult {
    let s1Reward = 0, s2Reward = 0;
    const s1Steps: Step[] = [];
    const s2Steps: Step[] = [];
    for (let i = 0; i < (options.totalRound ?? 200); i++) {
      const s1Step = options.s1.getNextStep(s2Steps);
      const s2Step = options.s2.getNextStep(s1Steps);
      if (s1Step === Step.COOPERATE && s2Step === Step.COOPERATE) {
        s1Reward += (options.bothCooperateReward ?? 3);
        s2Reward += (options.bothCooperateReward ?? 3);
      } else if (s1Step === Step.BETRAY && s2Step === Step.BETRAY) {
        s1Reward += (options.bothBetrayReward ?? 1);
        s2Reward += (options.bothBetrayReward ?? 1);
      } else if (s1Step === Step.COOPERATE && s2Step === Step.BETRAY) {
        s1Reward += (options.cooperateWithBetrayReward ?? 0);
        s2Reward += (options.betrayWithCooperateReward ?? 5);
      } else if (s1Step === Step.BETRAY && s2Step === Step.COOPERATE) {
        s1Reward += (options.betrayWithCooperateReward ?? 5);
        s2Reward += (options.cooperateWithBetrayReward ?? 0);
      }
      s1Steps.push(s1Step);
      s2Steps.push(s2Step);
    }
    return {
      s1Steps,
      s2Steps,
      s1Reward,
      s2Reward,
    };
  }

  public static getRandom(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
