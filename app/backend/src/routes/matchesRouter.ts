import { Router } from 'express';
import MatchesFactory from '../factories/MatchesFactory';

const matchesRouter = Router();
const matchesController = MatchesFactory.make();

matchesRouter.get('/', (req, res, next) => matchesController.inProgressHandle(req, res, next));
matchesRouter.get('/', (req, res) => matchesController.getAll(req, res));
matchesRouter.post('/', (req, res) => matchesController.createStartedGame(req, res));

export default matchesRouter;
