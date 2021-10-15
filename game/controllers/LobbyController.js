import Player from '../models/PlayerModel.js';
import Session from '../models/SessionModel.js';

class LobbyController {
  constructor() {
    this.appSessions = [];
  }

  getLobbyPage(req, res) {
    // res.redirect('/Lobby.xhtml')
    res.render('Lobby', {
      title: 'Lobby Page',
      stylesheets: ['/css/common.css', '/css/Lobby.css'],
      scripts: ['/js/Lobby.js'],
    });
  }

  joinPlayerToSession(socket, username, role, sessionID) {
    let validSession = ' ';

    const session = this.appSessions.find((session) => session.sessionID === sessionID);

    if (session) {
      // First, create player.
      const player = new Player(username, role);
      // Try to join that player if the session exisits.
      session.joinNewPlayer(socket, player, session.sessionID);
      validSession = sessionID;
    } else {
      console.log('Session does not exist, enter a valid one.');
    }

    return validSession;
  }

  removePlayerFromSession(socket, username, role, sessionID){
    let playerLeft = ' ';

    const session = this.appSessions.find((session) => session.sessionID === sessionID);

    if (session) {
      // Try to join that player if the session exisits.
      session.removePlayer(socket, username, session.sessionID);
      playerLeft = username;

      if(role === 'host'){
        const sessionIndex =  this.appSessions.findIndex((session) => session.sessionID === sessionID);
        this.appSessions.splice(sessionIndex, 1);
      }
    } else {
      console.log('Session does not exist, enter a valid one.');
    }

    return playerLeft;
  }

  reJoinPlayerToSession(socket, username, role, sessionID) {
    let error = true;
    const currentSession = this.getSession(sessionID);
    console.log(`Current Session: ${currentSession}`);
    if (currentSession != -1) {
      console.log(currentSession);
      // If the session is registered
      error = currentSession.reJoinPlayerToSession(socket, username, role, sessionID);
    }

    return error;
  }

  createNewSession(socket, hostUserName, role) {
    let validSession = ' ';

    // First creates the player that started the session
    const hostPlayer = new Player(hostUserName, role);

    // Creates an object of type session, in which the socket of the host is putted into a room.
    const session = new Session(socket, hostPlayer);

    if (session) {
      this.appSessions.push(session);
      console.log(session.getSocketRooms(socket));
      validSession = session.sessionID;
    }

    return validSession;
  }

  getPlayersFromSession(sessionID) {
    const session = this.getSession(sessionID);

    if (session != -1) {
      return session.guests;
    }

    return [];
  }

  getSession(sessionID) {
    const session = this.appSessions.find((session) => session.sessionID === sessionID);

    if (session) {
      return session;
    }

    return -1;
  }
}

const lobby = new LobbyController();

export default lobby;
