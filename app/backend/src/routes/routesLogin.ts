import { Router } from 'express';
import login from '../controllers/controllerLogin';
import verifyEmail from '../middlewares/verifyEmail';
import verifyPassword from '../middlewares/verifyPassword';

const router = Router();

router.post('/', verifyEmail, verifyPassword, login);

export default router;
