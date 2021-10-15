import { confetti } from './confetti.js';
import Player from './Player.js';
import Question from './Question.js';

const clientSocket = io();

const sunReachesEnd = 14;
class Board {
  constructor() {
    this.initalCell = document.getElementById('0');
    this.loadPlayers();
    this.player = new Player(localStorage.getItem('username'));
    this.questions = new Question();
    this.sunPosition = 1;
    this.numberActivePlayer = -1;
    this.responseJson = {};
    this.sun = document.getElementById('sunrise-track-sun');
    this.board = [4, 1, 3, 2, 4, 1, 2, 3, 4, 5, 3, 1, 5, 3, 4, 5, 2, 3, 5, 1, 2, 5, 4, 2, 3, 5, 2,
      3, 4, 1, 5, 1, 4, 3, 5, 1, 2, 3, 1, 5, 4, 1, 2, 1, 3, 5, 1, 4, 2, 1, 4, 3, 5, 4, 1, 0];
    // Game adjust
    this.trivia = localStorage.getItem('trivia');
    this.timeFactor = localStorage.getItem('timeFactor');
    this.difficulty = localStorage.getItem('difficulty');
    this.punish = localStorage.getItem('punish');
  }

  reJoinSession() {
    // Get local storage to identify session.
    const userName = localStorage.getItem('username');
    const sessionID = localStorage.getItem('sessionID');
    const role = localStorage.getItem('playerRole');

    // As we are loadig a new page, we need to rejoin the session.
    const player = {
      type: 'rejoin',
      username: userName,
      role,
      sessionID,
    };

    clientSocket.emit('messageFromClient', JSON.stringify(player));
  }

  loadPlayers() {
    const playersList = JSON.parse(localStorage.getItem('playersList'));

    for (let player = 0; player < playersList.length; player++) {
      const avatar = document.createElement('img');
      avatar.setAttribute('id', playersList[player].username);
      avatar.setAttribute('class', 'img-avatar');
      avatar.setAttribute('src', `img/avatar${player}.png`);
      avatar.setAttribute('alt', 'Player avatar');
      this.initalCell.appendChild(avatar);
    }
  }

  checkOptions() {
    const buttonHelp = document.getElementById('button-help');
    const buttonLeave = document.getElementById('button-leave');
    const buttonAcceptHelp = document.getElementById('button-accept-help');
    const buttonContinue = document.getElementById('button-continue');
    const buttonQuit = document.getElementById('button-quit');
    const buttonContinue2 = document.getElementById('button-continue2');
    const buttonQuit2 = document.getElementById('button-quit2');
    const buttonOK = document.getElementById('button-OK');

    buttonHelp.addEventListener('click', () => this.helpButton());
    buttonLeave.addEventListener('click', () => this.leaveButton());
    buttonAcceptHelp.addEventListener('click', () => this.acceptHelpButton());
    buttonContinue.addEventListener('click', () => this.leaveButton()); // button continue of game over modal
    buttonQuit.addEventListener('click', () => this.quitButton()); // button quit session of game over modal
    buttonContinue2.addEventListener('click', () => this.leaveButton()); // button continue of pudium modal
    buttonQuit2.addEventListener('click', () => this.quitButton()); // button quit session of pudium modal
    buttonOK.addEventListener('click', () => this.acceptHelpButton()); // button ok of the time out question modal
  }

  helpButton() {
    window.location = '#help-modal';
  }

  leaveButton() {
    //Send message that player left the Match.
    const username = localStorage.getItem('username');
    const sessionID = localStorage.getItem('sessionID');
    
    const leaveMatch = {
      type: 'leaveMatch',
      username: username,
      sessionID, sessionID
    };
    
    clientSocket.emit('messageFromClient', JSON.stringify(leaveMatch));
    window.location = '/Lobby';

  }

  acceptHelpButton() {
    const buttonTakeCard = document.getElementById('button-take-card');
    buttonTakeCard.disabled = true;
    window.location = '#';
    window.setTimeout(() => {
      this.showIsNotMyTurn();
    }, 2000);
    this.sendPlayedMyTurn();
  }

  quitButton() {
    window.location = '/';
  }

  showIsNotMyTurn() {
    const modalPlayerTurn = document.getElementById('player-on-turn');
    modalPlayerTurn.innerHTML = `Your opponent ${this.responseJson.activePlayer} is playing. Please wait your turn ...`;
    window.location = '#opponent-playing';
  }

