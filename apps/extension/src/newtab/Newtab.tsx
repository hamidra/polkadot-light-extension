import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Switch,
  cn,
} from "ui";
import { BellRing, Check } from "lucide-react";
const Newtab = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className={cn("h-auto w-[380px]")}>
        <CardHeader>
          <CardTitle>Polkadot Lite Extension</CardTitle>
          <CardDescription>This is the description</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <BellRing />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Push Notifications
              </p>
              <p className="text-muted-foreground text-sm">
                Send notifications to device.
              </p>
            </div>
            <Switch />
          </div>

          <div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">It works!</p>
                <p className="text-muted-foreground text-sm">
                  Monorepo with Turbo, Tailwind and shadcn/ui
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Check className="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Newtab;
