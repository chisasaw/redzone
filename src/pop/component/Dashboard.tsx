
// src/popup/components/Dashboard.tsx 
//Shows the dashboard
import React from 'react';
import { ethers } from 'ethers';

interface Props {
  balance: string;
  account: string;
  onNavigate: (view: 'buy' | 'sell' | 'receive') => void;
  provider: ethers.BrowserProvider | null;
}

export const Dashboard: React.FC<Props> = ({
  balance,
  account,
  onNavigate,
  provider
}) => {
  return (
    <div className="p-4">
      <div className="bg-blue-500 text-white p-6 rounded-lg mb-6">
        <h2>Balance</h2>
        <p className="text-2xl font-bold">{balance} ETH</p>
        <p className="text-sm truncate">{account}</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => onNavigate('buy')}
          className="bg-green-500 text-white p-3 rounded-lg"
        >
          Buy
        </button>
        <button
          onClick={() => onNavigate('sell')}
          className="bg-red-500 text-white p-3 rounded-lg"
        >
          Sell
        </button>
        <button
          onClick={() => onNavigate('receive')}
          className="bg-purple-500 text-white p-3 rounded-lg"
        >
          Receive
        </button>
      </div>
    </div>
  );
};