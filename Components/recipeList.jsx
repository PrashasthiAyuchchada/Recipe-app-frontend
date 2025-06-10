import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, favorites, onFavoriteToggle, onOpen }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={favorites.includes(recipe.id)}
          onFavoriteToggle={() => onFavoriteToggle(recipe.id)}
          onOpen={() => onOpen(recipe)}
        />
      ))}
    </div>
  );
};

export default RecipeList;