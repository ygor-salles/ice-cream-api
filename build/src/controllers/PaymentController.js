"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const PaymentService_1 = require("../services/PaymentService");
const ApiError_1 = require("../validators/Exceptions/ApiError");
const PaymentValidator_1 = require("../validators/PaymentValidator");
class PaymentController {
    async create(request, response) {
        var _a;
        const data = __rest(request.body, []);
        const paymentValidator = new PaymentValidator_1.PaymentValidator();
        try {
            await paymentValidator.createValidaton().validate(data, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        const paymentService = new PaymentService_1.PaymentService();
        const payment = await paymentService.create(data);
        response.status(201).json(payment);
    }
    async read(request, response) {
        const paymentService = new PaymentService_1.PaymentService();
        const payment = await paymentService.read();
        response.status(200).json(payment);
    }
    async readById(request, response) {
        var _a;
        const { id } = request.params;
        const paymentValidator = new PaymentValidator_1.PaymentValidator();
        try {
            await paymentValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await paymentValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'Payment does not exist');
        const paymentService = new PaymentService_1.PaymentService();
        const payment = await paymentService.readById(+id);
        response.status(200).json(payment);
    }
    async deleteById(request, response) {
        var _a;
        const { id } = request.params;
        const paymentValidator = new PaymentValidator_1.PaymentValidator();
        try {
            await paymentValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await paymentValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'Payment does not exist');
        const paymentService = new PaymentService_1.PaymentService();
        await paymentService.deleteById(+id);
        response.status(200).json({ message: 'Payment deleted successfully' });
    }
    async updateById(request, response) {
        var _a;
        const { id } = request.params;
        const data = __rest(request.body, []);
        const paymentValidator = new PaymentValidator_1.PaymentValidator();
        try {
            await paymentValidator
                .updateValidation()
                .validate(Object.assign({ id: +id }, data), { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await paymentValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'Payment does not exist');
        const paymentService = new PaymentService_1.PaymentService();
        await paymentService.updateById(+id, data);
        response.status(200).json({ message: 'Payment updated successfully' });
    }
    async readPaymentsPaged(request, response) {
        var _a;
        const _b = request.query, { limit, page } = _b, rest = __rest(_b, ["limit", "page"]);
        const limitNum = parseInt(limit) || 1;
        const pageNum = parseInt(page) || 1;
        const dataFormmated = Object.assign(Object.assign({}, rest), { limit: limitNum, page: pageNum });
        const validator = new PaymentValidator_1.PaymentValidator();
        try {
            await validator.readPagedValidation().validate(dataFormmated, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!validator.isRangeDateValid(rest.start_date, rest.end_date)) {
            throw new ApiError_1.ApiError(400, 'Range date incorrect');
        }
        const paymentService = new PaymentService_1.PaymentService();
        const allPaymentsPaged = await paymentService.readPaymentsPaged(dataFormmated);
        response.json(allPaymentsPaged);
    }
}
exports.PaymentController = PaymentController;
