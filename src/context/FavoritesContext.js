import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext(null);
const STORAGE_KEY = '@tastebook_favorites';

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setFavoriteIds(JSON.parse(stored));
      } catch (e) {
        console.warn('Failed to load favorites', e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const persist = useCallback(async (next) => {
    setFavoriteIds(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.warn('Failed to save favorites', e);
    }
  }, []);

  const toggleFavorite = useCallback(
    (id) => {
      const next = favoriteIds.includes(id)
        ? favoriteIds.filter((f) => f !== id)
        : [...favoriteIds, id];
      persist(next);
    },
    [favoriteIds, persist]
  );

  const isFavorite = useCallback((id) => favoriteIds.includes(id), [favoriteIds]);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite, loaded }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
