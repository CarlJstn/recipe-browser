import React from "react";
import { Ingredient } from "../models/Ingredient";
import { Special } from "../models/Special";

type Props = {
  ingredient: Ingredient;
  special?: Special;
};

export function RecipeIngredientWidget(props: Props) {
  const { ingredient, special } = props;

  return (
    <div className="recipe-ingredient-widget" key={ingredient.uuid}>
      <div className="text">
        <div className="check">✔</div>
        <div className="content">
          {ingredient.amount} {ingredient.measurement} of {ingredient.name}
        </div>
      </div>
      {renderSpecial(special)}
    </div>
  );
}

const renderSpecial = (special?: Special) => {
  if (!special) return;

  return (
    <div className="special">
      <div className="title">
        <span className="type">{special.type}</span>
        {special.title}
      </div>
      {special.text ? <div className="text">{special.text}</div> : null}
    </div>
  );
};
