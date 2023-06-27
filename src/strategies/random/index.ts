import { Step, Strategy } from "../../framework/types";

class Random implements Strategy {

  public getName(): string {
    return 'Random';
  }

  public getNextStep(_steps: Step[]): Step {
    if (Math.random() < 0.5) return Step.COOPERATE;
    return Step.BETRAY;
  }

}

export default new Random();
