import { http, createConfig } from '@wagmi/core'
import { bscTestnet } from '@wagmi/core/chains'
import { injected } from '@wagmi/connectors'

export const config = createConfig({
  chains: [bscTestnet],
  connectors: [injected()],
  transports: {
    [bscTestnet.id]: http(),
  },
  ssr: true, 
})
