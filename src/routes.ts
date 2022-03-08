import { Request, Response, Router } from 'express';
import { ensureSuper } from './middlewares/ensureSuper';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { UserController } from './controllers/UserController';
import { AuthController } from './controllers/AuthController';
import { ClientController } from './controllers/ClientController';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hellow world' });
});

const authController = new AuthController();
const userController = new UserController();
const clientController = new ClientController();

router.post('/signin', authController.handle);

// router.post('/users', ensureAuthenticated, ensureSuper, userController.create);
router.post('/users', userController.create);
router.get('/users', ensureAuthenticated, userController.read);
router.get('/users/:id', userController.readById);
router.delete('/users/:id', ensureAuthenticated, ensureSuper, userController.deleteById);
router.put('/users/:id', ensureAuthenticated, ensureSuper, userController.updateById);

router.post('/clients', ensureAuthenticated, ensureSuper, clientController.create);
router.get('/clients', ensureAuthenticated, clientController.read);
router.get('/clients/:id', ensureAuthenticated, clientController.readById);
router.put('/clients/:id', ensureAuthenticated, ensureSuper, clientController.updateById);

export { router };
