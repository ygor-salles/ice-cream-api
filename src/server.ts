/* eslint-disable no-console */
import { createServer } from 'http';
import { app } from './app';
import createConnection from './database';
import { initSocket } from './socket';
import { keepAlive } from './utils/keep-alive';

const HOSTING = process.env.HOSTING ?? 'local';

createConnection()
  .then(() => {
    console.log('Database connection successfully initialized 👍');

    const server = createServer(app);
    initSocket(server);

    const port = process.env.PORT || 4000;
    server.listen(port, () => {
      console.log(`Server is running on port ${port} 🚀`);
    });

    if (HOSTING.includes('onrender')) {
      console.log('Keep alive');
      keepAlive(() => {});
    }
  })
  .catch(error => {
    console.log(`Database connection error: ${error.message} ❌`);

    const server = createServer(app);
    initSocket(server);

    const port = process.env.PORT || 4000;
    server.listen(port, () => {
      console.log(`Server is running on port ${port} 🚀`);
    });

    if (HOSTING.includes('onrender')) {
      console.log('Keep alive');
      keepAlive(() => {});
    }
  });
