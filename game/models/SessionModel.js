export default class Session {
  constructor(socket, hostPlayer) {
    this.guests = []; // Max 5, since the max number of players is 6 with the host.
    this.host = hostPlayer;
    this.sessionID = this.generateNewSessionID();
    socket.join(this.sessionID);
    this.guests.push(this.host);
  }

  getSocketRooms(socket) {
    return socket.rooms;
  }

  joinNewPlayer(socket, player, sessionID) {
    socket.join(sessionID);
    this.guests.push(player);
  }
  
  removePlayer(socket, username, sessionID){
    //Remove player from array.
    const playerLeaving = this.guests.findIndex((player) => player.username === username);
    if(playerLeaving != -1){
      this.guests.splice(playerLeaving, 1);
    }

    //Leave session
    socket.leave(sessionID);
    
  }

  reJoinPlayerToSession(socket, username, role, sessionID) {
    let error = true;

    const player = this.guests.find((player) => player.username === username && player.role === role);
    console.log(player);
    if (player) {
      // Player existed in the session before the sockect closed.
      socket.join(sessionID);
      error = false;
    }

    return error;
  }

  generateNewSessionID() {
    const id = Math.ceil(Math.random() * (100000) + 10000).toString().padStart(5, '0');
    return id;
  }
}
