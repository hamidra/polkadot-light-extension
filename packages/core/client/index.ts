import { PJSSingleAccountV3 } from 'storage/formats';

import { PROVIDER_NAME } from '../provider';
import { ProviderError, ProviderMessageTypes, ProviderRequest, ProviderResponse } from '../types';

export type RpcMessage<T extends ProviderMessageTypes> = {
  id: number;
  message: ProviderRequest<T> | ProviderResponse<T> | ProviderError;
};

type DeferredCall = {
  resolve: (value: unknown) => void;
  reject: (error: Error) => void;
};

// maximum messages in the queue, this will bound the size of queue to 2^16. when overflow happens, the oldest calls are rejected/removed to free space.
const MAX_QUEUE_SIZE = 2 ** 16;

class DeferredCallQueue {
  private counter: number;
  private queue: Map<number, DeferredCall>;
  private maxSize: number;
  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.counter = 0;
    this.queue = new Map();
  }
  private freeCell(id: number, message: string) {
    this.queue.get(id)?.reject(new Error(message));
    this.queue.delete(id);
  }

  private nextId() {
    // increment counter
    this.counter = (this.counter + 1) % this.maxSize;
    return this.counter;
  }

  add(deferred: DeferredCall) {
    const id = this.nextId();
    // if there is a pending message with that id that has not yet resolved, it will be canceled.
    this.freeCell(this.counter, 'Message has been dropped due to queue overflow.');
    this.queue.set(id, deferred);
    return id;
  }

  take(id: number) {
    const call = this.queue.get(id);
    this.queue.delete(id);
    return call;
  }
}

class RpcClient {
  private rpcPort: chrome.runtime.Port;
  private callQueue: DeferredCallQueue;
  constructor(connectInfo: chrome.runtime.ConnectInfo) {
    this.callQueue = new DeferredCallQueue(MAX_QUEUE_SIZE);

    // setup connection
    this.rpcPort = chrome.runtime.connect(connectInfo);

    // listen to Rpc responses to resolve the pending calls
    this.rpcPort.onMessage.addListener((rpcMessage: RpcMessage<ProviderMessageTypes>) => {
      const { message, id } = rpcMessage;
      // lookup message queue to resolve the pending message
      const promise = this.callQueue.take(id);

      if (message.type === 'error') {
        // reject the pending call with error.
        promise?.reject(message.data);
      }

      // resolve the pending call
      promise?.resolve(rpcMessage.message);
    });
  }

  private async sendMessage<TMessageType extends ProviderMessageTypes>(
    message: ProviderRequest<TMessageType>,
  ): Promise<ProviderResponse<TMessageType>> {
    return new Promise((resolve: (value: ProviderResponse<TMessageType>) => void, reject) => {
      const deferredCall = { resolve: resolve as (value: unknown) => void, reject };
      const id = this.callQueue.add(deferredCall);
      const rpcMessage = { id, message };
      this.rpcPort.postMessage(rpcMessage);
    });
  }

  async importPJSAccount(file: PJSSingleAccountV3, password: string): Promise<void> {
    const response = await this.sendMessage({
      type: 'pri(json.restore)',
      data: { file, password },
    });
    return response.data;
  }

  async listAccounts() {
    const response = await this.sendMessage({
      type: 'pri(accounts.list)',
      data: {},
    });
    return response.data;
  }

  async forgetAccounts(addresses: string[]) {
    const response = await this.sendMessage({
      type: 'pri(accounts.forget)',
      data: { addresses },
    });
    return response.data;
  }

  async createAccountFromSeed(seed: string, password: string, name: string) {
    const response = await this.sendMessage({
      type: 'pri(account.create.seed)',
      data: { seed, password, name },
    });
    return response.data;
  }

  async ping() {
    const response = await this.sendMessage({
      type: 'pri(ping)',
      data: null,
    });
    return response.data;
  }
}

// Singleton
let internalClient: RpcClient;

// provides an rpc channel for different components of extension (Popup, ...) to communicate with background service worker.
function getRpcClient() {
  if (!internalClient) {
    internalClient = new RpcClient({ name: PROVIDER_NAME });
  }
  return internalClient;
}

export { getRpcClient };
