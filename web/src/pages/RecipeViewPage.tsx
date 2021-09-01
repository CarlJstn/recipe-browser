import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiEndpoints } from "../utils/apiEndpoints";
import { Recipe } from "../models/Recipe";
import { Ingredient } from "../models/Ingredient";
import { RecipeIngredientWidget } from "../widgets/RecipeIngredientWidget";
import { Special } from "../models/Special";

export function RecipeViewPage() {
  const [recipe, setRecipe] = useState<Recipe | undefined | null>();
  const [specials, setSpecials] = useState<Special[] | undefined | null>();
  const [recipeFetchError, setRecipeFetchError] = useState<
    string | undefined
  >();
  const [specialsFetchError, setSpecialFetchError] = useState<
    string | undefined
  >();
  const recipeId = window.location.pathname.substr(1);

  useEffect(() => {
    setRecipe(() => undefined);
    setSpecials(() => undefined);
    setRecipeFetchError(() => undefined);
    setSpecialFetchError(() => undefined);

    // fetch recipe
    axios
      .get(apiEndpoints.recipe(recipeId))
      .then((response) => {
        setRecipe(() => response.data);
      })
      .catch((error) => {
        setRecipe(() => null);
        setRecipeFetchError(() => error.message);
      });

    // fetch specials
    axios
      .get(apiEndpoints.specials)
      .then((response) => {
        setSpecials(() => response.data);
      })
      .catch((error) => {
        setSpecials(() => null);
        setSpecialFetchError(() => error.message);
      });
  }, []);

  if (recipe === undefined) return <div>Fetching recipe...</div>;
  if (recipe === null)
    return <div>Failed to fetch recipe. ({recipeFetchError})</div>;

  return (
    <div className="recipe-view-page">
      <div className="wrapper">
        {renderHeader(recipe)}
        {renderIngredients({
          ingredients: recipe.ingredients,
          specials,
          specialsFetchError,
        })}
        {renderDates(recipe)}
      </div>
    </div>
  );
}

const renderHeader = (recipe: Recipe) => {
  return (
    <div className="basic-info">
      <div className="back-button" onClick={() => (window.location.href = "/")}>
        ￩
      </div>
      <div className="title">{recipe.title}</div>
      <img
        className="image"
        src={`${apiEndpoints.url}/${recipe.images.medium}`}
        alt="recipe"
      />
      <div className="description">{recipe.description}</div>
      <div className="pills">
        <div className="pill serving">Servings: {recipe.servings}</div>
        <div className="pill prep-time">Prep time: {recipe.prepTime} mins</div>
        <div className="pill cook-time">Cook time: {recipe.cookTime} mins</div>
      </div>
    </div>
  );
};

const renderIngredients = (args: {
  ingredients: Ingredient[];
  specials: Special[] | undefined | null;
  specialsFetchError?: string;
}) => {
  const { ingredients, specials, specialsFetchError } = args;

  if (specials === undefined) return <div>Fetching specials...</div>;
  if (specials === null)
    return <div>Failed to fetch specials. ({specialsFetchError})</div>;

  return (
    <div className="ingredients">
      <div className="title">Ingredients:</div>
      <div className="wrapper">
        {ingredients.map((ingredient) => {
          const special = specials.filter(
            (special) => special.ingredientId === ingredient.uuid
          )[0];
          return RecipeIngredientWidget({ ingredient, special });
        })}
      </div>
    </div>
  );
};

const renderDates = (recipe: Recipe) => {
  return (
    <div className="dates">
      <div className="date added">Date Added: {recipe.editDate}</div>
      <div className="date edited">Date Edited: {recipe.editDate}</div>
    </div>
  );
};
