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
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon${search.toLowerCase()}`);
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
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 sm:p-8 font-[family-name:var(--font-geist-sans)] bg-black-100">
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
      
      
      <main className="w-full max-w-md">
        <form onSubmit={searchPokemon} className="mb-6">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter Pokémon name or ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-white rounded-full"></div>
              ) : (
                <span className="h-5 w-5">🔍</span>
              )}
            </button>
          </div>
        </form>
        
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        
        {pokemon && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-2 capitalize">{pokemon.name}</h2>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="mx-auto mb-4 w-32 h-32"
              />
              <p className="text-center text-gray-600">
                Types: {pokemon.types.map(t => (
                  <span key={t.type.name} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 capitalize">
                    {t.type.name}
                  </span>
                ))}
              </p>
            </div>
          </div>
        )}
      </main>
      
      <footer className="text-center text-gray-500 text-sm mt-8">
        Created by Rajasree Baruri
      </footer>
    </div>
  );
}
