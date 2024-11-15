import { CreateWatchlistInput, WatchlistItem } from '@/types/watchlist';
import { useEffect, useState } from 'react';

export const WATCHLISTS_STORAGE_KEY = 'cryptolite-watchlists';

export function useWatchlists() {
  // Initialize state from localStorage
  const [watchlists, setWatchlists] = useState<WatchlistItem[]>(() => {
    if (typeof window === 'undefined') return [];
    
    try {
      const saved = localStorage.getItem(WATCHLISTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading watchlists:', error);
      return [];
    }
  });

  // Save to localStorage whenever watchlists change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(WATCHLISTS_STORAGE_KEY, JSON.stringify(watchlists));
    } catch (error) {
      console.error('Error saving watchlists:', error);
    }
  }, [watchlists]);

  const createWatchlist = (input: CreateWatchlistInput) => {
    if (!input.name?.trim()) {
      throw new Error('Watchlist name is required');
    }
    if (!input.symbols || input.symbols.length === 0) {
      throw new Error('At least one symbol is required');
    }

    const newWatchlist: WatchlistItem = {
      id: crypto.randomUUID(),
      name: input.name.trim(),
      symbols: input.symbols,
    };

    setWatchlists(prev => [...prev, newWatchlist]);
    return newWatchlist;
  };

  const updateWatchlist = (updatedWatchlist: WatchlistItem) => {
    if (!updatedWatchlist.name?.trim()) {
      throw new Error('Watchlist name is required');
    }
    if (!updatedWatchlist.symbols || updatedWatchlist.symbols.length === 0) {
      throw new Error('At least one symbol is required');
    }

    setWatchlists(prev => 
      prev.map(watchlist =>
        watchlist.id === updatedWatchlist.id ? updatedWatchlist : watchlist
      )
    );
  };

  const deleteWatchlist = (id: string) => {
    setWatchlists(prev => prev.filter(watchlist => watchlist.id !== id));
  };

  return {
    watchlists,
    createWatchlist,
    updateWatchlist,
    deleteWatchlist,
  };
} 