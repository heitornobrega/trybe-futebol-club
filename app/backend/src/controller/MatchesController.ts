import { Response, Request, NextFunction } from 'express';
import MatchesService from '../services/MatchesService';

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
}
