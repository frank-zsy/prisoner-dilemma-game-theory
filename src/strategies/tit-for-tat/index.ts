import { Step, Strategy } from "../../framework/types";

class TitForTat implements Strategy {

  public getName(): string {
    return 'Tit for tat';
  }

  public getNextStep(steps: Step[]): Step {
    if (steps.length === 0) return Step.COOPERATE;
    return steps[steps.length - 1];
  }

}

export default new TitForTat();
