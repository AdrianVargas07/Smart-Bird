const clientSocket = io();

class Lobby {
  constructor() {
    this.playerRole = localStorage.getItem('playerRole');
    localStorage.setItem('trivia', 'Enabled');
    localStorage.setItem('timeFactor', '1');
    localStorage.setItem('punish', 'Enabled');
    localStorage.setItem('difficulty', 'Incremental');
    // localStorage.setItem('collaborative', 'Enabled');
    localStorage.setItem('math-box', 'Activated');
    localStorage.setItem('science-box', 'Activated');
    localStorage.setItem('history-box', 'Activated');
    localStorage.setItem('language-box', 'Activated');
    localStorage.setItem('computer-box', 'Activated');
    this.userNameTag = document.getElementById('guest-lobby-username');
    this.sessionIDTag = document.getElementsByClassName('session-number')[0];
    this.sessionPlayersTag = document.getElementsByClassName('guest-list')[0];
    this.numberOfPlayers = document.getElementsByClassName('number-of-guests')[0];
    this.setUpEvents();
  }

  setUpEvents() {
    this.leaveButton = document.getElementById('leave-lobby');
    this.playButton = document.getElementById('play-button');
    this.settings = document.getElementById('settings-box');

    // Common
    this.leaveButton.addEventListener('click', this.leaveLobby);
  }

  loadMatchPage(message) {
    console.log(message.validMatch);
    if (message.validMatch) {
      window.open('/Match', '_self');
    } else {
      console.log('Something is wrong with the setting that you sent');
    }
  }

  startMatch() {
    // Emit message to server with settings.
    // Send settings using this message.
    const setUp = {
      type: 'matchSetUp',
      sessionID: localStorage.getItem('sessionID'),
      player: localStorage.getItem('playersList'),
    };

    clientSocket.emit('messageFromClient', JSON.stringify(setUp));
  }

  leaveLobby() {
    const leaveSession = {
      type: 'leaveSession',
      username: localStorage.getItem('username'),
      role: localStorage.getItem('playerRole'),
      sessionID: localStorage.getItem('sessionID')
    };
    
    clientSocket.emit('messageFromClient', JSON.stringify(leaveSession));
    window.location = '/';
  }

  updateSettings() {
    const trivia = document.getElementById('enabledTrivia');
    trivia.addEventListener('change', () => this.modifyTrivia(trivia));

    const timeFactor = document.getElementById('time-factor');
    timeFactor.addEventListener('change', () => this.modifyTimeFactor(timeFactor));

    const difficulty = document.getElementById('difficulty');
    difficulty.addEventListener('change', () => this.modifyDifficulty(difficulty));

    const punish = document.getElementById('punish');
    punish.addEventListener('change', () => this.modifyPunish(punish));

    // let collaborative = document.getElementById('collaborative');
    // collaborative.addEventListener('change', () => this.modifyCollaborative(collaborative));

    // The cards
    const redCard = document.getElementById('math-box');
    redCard.addEventListener('click', () => this.toggle(redCard));

    const greenCard = document.getElementById('science-box');
    greenCard.addEventListener('click', () => this.toggle(greenCard));

    const blueCard = document.getElementById('history-box');
    blueCard.addEventListener('click', () => this.toggle(blueCard));

    const yellowCard = document.getElementById('language-box');
    yellowCard.addEventListener('click', () => this.toggle(yellowCard));

    const purpleCard = document.getElementById('computer-box');
    purpleCard.addEventListener('click', () => this.toggle(purpleCard));
  }

  modifyTrivia(trivia) {
    localStorage.setItem('trivia', trivia.options[trivia.selectedIndex].text);
    // console.log('Trivia'+localStorage.getItem('trivia'));
    const adjustment = {
      type: 'updateTrivia',
      optionSelected: trivia.options[trivia.selectedIndex].text,
      sessionID: localStorage.getItem('sessionID'),
    };
    clientSocket.emit('messageFromClient', JSON.stringify(adjustment));
  }

  modifyTimeFactor(timeFactor) {
    localStorage.setItem('timeFactor', timeFactor.value);
    // console.log('TimeFactor'+localStorage.getItem('timeFactor'));
    const adjustment = {
      type: 'updateTimeFactor',
      optionSelected: (timeFactor.value).toString(10),
      sessionID: localStorage.getItem('sessionID'),
    };
    clientSocket.emit('messageFromClient', JSON.stringify(adjustment));
  }

