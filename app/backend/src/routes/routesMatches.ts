import { Router } from 'express';
import controllerMatches from '../controllers/controllerMatches';

const router = Router();

router.get('/', controllerMatches.getAll);
router.post('/', controllerMatches.create);
router.patch('/:id/finish', controllerMatches.updateMatch);
router.patch('/:id', controllerMatches.updateMatchProgress);

export default router;
