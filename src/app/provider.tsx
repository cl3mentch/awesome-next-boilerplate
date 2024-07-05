import { config } from "@/lib/web3/walletconnect/config";
import ContextProvider from "@/lib/web3/walletconnect/context";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";

interface Props {
  components: Array<
    [
      React.JSXElementConstructor<React.PropsWithChildren<any>>,
      Record<string, any>?
    ]
  >;
  children: React.ReactNode;
}

const Compose = (props: Props) => {
  const { components = [], children } = props;

  return (
    <>
      {components.reduceRight((acc, [Comp, compProps = {}]) => {
        return <Comp {...compProps}>{acc}</Comp>;
      }, children)}
    </>
  );
};

// Combine all your providers here
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <Compose components={[[ContextProvider, { initialState: initialState }]]}>
      {children}
    </Compose>
  );
};

export default AllProviders;
