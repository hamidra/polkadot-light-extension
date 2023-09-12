import { KeyringPair$Json } from "@polkadot/keyring/types";
import keyring from "@polkadot/ui-keyring";
import { KeyringAddress } from "@polkadot/ui-keyring/types";
import { AccountsStore } from "./AccountsStore";
import { PJSSingleAccountV3 } from "./formats";

let isInitialized: boolean = false;
let isInitializing: boolean = false;
/**
 * Needs to be called before using any storage functions
 * This function is tied to the extension api using session storage.
 * @returns
 */
const initStorage = async (): Promise<void> => {
  if (isInitialized) return;
  if (isInitializing) return;
  isInitializing = true;

  // TODO this makes importing accounts super slow, no clue why.
  // Afaik it should speed up the crypto stuff
  // await cryptoWaitReady();

  keyring.loadAll({
    store: new AccountsStore(),
    type: "sr25519",
  });

  isInitialized = true;
  isInitializing = false;
};
// TODO maybe not the best place to do this.
// PJS does this in background.ts but in v3 manifest it's
// different context than popup.ts so it's not initialized there.
initStorage();

const importAccount = async (
  exportedAccount: PJSSingleAccountV3,
  password: string,
) => {
  const data: KeyringPair$Json = exportedAccount as KeyringPair$Json;
  return keyring.restoreAccount(data, password);
};

const getAccounts = async (): Promise<Array<KeyringAddress>> => {
  return keyring.getAccounts();
};

export const forgetAccount = async (address: string): Promise<void> => {
  keyring.forgetAccount(address);
};

export { getAccounts, importAccount, initStorage };
