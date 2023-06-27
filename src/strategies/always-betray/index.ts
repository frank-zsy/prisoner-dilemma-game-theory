import { Step, Strategy } from "../../framework/types";

class AlwaysBetray implements Strategy {

  public getName(): string {
    return 'Always betray';
  }

  public getNextStep(_steps: Step[]): Step {
    return Step.BETRAY;
  }

}

export default new AlwaysBetray();
