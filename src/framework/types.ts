export enum Step {
  COOPERATE,
  BETRAY,
};

export interface Strategy {
  // return the name of the strategy
  getName(): string;
  // return the next step of the strategy
  // parameter steps is the steps taken by the other strategy
  getNextStep(steps: Step[]): Step;
}
