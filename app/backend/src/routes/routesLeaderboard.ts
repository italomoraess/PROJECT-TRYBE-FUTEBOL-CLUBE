import { Router } from 'express';
import controllerLeaderboard from '../controllers/controllerLeaderboard';

const router = Router();

router.get('/home', controllerLeaderboard.leaderBoard);

export default router;
