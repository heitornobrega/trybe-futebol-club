import { Router } from 'express';
import TeamsFactory from '../factories/TeamsFactory';

const teamsRouter = Router();
const TeamsController = TeamsFactory.make();

teamsRouter.get('/:id', (req, res) => TeamsController.getByid(req, res));
teamsRouter.get('/', (req, res) => TeamsController.getAll(req, res));

export default teamsRouter;
