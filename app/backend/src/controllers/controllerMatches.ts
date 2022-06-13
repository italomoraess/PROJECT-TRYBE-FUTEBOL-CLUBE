import { Request, Response } from 'express';
import serviceMatches from '../services/serviceMatches';

const getAll = async (req: Request, res: Response) => {
  const matches = await serviceMatches.getAll();
  return res.status(200).json(matches);
};

export default { getAll };
