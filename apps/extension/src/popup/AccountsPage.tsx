import type { PJSSingleAccountV3 } from "storage/formats/PJSSingleAccount";
import { ChevronRight, Trash2 } from "lucide-react";
import * as storage from "storage";
import {
  Button,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "ui";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Page = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<PJSSingleAccountV3[]>([]);

  useEffect(() => {
    storage.getAccounts().then(setAccounts);
  }, [setAccounts]);

  const removeAllAccounts = () => {
    storage.clearStorage().then(() => navigate("/"));
  };

  return (
    <div className={"h-auto w-full"}>
      <CardHeader>
        <CardTitle>Accounts</CardTitle>
        <CardDescription>Available accounts</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {accounts.map((account) => (
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {account.meta.name}
              </p>
              <p className="text-muted-foreground overflow-hidden text-ellipsis text-sm">
                {account.address.slice(0, 8)}...{account.address.slice(-8)}
              </p>
            </div>
            <ChevronRight />
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={removeAllAccounts}>
          <Trash2 className="mr-2 h-4 w-4" /> Remove All Accounts
        </Button>
      </CardFooter>
    </div>
  );
};

export default Page;
