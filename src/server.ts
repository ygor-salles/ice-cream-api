/* eslint-disable no-console */
import { createServer } from 'http';
import { app } from './app';
import createConnection from './database';
import { initSocket } from './socket';

createConnection()
  .then(() => {
    console.log('Database connection successfully initialized 👍');

    const server = createServer(app);
    initSocket(server);

    const port = process.env.PORT || 4000;
    server.listen(port, () => {
      console.log(`Server is running on port ${port} 🚀`);
    });
  })
  .catch(error => {
    console.log(`TypeORM connection error: ${error.message} ❌`);
  });
