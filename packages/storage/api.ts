import { PJSSingleAccountV3 } from "./formats/PJSSingleAccount";

export function getBrowserInstance(): typeof chrome | typeof browser {
  // Get extension api Chrome or Firefox
  if (window.chrome) {
    window.chrome.storage;
    return window.chrome;
  }
  if ("browser" in window) {
    window.browser;
    return window["browser"];
  }
}

const storageAPI = getBrowserInstance().storage;

const importAccount = (exportedAccount: PJSSingleAccountV3) => {
  return storageAPI.local.set({
    [`account:${exportedAccount.address}`]: exportedAccount,
  });
};

const getAccounts = (): Promise<Array<PJSSingleAccountV3>> =>
  new Promise((resolve) => {
    const accounts: Array<PJSSingleAccountV3> = [];

    storageAPI.local.get(null, (items) => {
      Object.entries(items).forEach(([key, value]) => {
        if (key.startsWith("account:")) {
          accounts.push(value as PJSSingleAccountV3);
        }
      });

      resolve(accounts);
    });
  });

const clearStorage = () => {
  return storageAPI.local.clear();
};

export { clearStorage, getAccounts, importAccount };
