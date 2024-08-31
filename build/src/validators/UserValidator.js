"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const typeorm_1 = require("typeorm");
const yup = __importStar(require("yup"));
const User_1 = require("../entities/User");
const UserRepository_1 = require("../repositories/UserRepository");
class UserValidator {
    async idExist(id) {
        const repository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
        const user = await repository.findOne(id);
        return !!user;
    }
    async emailExist(email) {
        const repository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
        const user = await repository.findOne({ email });
        return !!user;
    }
    createValidaton() {
        return yup.object().shape({
            name: yup.string().required('Name is required'),
            email: yup.string().email('Should be e-mail').required('E-mail is required'),
            password: yup.string().required('Password is required'),
            role: yup
                .mixed()
                .oneOf(Object.values(User_1.EnumRoleUser))
                .required('Type user is required'),
        });
    }
    updateValidation() {
        return yup.object().shape({
            id: yup.number().required('Id is required in params'),
            name: yup.string().optional(),
            email: yup.string().email('Should be e-mail').optional(),
            password: yup.string().optional(),
            role: yup.mixed().oneOf(Object.values(User_1.EnumRoleUser)).optional(),
        });
    }
    deleteByIdValidation() {
        return yup.object().shape({
            id: yup.number().required('Id is required in params'),
        });
    }
    readByIdValidation() {
        return yup.object().shape({
            id: yup.number().required('Id is required in params'),
        });
    }
}
exports.UserValidator = UserValidator;
