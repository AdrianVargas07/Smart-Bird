export default class Player {
  constructor(username, role) {
    this.username = username;
    this.role = role;
  }

  getRivals() {
    const rivals = [];
    const players = Player.getPlayers();
    for (let index = 0; index < players.length; ++index) {
      if (players[index] != this.username) {
        rivals.push(players[index]);
      }
    }
    return rivals;
  }

  static getPlayers() {
    const players = [
      new Player('Sergio'),
      new Player('Adrian'),
      new Player('Daniela'),
    ];
    return players;
  }
}
