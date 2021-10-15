import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import error from '../controllers/ErrorController.js';
import lobby from '../controllers/LobbyController.js';
import homepage from '../controllers/HomeController.js';
import credits from '../controllers/CreditsController.js';
import match from '../controllers/MatchController.js';
import log from '../controllers/LogController.js';

const router = express.Router();

const publicMiddleware = express.static(path.join(process.cwd(), 'public'));

router.use((req, res, next) => { log.logHttpRequest(req, res, next); });

// Waits until the body is all available
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res) => { homepage.getHomePage(req, res); });
router.get('/Lobby', (req, res) => { lobby.getLobbyPage(req, res); });
router.get('/Match', (req, res) => { match.getMatchPage(req, res); });
router.get('/Credits', (req, res) => { credits.getCreditsPage(req, res); });

router.use(publicMiddleware);

router.use((req, res) => { error.getNotFound(req, res); });

export default router;
