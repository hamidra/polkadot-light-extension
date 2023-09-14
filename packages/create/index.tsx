import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createAccount, generateMnemonic } from 'storage';
import {
  Button,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from 'ui';
import { z } from 'zod';

export interface CreateFormProps {
  onSuccess?: () => void;
}

const formSchema = z
  .object({
    password: z.string().min(8),
    passwordConfirmation: z.string(),
  })
  .refine(({ password, passwordConfirmation }) => password == passwordConfirmation, {
    message: "Password confirmation doesn't match",
  });

type FormData = z.infer<typeof formSchema>;

const Card = ({ onSuccess }: CreateFormProps) => {
  const [error, setError] = useState<string>();
  const [mnemonic, setMnemonic] = useState<string>();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => setMnemonic(generateMnemonic(12)), []);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    createAccount(mnemonic!, data.password)
      .then(() => {
        if (onSuccess) onSuccess();
      })
      .catch((e) => {
        console.error(e);
        setError('Failed to create a new wallet');
      });
  };

  return (
    <div className={'h-auto w-full'}>
      <CardHeader>
        <CardTitle>Create a new Wallet</CardTitle>
      </CardHeader>

      <CardContent className='grid gap-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
            <FormItem>
              <FormLabel>Mnemonic</FormLabel>
              <div>{mnemonic}</div>
            </FormItem>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input autoFocus type='password' {...field} {...form.register('password', { required: true })} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='passwordConfirmation'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Confirmation</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      {...field}
                      {...form.register('passwordConfirmation', {
                        required: true,
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <div>{error}</div>}
            <Button disabled={!form.formState.isValid} type='submit'>
              <Plus className='mr-2 h-4 w-4' />
              Create
            </Button>
          </form>
        </Form>
      </CardContent>
    </div>
  );
};

export default Card;
