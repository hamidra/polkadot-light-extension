import { initStorage } from 'storage';

type ExtensionState = 'notInitialized' | 'initializing' | 'initialized';

export class LifeCycle {
  private static state: ExtensionState = 'notInitialized';
  private static waitingForInit: Array<(result: boolean) => void> = [];
  private static resolveWaitingQueue() {
    // resolve waiting calls
    LifeCycle.waitingForInit.map((resolve) => {
      resolve(true);
    });
    // rest queue
    LifeCycle.waitingForInit = [];
  }
  static async initialize() {
    LifeCycle.state = 'initializing';
    // Initialize storage
    await initStorage();
    LifeCycle.state = 'initialized';
    LifeCycle.resolveWaitingQueue();
  }

  static async waitReady() {
    // initialize the extension is not already been initialized.
    if (LifeCycle.state === 'notInitialized') {
      LifeCycle.initialize();
    }

    return new Promise((resolve) => {
      if (LifeCycle.state === 'initialized') {
        resolve(true);
      } else {
        LifeCycle.waitingForInit.push(resolve);
      }
    });
  }
}