  modifyDifficulty(difficulty) {
    localStorage.setItem('difficulty', difficulty.options[difficulty.selectedIndex].text);
    // console.log('Diff'+localStorage.getItem('difficulty'));
    const adjustment = {
      type: 'updateDifficulty',
      optionSelected: difficulty.options[difficulty.selectedIndex].text,
      sessionID: localStorage.getItem('sessionID'),
    };
    clientSocket.emit('messageFromClient', JSON.stringify(adjustment));
  }

  modifyPunish(punish) {
    localStorage.setItem('punish', punish.options[punish.selectedIndex].text);
    // console.log('Punish'+localStorage.getItem('punish'));
    const adjustment = {
      type: 'updatePunish',
      optionSelected: punish.options[punish.selectedIndex].text,
      sessionID: localStorage.getItem('sessionID'),
    };
    clientSocket.emit('messageFromClient', JSON.stringify(adjustment));
  }

  // modifyCollaborative(collaborative) {
  //   localStorage.setItem('collaborative' , collaborative.options[collaborative.selectedIndex].text);
  //   // console.log('Colabor'+localStorage.getItem('collaborative'));
  //   const adjustment = {
  //     type: 'updateCollaborative',
  //     optionSelected: collaborative.options[collaborative.selectedIndex].text,
  //     sessionID: localStorage.getItem('sessionID')
  //   }
  //   clientSocket.emit('messageFromClient', JSON.stringify(adjustment));
  // }

  toggle(card) {
    const colorSelected = {
      type: 'updateColorSelected',
      sessionID: localStorage.getItem('sessionID'),
      category: card.id,
    };

    if (localStorage.getItem(card.id) === 'Activated') {
      card.style.filter = 'brightness(0.4)';
      localStorage.setItem(card.id, 'Desactivated');
      colorSelected.option = 'Desactivated';
    } else {
      card.style.filter = 'brightness(1)';
      localStorage.setItem(card.id, 'Activated');
      colorSelected.option = 'Activated';
    }

    clientSocket.emit('messageFromClient', JSON.stringify(colorSelected));
  }

  loadHostLobby() {
    this.playButton.addEventListener('click', this.startMatch);
    this.updateSettings();

    const hostUserName = localStorage.getItem('username');
    const sessionID = localStorage.getItem('sessionID');

    this.userNameTag.innerText = `My username: ${hostUserName}`;
    this.sessionIDTag.innerText = `Session ID: ${localStorage.getItem('sessionID')}`;
    this.sessionPlayersTag.innerHTML = `<li>${hostUserName}</li>`;

    const player = {
      type: 'rejoin',
      username: hostUserName,
      role: this.playerRole,
      sessionID,
    };

    clientSocket.emit('messageFromClient', JSON.stringify(player));
    this.loadPlayers();
  }

  loadGuestLobby() {
    const guestUserName = localStorage.getItem('username');
    const sessionID = localStorage.getItem('sessionID');
    const playersList = JSON.parse(localStorage.getItem('playersList'));

    this.userNameTag.innerText = `My username: ${guestUserName}`;
    this.sessionIDTag.innerText = `Session ID: ${localStorage.getItem('sessionID')}`;

    playersList.forEach((player) => {
      this.sessionPlayersTag.innerHTML += `<li>${player.username}</li>`;
    });

    // Disable settings and button to start playing.
    this.playButton.remove();
    this.settings.style.pointerEvents = 'none';

    const player = {
      type: 'rejoin',
      username: guestUserName,
      role: this.playerRole,
      sessionID,
    };

    clientSocket.emit('messageFromClient', JSON.stringify(player));
    this.loadPlayers();
  }

  init() {
    if (this.playerRole === 'host') {
      this.loadHostLobby();
    } else if (this.playerRole === 'guest') {
      this.loadGuestLobby();
    }
  }

  getNumberOfPlayers(){
    let count = 0;
    const playersList = JSON.parse(localStorage.getItem('playersList'));
    count = Object.keys(playersList).length;

    return count;
  }

  loadPlayers(){
    const hostUserName = localStorage.getItem('username');
    const sessionID = localStorage.getItem('sessionID');
    const playersList = JSON.parse(localStorage.getItem('playersList'));
    

    this.userNameTag.innerText = `My username: ${hostUserName}`;
    this.sessionIDTag.innerText = `Session ID: ${sessionID}`;
    this.numberOfPlayers.innerText = this.getNumberOfPlayers();

    this.sessionPlayersTag.innerHTML = '';
    playersList.forEach((player) => {
      this.sessionPlayersTag.innerHTML += `<li>${player.username}</li>`;
    });
  }

