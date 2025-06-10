import React, { useEffect, useState } from 'react';

import RecipeList from '../components/RecipeList';
import CategorySelector from '../Components/categorySelecter';
import RecipeModal from '../Components/recipeModel';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Chicken');
  const [favorites, setFavorites] = useState([]);
  const [modalRecipe, setModalRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
      const data = await res.json();
      const formatted = data.meals.map(m => ({ id: m.idMeal, name: m.strMeal, image: m.strMealThumb, category: selectedCategory }));
      setRecipes(formatted);
    };
    fetchRecipes();
  }, [selectedCategory]);

  const handleFavoriteToggle = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="p-4">
      <CategorySelector
        categories={["Pork", "Beef", "Chicken", "Lamb", "Pasta"]}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <RecipeList
        recipes={recipes}
        favorites={favorites}
        onFavoriteToggle={handleFavoriteToggle}
        onOpen={setModalRecipe}
      />
      <RecipeModal recipe={modalRecipe} onClose={() => setModalRecipe(null)} />
    </div>
  );
};

export default Home;