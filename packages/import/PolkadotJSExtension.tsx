import { zodResolver } from '@hookform/resolvers/zod';
import { Import } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { importAccount } from 'storage';
import { PJSSingleAccountV3Schema } from 'storage/formats';
import {
  Button,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
} from 'ui';
import { z } from 'zod';

import { ImportFormProps } from '.';

const formSchema = z.object({
  file: z.any(),
  password: z.string(),
});

type FormData = z.infer<typeof formSchema>;

const PolkadotJSExtension = ({ onSuccess }: ImportFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });

  const watchFile: FileList = form.watch('file', []);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    data.file[0]
      .text()
      .then(JSON.parse)
      .then((exportedAccount: string) => {
        const validAccountData = PJSSingleAccountV3Schema.parse(exportedAccount);
        importAccount(validAccountData, data.password)
          .then(() => {
            if (onSuccess) onSuccess();
          })
          .catch((e) => {
            console.error(e);
            form.setError(
              'password',
              {
                type: 'manual',
                message: 'Invalid password',
              },
              { shouldFocus: true },
            );
          });
      });
  };

  return (
    <div className={'h-auto w-full'}>
      <CardHeader>
        <CardTitle>Import Wallet External</CardTitle>
        <CardDescription>from Polkadot JS Extension export</CardDescription>
      </CardHeader>

      <CardContent className='grid gap-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
            <div className='w-full max-w-sm items-center space-y-2'>
              <Label htmlFor='file'>Private Key File</Label>
              <Input id='file' type='file' accept='.json' {...form.register('file', { required: true })} />
            </div>

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!form.formState.isValid || watchFile.length === 0} type='submit'>
              <Import className='mr-2 h-4 w-4' />
              Import
            </Button>
          </form>
        </Form>
      </CardContent>
    </div>
  );
};

export default PolkadotJSExtension;
