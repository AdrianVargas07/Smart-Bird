import express, { json } from 'express';
import * as eta from 'eta';
// import ws from 'ws';
import http from 'http';
import { Server } from 'socket.io';
import router from './routes/routes.js';
import JsonRequest from './controllers/jsonRequest.js';

// Create express app integrated with socket.io
const app = express();
const jsonRequest = new JsonRequest();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

function configureEta() {
  // Configure ETA for template usage.
  app.disable('x-powered-by');
  app.engine('eta', eta.renderFile);
  app.set('view engine', 'eta');
}

function setWebSocketsEvents() {
  io.on('connection', (socket) => {
    console.log('New client socket connected.');
    socket.on('messageFromClient', (jsonMessage) => {
      console.log(`CLIENT sent -> ${jsonMessage}`);
      let jsonResponse = jsonRequest.parseJsonRequest(socket, JSON.parse(jsonMessage));

      if (jsonResponse) {
        console.log(`SERVER sent -> ${jsonResponse}`);
        jsonResponse = JSON.parse(jsonResponse);
        if (jsonResponse.broadcast === true) {
          if (jsonResponse.sessionID !== ' ') {
            console.log('Broadcast');
            // The session exists
            // console.log(`Is player in session? ${io.sockets.adapter.sids[socket.id][jsonResponse.sessionID]}`);
            // console.log(`Is player in session? ${io.sockets.adapter.rooms[jsonResponse.sessionID][socket.id]}`);
            console.log(io.sockets.adapter.rooms);
            io.to(jsonResponse.sessionID).emit('messageFromServer', jsonResponse);
          } else {
            // Could be a broadcast but as the session is invalid, feedback is sent only to the client and not to all.
            console.log('Invalid session');
            socket.emit('messageFromServer', jsonResponse);
          }
        } else {
          socket.emit('messageFromServer', jsonResponse);
        }
      }
    });
    // socket.on('disconnect', () => {
    //   console.log('Closed connection');
    // });
  });
}

function startListening() {
  app.use(router);
  const port = 3000;
  httpServer.listen(port);
  console.log('Server running on port: ', port);
}

function initServer() {
  configureEta();

  setWebSocketsEvents();

  startListening();
}

initServer();
