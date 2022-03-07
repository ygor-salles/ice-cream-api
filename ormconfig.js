require("dotenv").config();

let config = {}
if (process.env.NODE_ENV === 'development') {
  config = {
    type: "postgres",
    host: "localhost",
    port: +process.env.BD_PORT || 5432,
    username: process.env.BD_USERNAME,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE,
    synchronize: false,
    migrations: ["src/database/migrations/*.ts"],
    entities: ["src/entities/*.ts"],
    cli: {
      migrationsDir: "./src/database/migrations",
    }
  }
} else if (process.env.NODE_ENV === 'test') {
  config = {
    type: "postgres",
    host: "localhost",
    port: +process.env.BD_PORT_TEST || 5432,
    username: process.env.BD_USERNAME_TEST,
    password: process.env.BD_PASSWORD_TEST,
    database: process.env.BD_DATABASE_TEST,
    synchronize: false,
    migrations: ["src/database/migrations/*.ts"],
    entities: ["src/entities/*.ts"],
    cli: {
      migrationsDir: "./src/database/migrations",
    },
  }
} else if (process.env.NODE_ENV === 'production') {
  config = {
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
    migrations: ['build/src/database/migrations/*.js'],
    entities: ['build/src/entities/*.js'],
    cli: {
      migrationsDir: 'build/src/database/migrations',
    },
  };
} else {
  console.log('NODE_ENV incorrect...');
}

module.exports = config;