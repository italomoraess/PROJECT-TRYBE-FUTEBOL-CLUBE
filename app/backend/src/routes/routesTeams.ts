import { Router } from 'express';
import controllerTeams from '../controllers/controllerTeams';

const router = Router();

router.get('/', controllerTeams.getAll);
router.get('/:id', controllerTeams.getById);

export default router;
