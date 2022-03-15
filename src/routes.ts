import { Request, Response, Router } from 'express';
import { ensureSuper } from './middlewares/ensureSuper';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { UserController } from './controllers/UserController';
import { AuthController } from './controllers/AuthController';
import { ClientController } from './controllers/ClientController';
import { ProviderController } from './controllers/ProviderController';
import { ProductController } from './controllers/ProductController';
import { PaymentController } from './controllers/PaymentController';
import { PurchaseController } from './controllers/PurchaseController';
import { SaleController } from './controllers/SaleController';
import { CombinationController } from './controllers/CombinationController';

const router = Router();

const authController = new AuthController();
const userController = new UserController();
const clientController = new ClientController();
const providerController = new ProviderController();
const productController = new ProductController();
const paymentController = new PaymentController();
const purchaseController = new PurchaseController();
const saleController = new SaleController();
const combinationController = new CombinationController();

router.get('/', (req: Request, resp: Response) =>
  resp.status(200).json({ message: 'Welcome api-iceCreamShop' }),
);
router.post('/signin', authController.handle);

// *************************************** USER ROUTES ********************************************** //
// router.post('/users', ensureAuthenticated, ensureSuper, userController.create);
router.post('/users', userController.create);
router.get('/users', ensureAuthenticated, userController.read);
router.get('/users/:id', userController.readById);
router.delete('/users/:id', ensureAuthenticated, ensureSuper, userController.deleteById);
router.put('/users/:id', ensureAuthenticated, ensureSuper, userController.updateById);

// *************************************** CLIENT ROUTES ********************************************** //
router.post('/clients', ensureAuthenticated, ensureSuper, clientController.create);
router.get('/clients', ensureAuthenticated, clientController.read);
router.get('/clients/:id', ensureAuthenticated, clientController.readById);
router.delete('/clients/:id', ensureAuthenticated, ensureSuper, clientController.deleteById);
router.put('/clients/:id', ensureAuthenticated, ensureSuper, clientController.updateById);

// *************************************** PROVIDER ROUTES ********************************************** //
router.post('/providers', ensureAuthenticated, ensureSuper, providerController.create);
router.get('/providers', ensureAuthenticated, providerController.read);
router.get('/providers/:id', ensureAuthenticated, providerController.readById);
router.delete('/providers/:id', ensureAuthenticated, ensureSuper, providerController.deleteById);
router.put('/providers/:id', ensureAuthenticated, ensureSuper, providerController.updateById);

// *************************************** PRODUCT ROUTES ********************************************** //
router.post('/products', ensureAuthenticated, ensureSuper, productController.create);
router.get('/products', ensureAuthenticated, productController.read);
router.get('/products/:id', ensureAuthenticated, productController.readById);
router.delete('/products/:id', ensureAuthenticated, ensureSuper, productController.deleteById);
router.put('/products/:id', ensureAuthenticated, ensureSuper, productController.updateById);

// *************************************** PAYMENT ROUTES ********************************************** //
router.post('/payments', ensureAuthenticated, ensureSuper, paymentController.create);
router.get('/payments', ensureAuthenticated, paymentController.read);
router.get('/payments/:id', ensureAuthenticated, paymentController.readById);
router.delete('/payments/:id', ensureAuthenticated, ensureSuper, paymentController.deleteById);
router.put('/payments/:id', ensureAuthenticated, ensureSuper, paymentController.updateById);

// *************************************** PURCHASE ROUTES ********************************************** //
router.post('/purchase', ensureAuthenticated, ensureSuper, purchaseController.create);
router.get('/purchase', ensureAuthenticated, purchaseController.read);
router.get('/purchase/:id', ensureAuthenticated, purchaseController.readById);
router.delete('/purchase/:id', ensureAuthenticated, ensureSuper, purchaseController.deleteById);
router.put('/purchase/:id', ensureAuthenticated, ensureSuper, purchaseController.updateById);

// *************************************** SALES ROUTES ********************************************** //
router.post('/sales', ensureAuthenticated, ensureSuper, saleController.create);
router.get('/sales', ensureAuthenticated, saleController.read);
router.get('/sales/:id', ensureAuthenticated, saleController.readById);
router.delete('/sales/:id', ensureAuthenticated, ensureSuper, saleController.deleteById);
router.put('/sales/:id', ensureAuthenticated, ensureSuper, saleController.updateById);

// *************************************** COMBINATIONS ROUTES ********************************************** //
router.post('/combinations', ensureAuthenticated, ensureSuper, combinationController.create);
router.get('/combinations', ensureAuthenticated, combinationController.read);
router.get('/combinations/:id', ensureAuthenticated, combinationController.readById);
router.delete(
  '/combinations/:id',
  ensureAuthenticated,
  ensureSuper,
  combinationController.deleteById,
);
router.put('/combinations/:id', ensureAuthenticated, ensureSuper, combinationController.updateById);

export { router };
