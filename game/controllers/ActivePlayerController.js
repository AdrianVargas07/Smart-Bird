export default class ActivePlayer {
  constructor() {
  }

  reassignActivePlayer(message) {
    const activePlayer = {
      type: 'newActivePlayer',
    };
    const numberActivePlayer = parseInt(message.numberActivePlayer, 10);
    const playersList = JSON.parse(message.playersList);
    if (numberActivePlayer < playersList.length - 1) {
      const newActivePlayer = numberActivePlayer + 1;
      activePlayer.activePlayer = playersList[newActivePlayer].username;
      activePlayer.numberActivePlayer = newActivePlayer.toString(10);
    } else {
      activePlayer.activePlayer = playersList[0].username;
      activePlayer.numberActivePlayer = '0';
    }
    activePlayer.sessionID = message.sessionID;
    return activePlayer;
  }
}
