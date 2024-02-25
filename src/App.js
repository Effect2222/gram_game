// src/App.js
import React, { useState, useEffect } from 'react';
import { TonConnectUIProvider, TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
  };

  return (
    <TonConnectUIProvider manifestUrl="http://localhost:3001/tonconnect-manifest.json">
      <div className="App">
        <header className="bg-gray-800 p-4 flex justify-between items-center">
          <div className="text-white">
            <WalletConnectButton setIsLoggedIn={setIsLoggedIn} />
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-white">Главная</a>
            <a href="#" className="text-white">Телеграм</a>
            <a href="#" className="text-white">Github</a>
          </div>
        </header>
        <main className="flex flex-col items-center justify-center h-screen">
          {isLoggedIn ? (
            <ConnectedUserInfo />
          ) : (
            <>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>
                Нажми меня
              </button>
              <p className="mt-4">Количество нажатий: {clickCount}</p>
            </>
          )}
        </main>
      </div>
    </TonConnectUIProvider>
  );
}

const WalletConnectButton = ({ setIsLoggedIn }) => {
  const [tonConnectUI] = useTonConnectUI();

  const handleConnect = async () => {
    try {
      await tonConnectUI.connectWallet();
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  return <TonConnectButton onClick={handleConnect} />;
};

const ConnectedUserInfo = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  const handleDisconnect = async () => {
    await tonConnectUI.disconnect();
  };

  return (
    <div>
      <p>Connected wallet: {wallet.name}</p>
      <p>Device: {wallet.device.appName}</p>
      <button onClick={handleDisconnect}>Disconnect</button>
    </div>
  );
};


export default App;
