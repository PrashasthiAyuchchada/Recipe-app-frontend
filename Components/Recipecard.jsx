import React from 'react';
import { Heart } from 'lucide-react';

const RecipeCard = ({ recipe, isFavorite, onFavoriteToggle, onOpen }) => {
  return (
    <div className="cursor-pointer" onClick={onOpen}>
      <div className="bg-gray-200 h-40 w-full rounded mb-2" style={{ backgroundImage: `url(${recipe.image})`, backgroundSize: 'cover' }} />
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">{recipe.category}</span>
        <button onClick={(e) => { e.stopPropagation(); onFavoriteToggle(); }}>
          <Heart size={16} className={isFavorite ? 'text-pink-500 fill-pink-500' : 'text-gray-400'} />
        </button>
      </div>
      <h4 className="font-bold text-sm mt-1">{recipe.name}</h4>
    </div>
  );
};

export default RecipeCard;
