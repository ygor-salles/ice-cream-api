import { Request, Response, Router } from 'express';
import { ensureSuper } from './middlewares/ensureSuper';
// import { ensureEmployee } from './middlewares/ensureEmployee';
// import { ensureNormal } from './middlewares/ensureNormal';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { UserController } from './controllers/UserController';
import { AuthController } from './controllers/AuthController';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hellow world' });
});

const userController = new UserController();
const authController = new AuthController();

router.post('/users', userController.create);
router.get('/users', ensureAuthenticated, userController.read);
router.get('/users/:id', userController.readById);
router.delete('/users/:id', ensureAuthenticated, ensureSuper, userController.deleteById);
router.put('/users/:id', ensureAuthenticated, ensureSuper, userController.updateById);

router.post('/signin', authController.handle);

export { router };
