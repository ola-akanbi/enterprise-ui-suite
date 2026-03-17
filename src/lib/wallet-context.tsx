import React, { createContext, useContext, useState, useCallback } from 'react';

interface WalletContextType {
  connected: boolean;
  address: string | null;
  network: 'testnet' | 'mainnet';
  connect: () => void;
  disconnect: () => void;
  setNetwork: (n: 'testnet' | 'mainnet') => void;
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  address: null,
  network: 'testnet',
  connect: () => {},
  disconnect: () => {},
  setNetwork: () => {},
});

const MOCK_ADDRESS = 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7';

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [network, setNetwork] = useState<'testnet' | 'mainnet'>('testnet');

  const connect = useCallback(() => setConnected(true), []);
  const disconnect = useCallback(() => setConnected(false), []);

  return (
    <WalletContext.Provider
      value={{
        connected,
        address: connected ? MOCK_ADDRESS : null,
        network,
        connect,
        disconnect,
        setNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
