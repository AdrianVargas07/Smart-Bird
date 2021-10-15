import path from 'path';

class MatchController {
  constructor() {

  }

  getMatchPage(req, res) {
    // res.status(200).sendFile(path.join(process.cwd(), 'public/Match.xhtml'));
    res.render('Match', {
      title: 'Match Page',
      stylesheets: ['/css/common.css', '/css/Match.css'],
      scripts: ['/js/Board.js'],
    });
  }

  setUpMatch(jsonMessage) {
    // This method can receive whatever it is on the message sent "matchSetUp" from the client (Lobby.js)
    let validSettings = false;
    /* Validate settings here, if everything is ok, the server will send a broadcast to let everybody know
      that the game will start.
    */
    if (jsonMessage) {
      validSettings = true;
    }

    return validSettings;
  }
}

// Singleton
const matchPage = new MatchController();
export default matchPage;
