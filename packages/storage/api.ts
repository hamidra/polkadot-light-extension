import { KeyringPair$Json } from '@polkadot/keyring/types';
import keyring from '@polkadot/ui-keyring';
import { KeyringAddress } from '@polkadot/ui-keyring/types';
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';

import { AccountsStore } from './AccountsStore';
import { PJSSingleAccountV3 } from './formats';

/**
 * Needs to be called before using any storage functions
 * This function is tied to the extension api using session storage.
 * @returns
 */
const initStorage = async (): Promise<void> => {
  console.info('STORAGE::INITIALIZING');
  await cryptoWaitReady();
  keyring.loadAll({
    store: new AccountsStore(),
    type: 'sr25519',
  });
  console.info('STORAGE::INITIALIZED');
};

const importAccount = async (exportedAccount: PJSSingleAccountV3, password: string) => {
  const data: KeyringPair$Json = exportedAccount as KeyringPair$Json;
  return keyring.restoreAccount(data, password);
};

const createAccount = async (mnemonic: string, password: string, name: string) => {
  return keyring.addUri(mnemonic, password, { name }).pair;
};

const getAccounts = async (): Promise<Array<KeyringAddress>> => {
  return keyring.getAccounts();
};

const forgetAccount = async (address: string): Promise<void> => {
  keyring.forgetAccount(address);
};

export { createAccount, mnemonicGenerate as generateMnemonic, getAccounts, importAccount, forgetAccount, initStorage };
