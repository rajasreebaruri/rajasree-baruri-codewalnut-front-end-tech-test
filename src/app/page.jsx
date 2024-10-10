"use client";

import { useState } from 'react';
import Image from "next/image";

export default function Home() {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchPokemon = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setLoading(true);
    setError('');
    setPokemon(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError('Pokémon not found. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 sm:p-8 font-[family-name:var(--font-geist-sans)] bg-gray-100">
      <header className="w-full max-w-md text-center">
        <Image
          src="/images/codewalnut-logo.svg"
          alt="CodeWalnut logo"
          width={180}
          height={38}
          priority
          className="mx-auto mb-4"
        />
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Pokémon Search</h1>
      </header>
      
    </div>
  );
}
