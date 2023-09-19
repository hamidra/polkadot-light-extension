import { Import, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as storage from 'storage';
import type { PJSSingleAccountV3 } from 'storage/formats/PJSSingleAccount';
import { Button, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'ui';

const Page = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<PJSSingleAccountV3[]>([]);

  useEffect(() => {
    // @ts-expect-error: should be fixed with https://github.com/paritytech/polkadot-lite-extension/pull/39
    storage.getAccounts().then(setAccounts);
  }, [setAccounts]);
  useEffect(() => {
    if (accounts.length > 0) {
      navigate('accounts');
    }
  }, [accounts, navigate]);

  return (
    <div className={'h-auto w-full'}>
      <CardHeader>
        <CardTitle>Polkadot Lite</CardTitle>
        <CardDescription>A light client first wallet</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <Button onClick={() => navigate('create')} className='w-full'>
          <Plus className='mr-2 h-4 w-4' /> Create new Wallet
        </Button>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background text-muted-foreground px-2'>Or continue with</span>
          </div>
        </div>
        <Button onClick={() => navigate('import')} className='w-full'>
          <Import className='mr-2 h-4 w-4' /> Import existing Wallet
        </Button>
      </CardContent>
      <CardFooter>
        <p className='text-muted-foreground px-8 text-center text-sm'>
          By clicking continue, you agree to our{' '}
          <a
            target='_blank'
            href='https://www.parity.io/terms/'
            className='hover:text-primary underline underline-offset-4'
          >
            Terms of Use
          </a>{' '}
          and{' '}
          <a
            target='_blank'
            href='https://www.parity.io/privacy/'
            className='hover:text-primary underline underline-offset-4'
          >
            Privacy Policy
          </a>
          .
        </p>
      </CardFooter>
    </div>
  );
};

export default Page;