  showHostIsActivePlayer() {
    const modalPlayerTurn = document.getElementById('player-on-turn');
    modalPlayerTurn.innerHTML = 'Your opponent, the host, is playing. Please wait your turn ...';
    window.location = '#opponent-playing';
  }

  showPodium() {
    const avatar = this.player.getAvatar();
    const image = avatar.getAttribute('src');
    document.getElementById('img-avatar-winner').setAttribute('src', image);
    document.getElementById('player-name-winner').innerHTML = localStorage.getItem('username');
    confetti.start();
    window.location = '#podium-modal';
  }

  showGameOver() {
    window.location = '#game-over-modal';
  }

  setColorCard(deck) {
    switch (this.player.getColorNumberObtain()) {
      case 1:
        this.player.setColor('red');
        break;
      case 2:
        this.player.setColor('blue');
        break;
      case 3:
        this.player.setColor('yellow');
        break;
      case 4:
        this.player.setColor('green');
        break;
      case 5:
        this.player.setColor('purple');
        break;
      default:
        break;
    }

    // console.log(`Color card selected: ${this.player.getColor()}`);
    deck.style.background = this.player.getColor();
  }

  checkPositionMoveForward() {
    let newPosition = 0;
    let found = false;
    const actualPosition = this.player.getActualPosition();

    // The amount to be advanced is obtained
    for (let boardPosition = actualPosition;
      boardPosition < this.board.length && !found;
      boardPosition += 1) {
      if ((this.board[boardPosition + 1]) === this.player.getColorNumberObtain()) {
        found = true;
        newPosition = boardPosition + 1;
        this.player.setActualPosition(newPosition);
      }
    }

    // next position
    if (!found) {
      newPosition = this.board.length - 1;
      this.player.setActualPosition(newPosition);
    }

    this.moveAvatar(newPosition);
  }

  checkPositionMoveBack() {
    let newPosition = 0; let
      found = false;
    const actualPosition = this.player.getActualPosition();

    // The amount to be back is obtained
    for (let boardPosition = actualPosition; boardPosition > 0 && !found; boardPosition -= 1) {
      if ((this.board[boardPosition - 1]) === this.player.getColorNumberObtain()) {
        found = true;
        newPosition = boardPosition - 1;
        this.player.setActualPosition(newPosition);
      }
    }

    if (!found) {
      newPosition = 0;
      this.player.setActualPosition(newPosition);
    }

    this.moveAvatar(newPosition);
  }

  moveAvatar(newPosition) {
    const newCell = document.getElementById(newPosition.toString(10));
    this.player.getAvatar().className = 'img-avatar disapper';

    // Timeout for not disable the transition of the previous class called disapper-avatar
    window.setTimeout(() => {
      newCell.appendChild(this.player.getAvatar());
      this.player.getAvatar().className = 'img-avatar appear';
      // half second is showed that next player is playing
      window.setTimeout(() => {
        this.showIsNotMyTurn();
      }, 500);
    }, 2000);

    // if the player come on the final position, it will be shown the podium
    if (newPosition === this.board.length - 1) {
      window.setTimeout(() => {
        this.showPodium();
        this.sendIHaveWonGame();
      }, 3000);
    }
  }

  sendIHaveWonGame() {
    const avatar = this.player.getAvatar();
    const imageSrc = avatar.getAttribute('src');
    const gameWon = {
      type: 'gameWon',
      username: localStorage.getItem('username'),
      image: imageSrc,
      sessionID: localStorage.getItem('sessionID'),
    };
    clientSocket.emit('messageFromClient', JSON.stringify(gameWon));
  }

  checkPositionToMoveSun() {
    // new position where must to move the sun
    const newPositionSun = this.sunPosition + 1;
    this.sun.className = 'disapper';

    const newCell = document.getElementById(`sunrise-track-square${newPositionSun.toString(10)}`);

    // sun movement
    window.setTimeout(() => {
      newCell.appendChild(this.sun);
      this.sun.className = 'appear';
    }, 2000);

    this.sunPosition = newPositionSun;

    this.checkSunPosition();
  }

