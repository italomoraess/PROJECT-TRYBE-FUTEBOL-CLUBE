import { Router } from 'express';
import controllerLogin from '../controllers/controllerLogin';
import verifyEmail from '../middlewares/verifyEmail';
import verifyPassword from '../middlewares/verifyPassword';

const router = Router();

router.post('/', verifyEmail, verifyPassword, controllerLogin.login);
router.get('/validate', controllerLogin.loginValidate);

export default router;
