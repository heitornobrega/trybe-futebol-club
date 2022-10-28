import { Router } from 'express';
import auth from '../middlewares/auth';
import MatchesFactory from '../factories/MatchesFactory';
import ICustomRequest from '../utils/ICustomRequest';

const matchesRouter = Router();
const matchesController = MatchesFactory.make();

matchesRouter.patch('/:id/finish', (req, res) => matchesController.endGame(req, res));
matchesRouter.patch('/:id', (req, res) => matchesController.updateTeamsGoals(req, res));
matchesRouter.get('/', (req, res, next) => matchesController.inProgressHandle(req, res, next));
matchesRouter.get('/', (req, res) => matchesController.getAll(req, res));
matchesRouter.post(
  '/',
  (req, res, next) => auth(req as ICustomRequest, res, next),
  (req, res, next) => matchesController.createStartedGame(req, res, next),
);

export default matchesRouter;
