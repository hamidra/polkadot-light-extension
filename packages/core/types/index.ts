import { PJSSingleAccountV3 } from 'storage/formats/PJSSingleAccount';

export type KeypairType = 'ed25519' | 'sr25519' | 'ecdsa' | 'ethereum';

export type HexString = `0x${string}`;

export interface InjectedAccount {
  address: string;
  genesisHash?: string | null;
  name?: string;
  type?: KeypairType;
}
/**
 * Rpc request formats
 * */

export interface RequestAccountForget {
  addresses: string[];
}

export interface RequestAccountList {
  anyType?: boolean;
}

export interface RequestJsonRestore {
  file: PJSSingleAccountV3;
  password: string;
}

export interface RequestAccountCreateFromSeed {
  seed: string;
  name: string;
  password: string;
}

/**
 * Rpc message types and signatures
 * */

export type AccountProviderRpc = {
  'pri(ping)': {
    Request: null;
    Response: boolean;
  };
  'pri(accounts.forget)': { Request: RequestAccountForget; Response: void };
  'pri(accounts.list)': {
    Request: RequestAccountList;
    Response: InjectedAccount[];
  };
  'pri(account.create.seed)': {
    Request: RequestAccountCreateFromSeed;
    Response: void;
  };
  'pri(json.restore)': { Request: RequestJsonRestore; Response: void };
};

export type ProviderRequest<T extends ProviderMessageTypes> = {
  type: T;
  data: AccountProviderRpc[T]['Request'];
};

export type ProviderResponse<T extends ProviderMessageTypes> = {
  type: T;
  data: AccountProviderRpc[T]['Response'];
};

export type ProviderError = {
  type: 'error';
  data: Error;
};

export type ProviderMessageTypes = keyof AccountProviderRpc;
