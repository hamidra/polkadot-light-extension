import { getRpcClient } from 'core';

// connect to the extension
console.info('Pinging background ...');
getRpcClient()
  .ping()
  .then((result) => console.info(`Ping result:${result}`));
