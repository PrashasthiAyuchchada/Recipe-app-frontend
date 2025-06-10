import React, { useState } from 'react';

import RecipeModal from '../Components/recipeModel';
import RecipeCard from '../components/RecipeCard';


const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [modalRecipe, setModalRecipe] = useState(null);

  const handleRemove = (id) => {
    setFavorites(prev => prev.filter(f => f !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Favorite Recipes</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {favorites.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={true}
            onFavoriteToggle={handleRemove}
            onOpen={setModalRecipe}
          />
        ))}
      </div>
      <RecipeModal recipe={modalRecipe} onClose={() => setModalRecipe(null)} />
    </div>
  );
};

export default Favorites;