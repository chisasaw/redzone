// src/popup/components/Buy.tsx
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { ETHWallet__factory } from '../../types/contracts';
import contractAddresses from '../../../contracts/addresses.json';

interface Props {
  onBack: () => void;
  provider: ethers.BrowserProvider | null;
}

export const Buy: React.FC<Props> = ({ onBack, provider }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    if (!provider || !amount) return;
    
    try {
      setLoading(true);
      const signer = await provider.getSigner();
      const contract = ETHWallet__factory.connect(
        contractAddresses.ETHWallet,
        signer
      );
      
      const tx = await contract.trade(true, ethers.parseEther(amount), {
        value: ethers.parseEther(amount)
      });
      await tx.wait();
      onBack();
    } catch (error) {
      console.error('Buy failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <button onClick={onBack}>←</button>
        <h2 className="text-xl font-bold ml-4">Buy ETH</h2>
      </div>
      
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in ETH"
        className="w-full p-2 border rounded mb-4"
      />
      
      <button
        onClick={handleBuy}
        disabled={loading}
        className="w-full bg-green-500 text-white p-3 rounded-lg"
      >
        {loading ? 'Processing...' : 'Buy ETH'}
      </button>
    </div>
  );
}; 
