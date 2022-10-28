import { Router } from 'express';
import MatchesFactory from '../factories/MatchesFactory';

const matchesRouter = Router();
const matchesController = MatchesFactory.make();

matchesRouter.patch('/:id/finish', (req, res) => matchesController.endGame(req, res));
matchesRouter.get('/', (req, res, next) => matchesController.inProgressHandle(req, res, next));
matchesRouter.get('/', (req, res) => matchesController.getAll(req, res));
matchesRouter.post('/', (req, res, next) => matchesController.createStartedGame(req, res, next));

export default matchesRouter;
