/* eslint-disable no-console */
import axios from 'axios';

const { HOSTING } = process.env;

export function keepAlive(fn: Function) {
  axios
    .get(`${HOSTING}/health`)
    .then(response => {
      console.log(`Keep alive response: ${response.data}`);
      setTimeout(() => keepAlive(fn), 120000); // 2 em 2 minutos
    })
    .catch(() => {
      fn();
    });
}
