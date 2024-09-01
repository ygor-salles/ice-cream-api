"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const ensureSuper_1 = require("./middlewares/ensureSuper");
const ensureAuthenticated_1 = require("./middlewares/ensureAuthenticated");
const UserController_1 = require("./controllers/UserController");
const AuthController_1 = require("./controllers/AuthController");
const ClientController_1 = require("./controllers/ClientController");
const ProviderController_1 = require("./controllers/ProviderController");
const ProductController_1 = require("./controllers/ProductController");
const PaymentController_1 = require("./controllers/PaymentController");
const PurchaseController_1 = require("./controllers/PurchaseController");
const SaleController_1 = require("./controllers/SaleController");
const CombinationController_1 = require("./controllers/CombinationController");
const uploadFile_1 = require("./middlewares/uploadFile");
const ensureEmployee_1 = require("./middlewares/ensureEmployee");
const ensureHostLifeasier_1 = require("./middlewares/ensureHostLifeasier");
const router = (0, express_1.Router)();
exports.router = router;
const authController = new AuthController_1.AuthController();
const userController = new UserController_1.UserController();
const clientController = new ClientController_1.ClientController();
const providerController = new ProviderController_1.ProviderController();
const productController = new ProductController_1.ProductController();
const paymentController = new PaymentController_1.PaymentController();
const purchaseController = new PurchaseController_1.PurchaseController();
const saleController = new SaleController_1.SaleController();
const combinationController = new CombinationController_1.CombinationController();
router.get('/', (req, resp) => resp.status(200).json({ message: 'Welcome api-iceCreamShop' }));
router.post('/signin', authController.handle);
// *************************************** USER ROUTES ********************************************** //
router.post('/users', ensureAuthenticated_1.ensureAuthenticated, ensureSuper_1.ensureSuper, userController.create);
// router.post('/users', userController.create);
router.get('/users', ensureAuthenticated_1.ensureAuthenticated, ensureSuper_1.ensureSuper, userController.read);
router.get('/users/:id', userController.readById);
router.delete('/users/:id', ensureAuthenticated_1.ensureAuthenticated, ensureSuper_1.ensureSuper, userController.deleteById);
router.put('/users/:id', ensureAuthenticated_1.ensureAuthenticated, ensureSuper_1.ensureSuper, userController.updateById);
// *************************************** CLIENT ROUTES ********************************************** //
router.post('/clients', ensureAuthenticated_1.ensureAuthenticated, ensureEmployee_1.ensureEmployee, clientController.create);
router.get('/clients', ensureAuthenticated_1.ensureAuthenticated, clientController.read);
router.get('/clients/debits', ensureAuthenticated_1.ensureAuthenticated, clientController.readSumDebitClient);
router.get('/clients/:id', ensureAuthenticated_1.ensureAuthenticated, clientController.readById);
router.put('/clients/:id', ensureAuthenticated_1.ensureAuthenticated, ensureSuper_1.ensureSuper, clientController.updateById);
// *************************************** PROVIDER ROUTES ********************************************** //
router.post('/providers', ensureAuthenticated_1.ensureAuthenticated, ensureSuper_1.ensureSuper, providerController.create);
router.get('/providers', ensureAuthenticated_1.ensureAuthenticated, providerController.read);
router.get('/providers/:id', ensureAuthenticated_1.ensureAuthenticated, providerController.readById);
router.delete('/providers/:id', ensureAuthenticated_1.ensureAuthenticated, ensureSuper_1.ensureSuper, providerController.deleteById);
router.put('/providers/:id', ensureAuthenticated_1.ensureAuthenticated, ensureSuper_1.ensureSuper, providerController.updateById);
// *************************************** PRODUCT ROUTES ********************************************** //
router.post('/products', ensureAuthenticated_1.ensureAuthenticated, ensureEmployee_1.ensureEmployee, productController.create);
router.get('/products', ensureAuthenticated_1.ensureAuthenticated, productController.read);
router.get('/products/:id', ensureAuthenticated_1.ensureAuthenticated, productController.readById);
router.delete('/products/:id', ensureAuthenticated_1.ensureAuthenticated, ensureSuper_1.ensureSuper, productController.deleteById);
router.put('/products/:id', ensureAuthenticated_1.ensureAuthenticated, productController.updateById);
// *************************************** PAYMENT ROUTES ********************************************** //
router.post('/payments', ensureAuthenticated_1.ensureAuthenticated, ensureSuper_1.ensureSuper, paymentController.create);
router.get('/payments', ensureAuthenticated_1.ensureAuthenticated, paymentController.read);
router.get('/payments/paged', ensureAuthenticated_1.ensureAuthenticated, paymentController.readPaymentsPaged);
router.get('/payments/:id', ensureAuthenticated_1.ensureAuthenticated, paymentController.readById);
router.delete('/payments/:id', ensureAuthenticated_1.ensureAuthenticated, ensureSuper_1.ensureSuper, paymentController.deleteById);
// *************************************** PURCHASE ROUTES ********************************************** //
router.post('/purchase', ensureAuthenticated_1.ensureAuthenticated, ensureSuper_1.ensureSuper, uploadFile_1.UPLOAD_IMAGE.single('file'), purchaseController.create);
router.get('/purchase', ensureAuthenticated_1.ensureAuthenticated, purchaseController.read);
router.post('/purchase/period', ensureAuthenticated_1.ensureAuthenticated, ensureSuper_1.ensureSuper, purchaseController.readSumPurchasesByPeriod);
router.get('/purchase/today', ensureAuthenticated_1.ensureAuthenticated, purchaseController.readSumPurchasesToday);
router.get('/purchase/paged', ensureAuthenticated_1.ensureAuthenticated, purchaseController.readPurchasesPaged);
router.get('/purchase/:id', ensureAuthenticated_1.ensureAuthenticated, purchaseController.readById);
router.delete('/purchase/:id', ensureAuthenticated_1.ensureAuthenticated, ensureSuper_1.ensureSuper, purchaseController.deleteById);
router.put('/purchase/:id', ensureAuthenticated_1.ensureAuthenticated, ensureSuper_1.ensureSuper, uploadFile_1.UPLOAD_IMAGE.single('file'), purchaseController.updateById);
// *************************************** SALES ROUTES ********************************************** //
router.post('/sales/lifeasier', ensureHostLifeasier_1.ensureHostLifeasier, saleController.create);
router.post('/sales', ensureAuthenticated_1.ensureAuthenticated, saleController.create);
router.get('/sales/paged', ensureAuthenticated_1.ensureAuthenticated, saleController.readFilterSalePage);
router.post('/sales/period', ensureAuthenticated_1.ensureAuthenticated, ensureSuper_1.ensureSuper, saleController.readSumSalesByPeriod);
router.get('/sales/today', ensureAuthenticated_1.ensureAuthenticated, saleController.readSumOfTodaySales);
router.get('/sales/activated-acai', ensureAuthenticated_1.ensureAuthenticated, saleController.readSalesActivatedAcai);
router.post('/sales/cash-closing', ensureAuthenticated_1.ensureAuthenticated, ensureEmployee_1.ensureEmployee, saleController.dailyCashClosing);
router.get('/sales/:id', ensureAuthenticated_1.ensureAuthenticated, saleController.readById);
router.delete('/sales/:id', ensureAuthenticated_1.ensureAuthenticated, saleController.deleteById);
router.put('/sales/:id', ensureAuthenticated_1.ensureAuthenticated, saleController.updateById);
// *************************************** COMBINATIONS ROUTES ********************************************** //
router.post('/combinations', ensureAuthenticated_1.ensureAuthenticated, ensureEmployee_1.ensureEmployee, combinationController.create);
router.get('/combinations', ensureAuthenticated_1.ensureAuthenticated, combinationController.read);
router.get('/combinations/:id', ensureAuthenticated_1.ensureAuthenticated, combinationController.readById);
router.delete('/combinations/:id', ensureAuthenticated_1.ensureAuthenticated, ensureSuper_1.ensureSuper, combinationController.deleteById);
router.put('/combinations/:id', ensureAuthenticated_1.ensureAuthenticated, ensureSuper_1.ensureSuper, combinationController.updateById);
