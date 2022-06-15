import { Request, Response } from 'express';
import serviceLeader from '../services/serviceLeaderboard';

const leaderBoard = async (req: Request, res: Response) => {
  const leader = await serviceLeader.board();

  return res.status(200).json(leader);
};

export default { leaderBoard };
