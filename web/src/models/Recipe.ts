import { Direction } from "./Direction";
import { Ingredient } from "./Ingredient";

export type Recipe = {
  uuid: string;
  title: string;
  description: string;
  images: {
    full: string;
    medium: string;
    small: string;
  };
  servings: number;
  prepTime: number;
  cookTime: number;
  postDate: string;
  editDate: string;
  ingredients: Ingredient[];
  directions: Direction[];
};
