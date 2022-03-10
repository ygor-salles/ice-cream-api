import { Request, Response, Router } from 'express';
import { ensureSuper } from './middlewares/ensureSuper';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { UserController } from './controllers/UserController';
import { AuthController } from './controllers/AuthController';
import { ClientController } from './controllers/ClientController';
import { ProviderController } from './controllers/ProviderController';
import { ProductController } from './controllers/ProductController';
import { PaymentController } from './controllers/PaymentController';

const router = Router();

const authController = new AuthController();
const userController = new UserController();
const clientController = new ClientController();
const providerController = new ProviderController();
const productController = new ProductController();
const paymentController = new PaymentController();

router.get('/', (req: Request, resp: Response) =>
  resp.status(200).json({ message: 'Welcome api-iceCreamShop' }),
);
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
router.delete('/clients/:id', ensureAuthenticated, ensureSuper, clientController.deleteById);
router.put('/clients/:id', ensureAuthenticated, ensureSuper, clientController.updateById);

router.post('/providers', ensureAuthenticated, ensureSuper, providerController.create);
router.get('/providers', ensureAuthenticated, providerController.read);
router.get('/providers/:id', ensureAuthenticated, providerController.readById);
router.delete('/providers/:id', ensureAuthenticated, ensureSuper, providerController.deleteById);
router.put('/providers/:id', ensureAuthenticated, ensureSuper, providerController.updateById);

router.post('/products', ensureAuthenticated, ensureSuper, productController.create);
router.get('/products', ensureAuthenticated, productController.read);
router.get('/products/:id', ensureAuthenticated, productController.readById);
router.delete('/products/:id', ensureAuthenticated, ensureSuper, productController.deleteById);
router.put('/products/:id', ensureAuthenticated, ensureSuper, productController.updateById);

router.post('/payments', ensureAuthenticated, ensureSuper, paymentController.create);
router.get('/payments', ensureAuthenticated, paymentController.read);
router.get('/payments/:id', ensureAuthenticated, paymentController.readById);
router.delete('/payments/:id', ensureAuthenticated, ensureSuper, paymentController.deleteById);
router.put('/payments/:id', ensureAuthenticated, ensureSuper, paymentController.updateById);

export { router };
