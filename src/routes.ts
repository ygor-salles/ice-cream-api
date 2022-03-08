import { Request, Response, Router } from 'express';
import { ensureSuper } from './middlewares/ensureSuper';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { UserController } from './controllers/UserController';
import { AuthController } from './controllers/AuthController';
import { ClientController } from './controllers/ClientController';
import { ProviderController } from './controllers/ProviderController';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hellow world' });
});

const authController = new AuthController();
const userController = new UserController();
const clientController = new ClientController();
const providerController = new ProviderController();

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

router.post('/providers', ensureAuthenticated, ensureSuper, providerController.create);
router.get('/providers', ensureAuthenticated, providerController.read);
router.get('/providers/:id', ensureAuthenticated, providerController.readById);
router.put('/providers/:id', ensureAuthenticated, ensureSuper, providerController.updateById);

export { router };
