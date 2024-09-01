"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const typeorm_1 = require("typeorm");
const UserRepository_1 = require("../repositories/UserRepository");
class UserService {
    constructor() {
        this.repositoryUser = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
    }
    async create(data) {
        const user = this.repositoryUser.create(data);
        await this.repositoryUser.save(user);
        delete user.password;
        return user;
    }
    async read() {
        const allUsers = await this.repositoryUser.find({
            select: ['id', 'name', 'email', 'role', 'created_at', 'updated_at'],
            order: { updated_at: 'DESC' },
        });
        return allUsers;
    }
    async readById(id) {
        const user = await this.repositoryUser.findOne(id);
        delete user.password;
        return user;
    }
    async deleteById(id) {
        await this.repositoryUser.delete(id);
    }
    async updateById(id, data) {
        if (data.password) {
            data.password = await (0, bcryptjs_1.hash)(data.password, 8);
        }
        await this.repositoryUser.update(id, data);
    }
}
exports.UserService = UserService;
