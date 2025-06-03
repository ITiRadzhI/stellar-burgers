import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient, ingredientStateInterface } from '@utils-types';

export const loadIngredients = createAsyncThunk(
  'ingredients/loadIngredients',
  getIngredientsApi
);

export const initialState: ingredientStateInterface = {
  buns: [],
  sauces: [],
  mains: [],
  ingredients: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.ingredients = action.payload;
        state.buns = action.payload.filter((item) => item.type === 'bun');
        state.sauces = action.payload.filter((item) => item.type === 'sauce');
        state.mains = action.payload.filter((item) => item.type === 'main');
      })
      .addCase(loadIngredients.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

// Селекторы определяются отдельно

import { RootState } from '../store';

export const selectIngredientState = (state: RootState) => state.ingredients;

export const getingredients = (state: RootState) => state.ingredients.ingredients;

export const selectIngredientById = (state: RootState, id: string): TIngredient | undefined =>
  state.ingredients.ingredients.find((ingredient) => ingredient._id === id);

export default ingredientsSlice.reducer;
