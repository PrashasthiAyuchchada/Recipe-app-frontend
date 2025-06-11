import React, { useEffect, useState } from 'react';
import RecipeList from '../Components/RecipeList';
import CategorySelector from '../Components/categorySelecter';
import RecipeModal from '../Components/recipeModel';
import axios from 'axios';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Chicken');
  const [favorites, setFavorites] = useState([]);
  const [modalRecipe, setModalRecipe] = useState(null);

  const token = localStorage.getItem('token');

  // Fetch all recipes for a category
  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
      const data = await res.json();
      const formatted = data.meals.map(m => ({
        id: m.idMeal,
        name: m.strMeal,
        image: m.strMealThumb,
        category: selectedCategory
      }));
      setRecipes(formatted);
    };
    fetchRecipes();
  }, [selectedCategory]);

  // Fetch favorites from backend
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/recipes/favorites", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorites(res.data.map(f => f.id));
      } catch (err) {
        console.error('Failed to fetch favorites', err);
      }
    };
    if (token) fetchFavorites();
  }, [token]);

  // Handle add/remove favorite
  const handleFavoriteToggle = async (recipe) => {
    const isFav = favorites.includes(recipe.id);

    try {
      if (isFav) {
        await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/recipes/favorites/${recipe.id}", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorites(favorites.filter(f => f !== recipe.id));
      } else {
        await axios.post(
          import.meta.env.VITE_BACKEND_URL+"/api/recipes/favorites",
          {
            idMeal: recipe.id,
            strMeal: recipe.name,
            strMealThumb: recipe.image,
            strCategory: recipe.category
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFavorites([...favorites, recipe.id]);
      }
    } catch (err) {
      console.error('Favorite toggle failed:', err.response?.data || err);
    }
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
        onFavoriteToggle={(id) => {
          const recipe = recipes.find(r => r.id === id);
          handleFavoriteToggle(recipe);
        }}
        onOpen={setModalRecipe}
      />
      <RecipeModal recipe={modalRecipe} onClose={() => setModalRecipe(null)} />
    </div>
  );
};

export default Home;
