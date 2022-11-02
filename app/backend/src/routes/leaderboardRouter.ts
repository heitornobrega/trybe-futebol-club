import { Router } from 'express';
import MatchesFactory from '../factories/MatchesFactory';

const leaderboardRouter = Router();
const matchesController = MatchesFactory.make();

leaderboardRouter.get('/home', (req, res) => matchesController.getFinalizedHomeMatches(req, res));

export default leaderboardRouter;
