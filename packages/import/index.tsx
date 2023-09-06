import { zodResolver } from "@hookform/resolvers/zod";
import { Import } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { importAccount } from "storage";
import { PJSSingleAccountV3Schema } from "storage/formats";
import {
  Button,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "ui";
import { z } from "zod";
const formSchema = z.object({
  file: z.instanceof(FileList),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  onSuccess?: () => void;
}

const Page = ({ onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    data.file[0]
      .text()
      .then(JSON.parse)
      .then((exportedAccount) => {
        const validAccountData =
          PJSSingleAccountV3Schema.parse(exportedAccount);
        importAccount(validAccountData).then(() => {
          if (onSuccess) onSuccess();
        });
      });
  };

  return (
    <div className={"h-auto w-full"}>
      <CardHeader>
        <CardTitle>Import Wallet External</CardTitle>
        <CardDescription>from Polkadot JS Extension export</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="file">Private Key File</Label>
            <Input
              id="file"
              type="file"
              accept=".json"
              {...register("file", { required: true })}
            />
          </div>
          <Button disabled={!isValid} type="submit">
            <Import className="mr-2 h-4 w-4" />
            Import
          </Button>
        </CardContent>
      </form>
    </div>
  );
};

export default Page;
