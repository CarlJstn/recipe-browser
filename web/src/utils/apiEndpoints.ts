const url = "http://localhost:3001";
const recipes = `${url}/recipes`;
const recipe = (id: string) => `${recipes}/${id}`;
const specials = `${url}/specials`;
const special = (id: string) => `${specials}/${id}`;

export const apiEndpoints = {
  url,
  recipes,
  recipe,
  specials,
  special,
};
