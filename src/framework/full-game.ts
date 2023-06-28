import { DefaultFullGame } from "./full-game-default";

(async () => {
  const fullGame = new DefaultFullGame();
  await fullGame.start();
})();
