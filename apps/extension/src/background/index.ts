import { PROVIDER_NAME, providerMessageHandler } from 'core';

import { LifeCycle } from './lifecycle';

// initialize
LifeCycle.initialize();

chrome.runtime.onInstalled.addListener((details) => {
  const { reason, previousVersion } = details;
  console.info(reason, previousVersion);
});

chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
  console.info(`${port.name} : PORT::CONNECTED`);

  // Only listen to messages sent to the provider
  if (port.name === PROVIDER_NAME) {
    port.onMessage.addListener((rpcRequests, port) => {
      const id = rpcRequests.id;
      const type = rpcRequests.message.type;
      const request = rpcRequests.message;
      // handle the requests when extension is Ready.
      LifeCycle.waitReady()
        .then(() => providerMessageHandler(request))
        .then((response) => {
          const rpcResponse = { id, message: { type, data: response } };
          port.postMessage(rpcResponse);
        })
        .catch((error) => {
          const rpcError = { id, message: { type: 'error', data: error } };
          port.postMessage(rpcError);
        });
    });
  } else {
    console.info(`${port.name} : PORT::IGNORED`);
  }

  port.onDisconnect.addListener((port) => {
    console.info(`${port.name} : PORT::DISCONNECTED`);
  });
});

addEventListener('activate', (event) => {
  console.info(`${event.type} : EXTENSION::ACTIVATED`);
});
