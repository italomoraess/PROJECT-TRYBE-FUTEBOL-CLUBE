import { Router } from 'express';
import controllerMatches from '../controllers/controllerMatches';

const router = Router();

router.get('/', controllerMatches.getAll);

export default router;
