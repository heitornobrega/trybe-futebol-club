import { Response, Request } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private service: MatchesService) { }
  getAll = async (_req: Request, res: Response) => {
    const allMatches = await this.service.getAll();
    return res.status(200).json(allMatches);
  };
}
