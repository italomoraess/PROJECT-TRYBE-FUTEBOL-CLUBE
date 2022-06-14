import { Request, Response } from 'express';
import serviceMatches from '../services/serviceMatches';

const getAll = async (req: Request, res: Response) => {
  const matches = await serviceMatches.getAll();
  return res.status(200).json(matches);
};

const create = async (req: Request, res: Response) => {
  const insertMatch = await serviceMatches.create(req.body);
  if (insertMatch === undefined) {
    return res.status(401).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }
  if (insertMatch === 'False') {
    return res.status(404).json({
      message: 'There is no team with such id!',
    });
  }
  return res.status(201).json(insertMatch);
};

const updateMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  await serviceMatches.updateMatch(+id);

  return res.status(200).json({ message: 'Finiched' });
};

export default { getAll, create, updateMatch };
