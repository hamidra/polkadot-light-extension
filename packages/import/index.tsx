import PolkadotJSExtension from "./PolkadotJSExtension";

export interface ImportFormProps {
  onSuccess?: () => void;
}
const Page = ({ onSuccess }: ImportFormProps) => {
  return (
    <div className={"h-auto w-full"}>
      <PolkadotJSExtension onSuccess={onSuccess} />
    </div>
  );
};

export default Page;
