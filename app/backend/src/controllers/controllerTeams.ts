import { Request, Response } from 'express';
import serviceTeams from '../services/serviceTeams';

const getAll = async (req: Request, res: Response) => {
  const teams = await serviceTeams.getAll();
  return res.status(200).json(teams);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await serviceTeams.getById(+id);
  return res.status(200).json(team);
};

export default { getAll, getById };
