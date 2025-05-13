"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionConfig = void 0;
const { ENV_MIGRATIONS } = process.env;
const { ENV_ENTITIES } = process.env;
const { ENV_MIGRATIONS_DIR } = process.env;
const connectionConfig = () => {
    var _a, _b;
    if (process.env.NODE_ENV === 'test') {
        return {
            type: 'postgres',
            host: (_a = process.env.BD_HOST) !== null && _a !== void 0 ? _a : 'localhost',
            port: +process.env.BD_PORT_TEST || 5432,
            username: process.env.BD_USERNAME_TEST,
            password: process.env.BD_PASSWORD_TEST,
            database: process.env.BD_DATABASE_TEST,
            synchronize: false,
            migrations: [ENV_MIGRATIONS],
            entities: [ENV_ENTITIES],
            cli: {
                migrationsDir: ENV_MIGRATIONS_DIR,
            },
        };
    }
    if (process.env.NODE_ENV === 'production') {
        return {
            type: 'postgres',
            host: process.env.BD_HOST_PROD,
            port: +process.env.BD_PORT_PROD || 5432,
            username: process.env.BD_USERNAME_PROD,
            password: process.env.BD_PASSWORD_PROD,
            database: process.env.BD_DATABASE_PROD,
            synchronize: false,
            extra: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
            migrations: [ENV_MIGRATIONS],
            entities: [ENV_ENTITIES],
            cli: {
                migrationsDir: ENV_MIGRATIONS_DIR,
            },
        };
    }
    if (process.env.NODE_ENV === 'staging') {
        return {
            type: 'postgres',
            host: process.env.BD_HOST_STG,
            port: +process.env.BD_PORT_STG || 5432,
            username: process.env.BD_USERNAME_STG,
            password: process.env.BD_PASSWORD_STG,
            database: process.env.BD_DATABASE_STG,
            synchronize: false,
            extra: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
            migrations: [ENV_MIGRATIONS],
            entities: [ENV_ENTITIES],
            cli: {
                migrationsDir: ENV_MIGRATIONS_DIR,
            },
        };
    }
    return {
        type: 'postgres',
        host: (_b = process.env.BD_HOST) !== null && _b !== void 0 ? _b : 'localhost',
        port: process.env.BD_PORT || 5432,
        username: process.env.BD_USERNAME,
        password: process.env.BD_PASSWORD,
        database: process.env.BD_DATABASE,
        synchronize: false,
        migrations: [ENV_MIGRATIONS],
        entities: [ENV_ENTITIES],
        cli: {
            migrationsDir: ENV_MIGRATIONS_DIR,
        },
    };
};
exports.connectionConfig = connectionConfig;