  checkSunPosition() {
    // It is checked if the sun is on the final position
    if (this.sunPosition === sunReachesEnd) {
      window.setTimeout(() => {
        this.showGameOver();
      }, 3000);
    }
  }

  getQuestionFromServer() {
    const getQuestion = {
      type: 'getQuestion',
      obtainedColor: '',
      idPlayer: '',
      playerPosition: '',
      difficulty: '',
    };

    getQuestion.obtainedColor = this.player.getColor();
    getQuestion.idPlayer = this.player.getIdPlayer();
    getQuestion.playerPosition = this.player.getActualPosition().toString();
    getQuestion.difficulty = this.difficulty;
    clientSocket.emit('messageFromClient', JSON.stringify(getQuestion));
  }

  takeCard() {
    const deck = document.getElementById('button-take-card');
    deck.addEventListener('click', () => this.player.takeCard());
    deck.addEventListener('click', () => this.setColorCard(deck));
    if (this.trivia === 'Enabled') {
      deck.addEventListener('click', () => this.getQuestionFromServer());
    } else {
      deck.addEventListener('click', () => this.disableDeck());
      deck.addEventListener('click', () => this.checkPositionToMove());
    }
  }

  answerQuestion() {
    const buttonAccetpQuestion = document.getElementById('button-answer-question');
    buttonAccetpQuestion.addEventListener('click', () => this.questions.answerQuestion(this.responseJson));
    buttonAccetpQuestion.addEventListener('click', () => this.disableDeck());
    buttonAccetpQuestion.addEventListener('click', () => this.checkPositionToMove());
  }

  disableDeck() {
    const buttonTakeCard = document.getElementById('button-take-card');
    buttonTakeCard.disabled = true;
  }

  checkPositionToMove() {
    // Timeout of two seconds because the modal question take 2 seconds of disapper, so the players can see the player movement
    if (this.trivia === 'Enabled') {
      setTimeout(() => {
        if (this.questions.getCorrectAnswer()) {
          this.checkPositionMoveForward();
        } else {
          if (this.punish === 'Enabled') {
            this.checkPositionMoveBack();
          }
          this.checkPositionToMoveSun();
          this.sendSunPositionOnAllClients();
        }
        this.sendMyPositionOnAllClients();
        this.sendPlayedMyTurn();
      }, 2000);
    } else {
      this.checkPositionMoveForward();
      this.sendMyPositionOnAllClients();
      this.sendPlayedMyTurn();
    }
  }

  sendMyPositionOnAllClients() {
    const updateOpponentsPosition = {
      type: 'updateOpponentPosition',
      sessionID: localStorage.getItem('sessionID'),
      playerUsername: '',
      newPosition: '',
    };
    updateOpponentsPosition.playerUsername = this.player.getIdPlayer();
    updateOpponentsPosition.newPosition = this.player.getActualPosition();
    clientSocket.emit('messageFromClient', JSON.stringify(updateOpponentsPosition));
  }

  sendPlayedMyTurn() {
    const playedMyTurn = {
      type: 'activePlayer',
      playersList: localStorage.getItem('playersList'),
      numberActivePlayer: this.numberActivePlayer.toString(10),
      sessionID: localStorage.getItem('sessionID'),
    };
    clientSocket.emit('messageFromClient', JSON.stringify(playedMyTurn));
  }

  sendSunPositionOnAllClients() {
    const updateSunPosition = {
      type: 'updateSunPosition',
      sessionID: localStorage.getItem('sessionID'),
      newPosition: this.sunPosition,
    };
    clientSocket.emit('messageFromClient', JSON.stringify(updateSunPosition));
  }

  updateOpponentPosition() {
    const player = document.getElementById(this.responseJson.playerUsername);
    const newCell = document.getElementById(this.responseJson.newPosition.toString(10));

    player.className = 'img-avatar disapper';

    window.setTimeout(() => {
      newCell.appendChild(player);
      player.className = 'img-avatar appear';
    }, 2000);
  }

  // The position of the sun is updated when another opponent makes a mistake in the answer
  updateSunPosition() {
    const newCell = document.getElementById(`sunrise-track-square${this.responseJson.newPosition}`);
    this.sun.className = 'disapper';
    // sun movement
    window.setTimeout(() => {
      newCell.appendChild(this.sun);
      this.sun.className = 'appear';
    }, 2000);
    this.sunPosition = this.responseJson.newPosition;

    this.checkSunPosition();
  }

