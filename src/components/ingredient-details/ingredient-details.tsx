import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';

import { ingredientsSlice } from '../../services/slices/ingredients';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';

export const IngredientDetails: FC = () => {
  const { id: ingredientId } = useParams<{ id: string }>();

  const ingredientData = useSelector(state =>
    ingredientsSlice.selectors.selectIngredientById(state, ingredientId)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
