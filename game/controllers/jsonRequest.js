import Question from '../models/Question.js';
import lobby from './LobbyController.js';
import match from './MatchController.js';
import ActivePlayer from './ActivePlayerController.js';

export default class JsonRequest {
  constructor() {

  }

  parseJsonRequest(socket, jsonMessage) {
    let jsonResponse;
    const { username } = jsonMessage;
    const { role } = jsonMessage;
    const { sessionID } = jsonMessage;
    // console.log(jsonMessage);
    switch (jsonMessage.type) {
      case 'getQuestion':
        // console.log('Client has requested new question');
        const question = new Question();
        jsonResponse = question.getQuestion(jsonMessage);
        break;
      case 'joinSession':
        // If player could join, returns session where joinde. Otherwise is undefined.
        const validSession = lobby.joinPlayerToSession(socket, username, role, sessionID);
        jsonResponse = {
          type: 'joinSessionResponse',
          playersList: lobby.getPlayersFromSession(jsonMessage.sessionID),
          sessionID: validSession,
          broadcast: true,
        };
        break;
      case 'leaveSession':
        const playerLeftUsername = lobby.removePlayerFromSession(socket, username, role, sessionID);
        jsonResponse = {
          type: 'leaveSessionResponse',
          playersList: lobby.getPlayersFromSession(jsonMessage.sessionID),
          sessionID: sessionID,
          playerLeft: playerLeftUsername,
          broadcast: true,
        };
        break;
      case 'newSession':
        const newSessionID = lobby.createNewSession(socket, username, role);
        jsonResponse = {
          type: 'newSessionResponse',
          sessionID: newSessionID,
          playersList: lobby.getPlayersFromSession(newSessionID),
          broadcast: false,
        };
        break;
      case 'matchSetUp':
        jsonResponse = {
          type: 'matchSetUpResponse',
          validMatch: match.setUpMatch(jsonMessage),
          broadcast: true,
          sessionID: jsonMessage.sessionID,
        };
        break;
      case 'leaveMatch':
        //Para hacer broadcast a todos que deben regresar al lobby.
        jsonResponse = {
          type: 'leaveMatchResponse',
          sessionID: jsonMessage.sessionID,
          broadcast: true,
        };
        break;
      case 'rejoin':
        let error = true;
        error = lobby.reJoinPlayerToSession(socket, username, role, sessionID);

        if (!error) {
          console.log('Success rejoining...');
        } else {
          console.log('Error rejoining...');
        }
        break;
      case 'updateOpponentPosition':
        jsonResponse = jsonMessage;
        jsonResponse.broadcast = true;
        break;
      case 'updateSunPosition':
        jsonResponse = jsonMessage;
        jsonResponse.broadcast = true;
        break;
      case 'gameWon':
        jsonResponse = jsonMessage;
        jsonResponse.broadcast = true;
        break;
      case 'activePlayer':
        const activePlayer = new ActivePlayer();
        jsonResponse = activePlayer.reassignActivePlayer(jsonMessage);
        jsonResponse.broadcast = true;
        break;
      case 'updateTrivia':
        jsonResponse = jsonMessage;
        jsonResponse.broadcast = true;
        break;
      case 'updateTimeFactor':
        jsonResponse = jsonMessage;
        jsonResponse.broadcast = true;
        break;
      case 'updateDifficulty':
        jsonResponse = jsonMessage;
        jsonResponse.broadcast = true;
        break;
      case 'updatePunish':
        jsonResponse = jsonMessage;
        jsonResponse.broadcast = true;
        break;
      case 'updateCollaborative':
        jsonResponse = jsonMessage;
        jsonResponse.broadcast = true;
        break;
      case 'updateColorSelected':
        jsonResponse = jsonMessage;
        jsonResponse.broadcast = true;
        break;
      default:
        break;
    }
    return JSON.stringify(jsonResponse);
  }
}
