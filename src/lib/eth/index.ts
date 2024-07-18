import { JsonRpcProvider } from "ethers";

const shouldGetRpcEnv = () => {
  const env = process.env.NEXT_PUBLIC_RPC_URL
  if (!env) {
    throw new Error("Require NEXT_PUBLIC_RPC_URL")
  }
  return env
}

export const rpcProvider = new JsonRpcProvider(shouldGetRpcEnv())