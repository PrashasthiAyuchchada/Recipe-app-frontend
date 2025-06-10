import React, { useEffect, useState } from 'react';

const RecipeModal = ({ recipe, onClose }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (recipe) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.id}`)
        .then(res => res.json())
        .then(data => setDetails(data.meals[0]));
    }
  }, [recipe]);

  if (!recipe || !details) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">✕</button>
        <img src={details.strMealThumb} alt={details.strMeal} className="w-full h-60 object-cover rounded mb-4" />
        <h2 className="text-xl font-bold mb-2">{details.strMeal}</h2>
        <p className="text-sm text-gray-600 mb-2">{details.strCategory} - {details.strArea}</p>
        <p className="text-gray-700 text-sm">{details.strInstructions.slice(0, 300)}...</p>
      </div>
    </div>
  );
};

export default RecipeModal;
