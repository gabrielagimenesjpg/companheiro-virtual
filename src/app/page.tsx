import { useState } from 'react';
import Chat from '../components/Chat';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 to-red-500 p-6 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">Meu Companheiro Virtual</h1>
          <p className="text-pink-100">Seu confidente romântico e sensual</p>
        </div>
        <Chat />
      </div>
    </div>
  );
}