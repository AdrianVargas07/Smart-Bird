// const clientWS = new WebSocket('ws://localhost:3000');

const clientSocket = io();

class Home {
  constructor() {
    // Initialize events in the creation.
    this.setUpEvents();
  }

  setUpEvents() {
    this.joinSessionButton = document.getElementById('join-session-button');
    this.createSessionButton = document.getElementById('create-session-button');

    this.confirmJoinSession = document.getElementById('button-join');
    this.confirmCreateSession = document.getElementById('button-create');
    this.cancelJoinSession = document.getElementById('cancel-join-session');
    this.cancelCreateSession = document.getElementById('cancel-create-session');

    this.helpButton = document.getElementById('button-help');

    this.createSessionButton.addEventListener('click', this.createSessionForm);
    this.joinSessionButton.addEventListener('click', this.joinSessionForm);

    this.confirmCreateSession.addEventListener('click', this.processCreateSession);
    this.confirmJoinSession.addEventListener('click', this.processJoinSession);
    this.cancelJoinSession.addEventListener('click', this.redirectHome);
    this.cancelCreateSession.addEventListener('click', this.redirectHome);

    this.helpButton.addEventListener('click', this.showHelp);
  }

  createSessionForm() {
    window.location = '#create-modal';
    document.getElementById('username-host').setAttribute('maxlength', '15');
  }

  joinSessionForm() {
    window.location = '#join-modal';

    // Add extra attributes on input elements to validate values entered.
    document.getElementById('session-id').setAttribute('maxlength', '8');
    document.getElementById('session-id').setAttribute('pattern', '[a-z0-9]{8}');
    document.getElementById('username-guest').setAttribute('maxlength', '15');
  }

  processJoinSession() {
    const guestUsername = document.getElementById('username-guest').value;
    const sessionToJoin = document.getElementById('session-id').value;

    // Store information about the player in local storage.
    localStorage.setItem('username', guestUsername);
    localStorage.setItem('playerRole', 'guest');

    const joinSessionMessage = {
      type: 'joinSession',
      username: guestUsername,
      role: 'guest',
      sessionID: sessionToJoin,
    };

    clientSocket.emit('messageFromClient', JSON.stringify(joinSessionMessage));
  }

  processCreateSession() {
    const hostUsername = document.getElementById('username-host').value;

    // Store information about the player in local storage.
    localStorage.setItem('username', hostUsername);
    localStorage.setItem('playerRole', 'host');

    const messageCreate = {
      type: 'newSession',
      username: hostUsername,
      role: 'host',
    };

    // Emit message with the info to the server.
    clientSocket.emit('messageFromClient', JSON.stringify(messageCreate));

    // window.location = '/Lobby';
  }

  redirectHome() {
    window.location = '/';
  }

  redirectToHostLobby(response) {
    localStorage.setItem('sessionID', response.sessionID);
    localStorage.setItem('playersList', JSON.stringify(response.playersList));
    console.log(`Session ID: ${response.sessionID}`);

    if (response.sessionID !== ' ') {
      window.open('/Lobby', '_self');
    } else {
      console.log('Error, could not create the session.');
    }
  }

  redirectToGuestLobby(response) {
    localStorage.setItem('sessionID', response.sessionID);
    localStorage.setItem('playersList', JSON.stringify(response.playersList));

    if (response.sessionID !== ' ') {
      window.open('/Lobby', '_self');
    } else {
      console.log('Error, invalid session.');
    }
  }

  showHelp() {
    window.location = '#help-page';
  }

  messagesListener() {
    clientSocket.on('messageFromServer', (message) => {
      console.log(`SERVER sent -> ${message}`);
      switch (message.type) {
        case 'newSessionResponse':
          this.redirectToHostLobby(message);
          break;
        case 'joinSessionResponse':
          this.redirectToGuestLobby(message);
          break;
        default:
          break;
      }
    });
  }
}

function main() {
  const home = new Home();
  home.messagesListener();
}

window.addEventListener('load', main);
