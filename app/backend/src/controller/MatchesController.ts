import { Response, Request, NextFunction } from 'express';
import { Secret, verify } from 'jsonwebtoken';
import CustomError from '../utils/CustomError';
import MatchesService from '../services/MatchesService';
import IPayload from '../utils/ICustomRequest';

const { JWT_SECRET } = process.env;

export default class MatchesController {
  constructor(private service: MatchesService) { }
  getAll = async (req: Request, res: Response) => {
    const allMatches = await this.service.getAll();
    return res.status(200).json(allMatches);
  };

  inProgressHandle = async (req: Request, res: Response, next: NextFunction) => {
    const queryExist = req.query.inProgress;
    if (!queryExist) { return next(); }
    if (queryExist === 'true') {
      const inProgressMatches = await this.service.getAllInProgress();
      return res.status(200).json(inProgressMatches);
    }

    const inProgressMatches = await this.service.getAllFinished();
    return res.status(200).json(inProgressMatches);
  };

  createStartedGame = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.homeTeam === req.body.awayTeam) {
      const error = new CustomError(
        'It is not possible to create a match with two equal teams',
        422,
      );
      return next(error);
    }
    const { authorization } = req.headers;
    const payload = verify(authorization as string, JWT_SECRET as Secret) as IPayload;
    const { id } = payload;
    if (id) {
      try {
        const startedGame = await this.service.createStartedGame(req.body);
        return res.status(201).json(startedGame);
      } catch (error) {
        const err = new CustomError('There is no team with such id!', 404);
        return next(err);
      }
    }
  };

  endGame = async (req: Request, res: Response) => {
    const { id } = req.params;
    const idNumber = Number(id);
    const finished = await this.service.endGame(idNumber);
    return res.status(200).json(finished);
  };
}
