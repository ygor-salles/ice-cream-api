require("dotenv").config();

const { ENV_MIGRATIONS } = process.env;
const { ENV_ENTITIES } = process.env
const { ENV_MIGRATIONS_DIR } = process.env;

let config = {}
if (process.env.NODE_ENV === 'development') {
  config = {
    type: "postgres",
    host: process.env.BD_HOST ?? 'localhost',
    port: process.env.BD_PORT ?? 5432,
    username: process.env.BD_USERNAME,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE,
    synchronize: false,
    migrations: [ENV_MIGRATIONS],
    entities: [ENV_ENTITIES],
    cli: {
      migrationsDir: ENV_MIGRATIONS_DIR,
    }
  }
}

else if (process.env.NODE_ENV === 'test') {
  config = {
    type: "postgres",
    host: process.env.BD_HOST ?? 'localhost',
    port: +process.env.BD_PORT_TEST ?? 5432,
    username: process.env.BD_USERNAME_TEST,
    password: process.env.BD_PASSWORD_TEST,
    database: process.env.BD_DATABASE_TEST,
    synchronize: false,
    migrations: [ENV_MIGRATIONS],
    entities: [ENV_ENTITIES],
    cli: {
      migrationsDir: ENV_MIGRATIONS_DIR,
    },
  }
} else if (process.env.NODE_ENV === 'production') {
  config = {
    type: 'postgres',
    host: process.env.BD_HOST_PROD,
    port: +process.env.BD_PORT_PROD ?? 5432,
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
} else if (process.env.NODE_ENV === 'staging') {
  config = {
    type: 'postgres',
    host: process.env.BD_HOST_STG,
    port: +process.env.BD_PORT_STG ?? 5432,
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
    migrations: [process?.env?.ENV_MIGRATIONS ?? 'src/database/migrations/*.ts'],
    entities: [process?.env?.ENV_ENTITIES ?? 'src/entities/*.ts'],
    cli: {
      migrationsDir: process?.env?.ENV_MIGRATIONS_DIR ?? 'src/database/migrations',
    },
  };
} else {
  console.log('NODE_ENV incorrect...');
}

module.exports = config;