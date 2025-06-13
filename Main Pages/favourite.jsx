import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeModal from '../Components/recipeModel';
import RecipeCard from '../Components/Recipecard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [modalRecipe, setModalRecipe] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/recipes/favorites", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorites(res.data);
      } catch (err) {
        console.error('Failed to load favorites:', err);
      }
    };
    if (token) fetchFavorites();
  }, [token]);

  const handleRemove = async (id) => {
    try {
      await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/recipes/favorites/${id}", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(favorites.filter(f => f.id !== id));
    } catch (err) {
      console.error('Failed to remove favorite:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Favorite Recipes</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {favorites.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={true}
            onFavoriteToggle={() => handleRemove(recipe.id)}
            onOpen={() => setModalRecipe(recipe)}
          />
        ))}
      </div>
      <RecipeModal recipe={modalRecipe} onClose={() => setModalRecipe(null)} />
    </div>
  );
};

export default Favorites;
