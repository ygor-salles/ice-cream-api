import { app } from './app';
import createConnection from './database/index';

// DEPLOY 08/06/2023
createConnection()
  .then(async () => {
    console.log('Database connection successfully initialized 👍');

    app.listen(process.env.PORT || 4000, () =>
      console.log(`Server is running ${process.env.PORT || 4000} 🚀`),
    );
  })
  .catch(error => {
    console.log(`TypeORM connection error: ${error.message} ❌`);

    app.listen(process.env.PORT || 4000, () =>
      console.log(`Server is running ${process.env.PORT || 4000} 🚀`),
    );
  });
