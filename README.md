# Prisoner Dilemma Game Theory

This is a project to simulate the prisoner dilemma game theory experiment.

You can add any strategy under `src/strategies` folder as sample strategies shows, and the strategy will be loaded by the framework.

## Playground

Run `npm run playground` to start the playground, the playground will load all the strategies and play a 200 rounds game between each strategy, then output the result of the games.

## Full game

Run `npm run full-game` to start a full game which is much more complex, it follows these steps:

- Generate ~100 actors with all the strategies.
- For a whole round game, each actor will random pick 10 other actors to play a 200 round game and record the result.
- After a whole round game, the last 10 average actors will change their strategy to the top actor's strategy.
- Run games until the strategies do not change any more.
