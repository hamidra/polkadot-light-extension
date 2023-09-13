// TODO copied from here: https://github.com/polkadot-js/extension/blob/master/packages/extension-base/src/stores/Accounts.ts
// to remove direct dependency to extension-base, which resulted in a `process.env` undefined error.
// Should be solve differently at some point.
// Copyright 2019-2023 @polkadot/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0
import type { KeyringJson, KeyringStore } from '@polkadot/ui-keyring/types';

type StoreValue = Record<string, unknown>;

const lastError = (type: string): void => {
  const error = chrome.runtime.lastError;

  if (error) {
    console.error(`BaseStore.${type}:: runtime.lastError:`, error);
  }
};

export abstract class BaseStore<T> {
  #prefix: string;

  constructor(prefix: string | null) {
    this.#prefix = prefix ? `${prefix}:` : '';
  }

  public all(update: (key: string, value: T) => void): void {
    this.allMap((map): void => {
      Object.entries(map).forEach(([key, value]): void => {
        update(key, value);
      });
    });
  }

  public allMap(update: (value: Record<string, T>) => void): void {
    chrome.storage.local.get(null, (result: StoreValue): void => {
      lastError('all');

      const entries = Object.entries(result);
      const map: Record<string, T> = {};

      for (let i = 0, count = entries.length; i < count; i++) {
        const [key, value] = entries[i];

        if (key.startsWith(this.#prefix)) {
          map[key.replace(this.#prefix, '')] = value as T;
        }
      }

      update(map);
    });
  }

  public get(key: string, update: (value: T) => void): void {
    const prefixedKey = `${this.#prefix}${key}`;

    chrome.storage.local.get([prefixedKey], (result: StoreValue): void => {
      lastError('get');

      update(result[prefixedKey] as T);
    });
  }

  public remove(key: string, update?: () => void): void {
    const prefixedKey = `${this.#prefix}${key}`;

    chrome.storage.local.remove(prefixedKey, (): void => {
      lastError('remove');

      update && update();
    });
  }

  public set(key: string, value: T, update?: () => void): void {
    const prefixedKey = `${this.#prefix}${key}`;

    chrome.storage.local.set({ [prefixedKey]: value }, (): void => {
      lastError('set');

      update && update();
    });
  }
}

export class AccountsStore extends BaseStore<KeyringJson> implements KeyringStore {
  constructor() {
    super('accounts');
  }

  public override set(key: string, value: KeyringJson, update?: () => void): void {
    // shortcut, don't save testing accounts in extension storage
    if (key.startsWith('account:') && value.meta && value.meta.isTesting) {
      update && update();

      return;
    }

    super.set(key, value, update);
  }
}
