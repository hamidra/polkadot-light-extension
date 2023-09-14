import { Import, Plus, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as storage from 'storage';
import type { PJSSingleAccountV3 } from 'storage/formats/PJSSingleAccount';
import { Button, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'ui';

const Page = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<PJSSingleAccountV3[]>([]);

  const fetchAccounts = useCallback(() => {
    storage.getAccounts().then((accounts) => {
      if (accounts.length === 0) navigate('/');
      setAccounts(accounts);
    });
  }, [navigate]);

  const removeAccount = (address: string) => {
    storage.forgetAccount(address).then(fetchAccounts);
  };

  const removeAllAccounts = () => {
    Promise.all(accounts.map((account) => storage.forgetAccount(account.address))).then(() => navigate('/'));
  };
  useEffect(fetchAccounts, [fetchAccounts]);

  return (
    <div className={'h-auto w-full'}>
      <CardHeader>
        <CardTitle>Accounts</CardTitle>
        <CardDescription>Available accounts</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        {accounts.map((account) => (
          <div
            className=' flex items-center space-x-4 rounded-md border p-4'
            onClick={() => storage.forgetAccount(account.address)}
          >
            <div className='flex-1 space-y-1'>
              <p className='text-sm font-medium leading-none'>{account.meta.name}</p>
              <p className='text-muted-foreground overflow-hidden text-ellipsis text-sm'>
                {account.address.slice(0, 8)}...{account.address.slice(-8)}
              </p>
            </div>
            <Button onClick={() => removeAccount(account.address)} variant='outline' size='icon'>
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        ))}
        <div className='grid w-full grid-cols-2 gap-6'>
          <Button onClick={() => navigate('/create')} className='w-full' variant='outline'>
            <Plus className='mr-2 h-4 w-4' /> New Account
          </Button>

          <Button onClick={() => navigate('/import')} variant='outline' className='w-full'>
            <Import className='mr-2 h-4 w-4' /> Import
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full' onClick={removeAllAccounts}>
          <Trash2 className='mr-2 h-4 w-4' /> Remove All Accounts
        </Button>
      </CardFooter>
    </div>
  );
};

export default Page;