  updatePlayersList(message) {
    const hostUserName = localStorage.getItem('username');
    const sessionID = localStorage.getItem('sessionID');
    localStorage.setItem('playersList', JSON.stringify(message.playersList));

    this.userNameTag.innerText = `My username: ${hostUserName}`;
    this.sessionIDTag.innerText = `Session ID: ${sessionID}`;
    this.numberOfPlayers.innerText = this.getNumberOfPlayers();
    
    const { playersList } = message;

    this.sessionPlayersTag.innerHTML = '';
    playersList.forEach((player) => {
      this.sessionPlayersTag.innerHTML += `<li>${player.username}</li>`;
    });
  }

  playerLeft(message){
    const username = localStorage.getItem('username');

    if(username === message.playerLeft){
      window.location = '/';
    }
    this.updatePlayersList(message);
    
  }
  
  updateAdjustmentTriviaGuest(message) {
    const triviaBox = document.getElementById('enabledTrivia');
    const option = `<option>${message.optionSelected}</option>`;
    triviaBox.innerHTML = option;
    localStorage.setItem('trivia', message.optionSelected);
    console.log(`Option selected:${message.optionSelected}`);
  }

  updateAdjustmentTimeFactorGuest(message) {
    const timeFactor = document.getElementById('time-factor');
    timeFactor.value = message.optionSelected;
    localStorage.setItem('timeFactor', message.optionSelected);
    console.log(`Option selected:${message.optionSelected}`);
  }

  updateAdjustmentDifficultyGuest(message) {
    const difficulty = document.getElementById('difficulty');
    const option = `<option>${message.optionSelected}</option>`;
    difficulty.innerHTML = option;
    localStorage.setItem('difficulty', message.optionSelected);
    console.log(`Option selected:${message.optionSelected}`);
  }

  updateAdjustmentPunishGuest(message) {
    const punish = document.getElementById('punish');
    const option = `<option>${message.optionSelected}</option>`;
    punish.innerHTML = option;
    localStorage.setItem('punish', message.optionSelected);
    console.log(`Option selected:${message.optionSelected}`);
  }

  updateAdjustmentCollaborativeGuest(message) {
    const collaborative = document.getElementById('collaborative');
    const option = `<option>${message.optionSelected}</option>`;
    collaborative.innerHTML = option;
    localStorage.setItem('collaborative', message.optionSelected);
    console.log(`Option selected:${message.optionSelected}`);
  }

  updateCategorySelected(message) {
    const card = document.getElementById(message.category);
    if (message.option === 'Activated') {
      card.style.filter = 'brightness(1)';
      localStorage.setItem(message.category, 'Activated');
    } else {
      card.style.filter = 'brightness(0.4)';
      localStorage.setItem(message.category, 'Desactivated');
    }
  }

  messagesListener() {
    clientSocket.on('messageFromServer', (message) => {
      console.log(`SERVER sent -> ${message}`);
      switch (message.type) {
        case 'joinSessionResponse':
          this.updatePlayersList(message);
          break;
        case 'leaveSessionResponse':
          this.playerLeft(message);
          break;
        case 'matchSetUpResponse':
          this.loadMatchPage(message);
          break;
        case 'updateTrivia':
          if (localStorage.getItem('playerRole') === 'guest') {
            this.updateAdjustmentTriviaGuest(message);
          }
          break;
        case 'updateTimeFactor':
          if (localStorage.getItem('playerRole') === 'guest') {
            this.updateAdjustmentTimeFactorGuest(message);
          }
          break;
        case 'updateDifficulty':
          if (localStorage.getItem('playerRole') === 'guest') {
            this.updateAdjustmentDifficultyGuest(message);
          }
          break;
        case 'updatePunish':
          if (localStorage.getItem('playerRole') === 'guest') {
            this.updateAdjustmentPunishGuest(message);
          }
          break;
        case 'updateCollaborative':
          if (localStorage.getItem('playerRole') === 'guest') {
            this.updateAdjustmentCollaborativeGuest(message);
          }
          break;
        case 'updateColorSelected':
          if (localStorage.getItem('playerRole') === 'guest') {
            this.updateCategorySelected(message);
          }
          break;
        default:
          break;
      }
    });
  }
}

function main() {
  // To test Lobby on how it looks in Guest mode.
  // const settingsHandler = new Settings('guest');

  // To test Lobby on how it looks in Host mode.
  const lobby = new Lobby();
  lobby.messagesListener();
  lobby.init();
}

window.addEventListener('load', main);
