import * as storage from 'storage';

import type {
  AccountProviderRpc,
  InjectedAccount,
  ProviderRequest,
  RequestAccountCreateFromSeed,
  RequestAccountForget,
  RequestJsonRestore,
} from '../types';

export const PROVIDER_NAME = 'Internal_RPC';

const jsonRestore = async ({ file, password }: RequestJsonRestore) => {
  await storage.importAccount(file, password);
};

const listAccounts = async () => {
  const accounts = await storage.getAccounts();

  // transform to InjectedAccount
  const injectedAccounts = accounts.map(
    (account) =>
      ({
        address: account.address,
        genesisHash: account.meta.genesisHash,
        name: account.meta.name,
        type: account.meta.type,
      }) as InjectedAccount,
  );

  return injectedAccounts;
};

const forgetAccounts = async ({ addresses }: RequestAccountForget) => {
  // ToDo: Iterate through accounts when the storage API supports individual deletes.
  const forgetCalls = addresses.map((address) => storage.forgetAccount(address));
  await Promise.all(forgetCalls);
};

const CreateAccountsFromSeed = async ({ seed, password, name }: RequestAccountCreateFromSeed) => {
  await storage.createAccount(seed, password, name);
};

export const providerMessageHandler = async <T extends keyof AccountProviderRpc>(
  message: ProviderRequest<T>,
): Promise<AccountProviderRpc[T]['Response'] | 'noop'> => {
  console.info(`received ${message.type}, data ${JSON.stringify(message.data)}`);
  switch (message.type) {
    case 'pri(ping)':
      return true;
    case 'pri(json.restore)':
      return jsonRestore(message.data as RequestJsonRestore);
    case 'pri(accounts.list)':
      return listAccounts();
    case 'pri(accounts.forget)':
      return forgetAccounts(message.data as RequestAccountForget);
    case 'pri(account.create.seed)':
      return CreateAccountsFromSeed(message.data as RequestAccountCreateFromSeed);
    default:
      return 'noop';
  }
};
