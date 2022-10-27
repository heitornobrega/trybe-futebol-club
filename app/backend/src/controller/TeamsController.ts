import { Response, Request } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(
    private service: TeamsService,
  ) { }

  getAll = async (_req: Request, res: Response) => {
    const result = await this.service.getAll();
    return res.status(200).json(result);
  };

  getByid = async (req: Request, res: Response) => {
    const { id } = req.params;
    const idNumber = Number(id);
    const result = await this.service.getById(idNumber);
    return res.status(200).json(result);
  };
}
