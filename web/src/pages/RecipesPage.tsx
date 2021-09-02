import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiEndpoints } from "../utils/apiEndpoints";
import { Recipe } from "../models/Recipe";

export function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[] | undefined | null>([]);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setRecipes(() => undefined);
    setError(() => undefined);

    // fetch recipes
    axios
      .get(apiEndpoints.recipes)
      .then((response) => {
        setRecipes(() => response.data);
      })
      .catch((error) => {
        setRecipes(() => null);
        setError(() => error.message);
      });
  }, []);

  if (recipes === undefined)
    return <div className="message">Fetching recipes...</div>;
  if (recipes === null)
    return <div className="message">Failed to fetch recipes. ({error})</div>;

  return <div className="recipes-page">{renderRecipes(recipes)}</div>;
}

const renderRecipes = (recipes: Recipe[]) => {
  return (
    <div className="recipes">
      {recipes.map((recipe) => renderRecipe(recipe))}
    </div>
  );
};

const renderRecipe = (recipe: Recipe) => {
  return (
    <div
      className="recipe"
      key={recipe.uuid}
      onClick={() => (window.location.href = `/${recipe.uuid}`)}
    >
      <img
        className="image"
        src={`${apiEndpoints.url}/${recipe.images.small}`}
        alt="recipe"
      />
      <div className="title">{recipe.title}</div>
      <div className="description">{recipe.description}</div>
      <div className="pills">
        <div className="pill serving">Servings: {recipe.servings}</div>
        <div className="pill prep-time">Prep time: {recipe.prepTime} mins</div>
        <div className="pill cook-time">Cook time: {recipe.cookTime} mins</div>
      </div>
    </div>
  );
};
