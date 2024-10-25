// src/popup/App.tsx
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Dashboard, Buy, Sell, Receive } from './components';
import { ETHWallet__factory } from '../types/contracts';
import contractAddresses from '../../contracts/addresses.json';

const App: React.FC = () => {
  const [account, setAccount] = useState<string>('');
  const [view, setView] = useState<'dashboard' | 'buy' | 'sell' | 'receive'>('dashboard');
  const [balance, setBalance] = useState<string>('0');
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  useEffect(() => {
    initWallet();
  }, []);

  const initWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      setProvider(provider);
      await updateBalance(accounts[0], provider);
    }
  };

  const updateBalance = async (address: string, provider: ethers.BrowserProvider) => {
    const contract = ETHWallet__factory.connect(
      contractAddresses.ETHWallet,
      provider
    );
    const balance = await contract.getBalance();
    setBalance(ethers.formatEther(balance));
  };

  return (
    <div className="w-96 h-144 bg-white">
      {view === 'dashboard' && (
        <Dashboard
          balance={balance}
          onNavigate={setView}
          account={account}
          provider={provider}
        />
      )}
      {view === 'buy' && (
        <Buy onBack={() => setView('dashboard')} provider={provider} />
      )}
      {view === 'sell' && (
        <Sell onBack={() => setView('dashboard')} provider={provider} />
      )}
      {view === 'receive' && (
        <Receive onBack={() => setView('dashboard')} account={account} />
      )}
    </div>
  );
};

export default App;