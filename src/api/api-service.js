import { RECIPES_ROUTE } from './api-routes';
import { httpCommon } from './http-client';

const getRecipes = () => httpCommon.get(RECIPES_ROUTE);

export const apiService = {
  getRecipes,
};