  showWinner() {
    const avatarWinner = document.getElementById('img-avatar-winner');
    avatarWinner.setAttribute('src', this.responseJson.image);
    document.getElementById('player-name-winner').innerHTML = this.responseJson.username;
    confetti.start();
    window.location = '#podium-modal';
  }

  assignActivePlayer() {
    if (localStorage.getItem('playerRole') === 'host') {
      const activePlayer = {
        type: 'activePlayer',
        playersList: localStorage.getItem('playersList'),
        numberActivePlayer: '-1',
        sessionID: localStorage.getItem('sessionID'),
      };
      clientSocket.emit('messageFromClient', JSON.stringify(activePlayer));
    }
  }

  checkNewActivePlayer() {
    this.numberActivePlayer = parseInt(this.responseJson.numberActivePlayer, 10);
    const buttonTakeCard = document.getElementById('button-take-card');
    if (this.responseJson.activePlayer === localStorage.getItem('username')) {
      buttonTakeCard.disabled = false;
      window.location = '#';
    } else {
      window.setTimeout(() => {
        this.showIsNotMyTurn();
      }, 2500);
    }
  }

  showQuestionModal() {
    if ((this.responseJson.obtainedColor === 'red' && localStorage.getItem('math-box') === 'Activated')
        || (this.responseJson.obtainedColor === 'green' && localStorage.getItem('science-box') === 'Activated')
        || (this.responseJson.obtainedColor === 'blue' && localStorage.getItem('history-box') === 'Activated')
        || (this.responseJson.obtainedColor === 'yellow' && localStorage.getItem('language-box') === 'Activated')
        || (this.responseJson.obtainedColor === 'purple' && localStorage.getItem('computer-box') === 'Activated')) {
      this.questions.buildModalQuestion(this.player, this.responseJson, this.timeFactor);
    } else {
      this.disableDeck();
      this.checkPositionMoveForward();
      this.sendMyPositionOnAllClients();
      this.sendPlayedMyTurn();
    }
  }
  returnToLobby(){
    window.location = '/Lobby';
  }

  setLeaderBoard() {
    const firstPosition = document.getElementById('first-player');
    const secondPosition = document.getElementById('second-player');
    const thirdPosition = document.getElementById('third-player');
    const player1 = JSON.parse(localStorage.getItem('playersList'))[0].username;
    firstPosition.innerHTML = player1;

    if (JSON.parse(localStorage.getItem('playersList'))[1] != undefined) {
      const player2 = JSON.parse(localStorage.getItem('playersList'))[1].username;
      secondPosition.innerHTML = player2;
    }
    if (JSON.parse(localStorage.getItem('playersList'))[2] != undefined) {
      const player3 = JSON.parse(localStorage.getItem('playersList'))[2].username;
      thirdPosition.innerHTML = player3;
    }
  }

  listenMessagesServer() {
    clientSocket.on('messageFromServer', (message) => {
      // console.log(`SERVER sent -> `);
      // console.log(message);
      this.responseJson = message;
      switch (message.type) {
        case 'question':
          this.showQuestionModal();
          break;
        case 'updateOpponentPosition':
          this.updateOpponentPosition();
          break;
        case 'updateSunPosition':
          this.updateSunPosition();
          break;
        case 'gameWon':
          console.log(`The${this.responseJson.username}has won the game`);
          this.showWinner();
          break;
        case 'newActivePlayer':
          this.checkNewActivePlayer();
        break;
        case 'leaveMatchResponse':
          this.returnToLobby();
          break;
        default:
          break;
      }
    });
  }
}

function main() {
  const game = new Board();
  // As we are loadig a new page, we need to rejoin the session.
  game.reJoinSession();

  // The game buttons options are checked
  game.checkOptions();

  // In case of the message active player name doesn't arrive on time, will be shown 'host' instead of name host
  game.showHostIsActivePlayer();

  game.listenMessagesServer();

  // Based on local storage data, the first participant will be assingned
  game.assignActivePlayer();

  // The initial position on leaderboard is assigned based on the order which the player enter into sesssion
  game.setLeaderBoard();

  // A card is taken from the game and the question is shown
  game.takeCard();

  // The correctness of the response is verified and the avatar moves
  game.answerQuestion();
}

window.addEventListener('load', main);
