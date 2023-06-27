import { Step, Strategy } from "../../framework/types";

class AlwaysCooperate implements Strategy {

  public getName(): string {
    return 'Always cooperate';
  }

  public getNextStep(_steps: Step[]): Step {
    return Step.COOPERATE;
  }

}

export default new AlwaysCooperate();
