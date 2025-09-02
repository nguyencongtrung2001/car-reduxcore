import { useLocalStorage } from './useLocalStorage';

export const useFavorites = () => {
  const [favorites, setFavorites, removeFavorites] = useLocalStorage('fashionCubeFavorites', []);

  const addToFavorites = (product) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(item => item.id === product.id);
      if (isAlreadyFavorite) {
        return prev;
      }
      return [...prev, { ...product, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites(prev => prev.filter(item => item.id !== productId));
  };

  const toggleFavorite = (product) => {
    const isAlreadyFavorite = favorites.some(item => item.id === product.id);
    if (isAlreadyFavorite) {
      removeFromFavorites(product.id);
      return false;
    } else {
      addToFavorites(product);
      return true;
    }
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  const clearFavorites = () => {
    removeFavorites();
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length
  };
};