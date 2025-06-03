import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  // TODO: заменить заглушку на получение из стора
  const burgerConstructor = {
    bun: { _id: '' },
    ingredients: [] as TIngredient[]
  };

  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};

    burgerConstructor.ingredients.forEach(({ _id }) => {
      counters[_id] = (counters[_id] ?? 0) + 1;
    });

    if (burgerConstructor.bun && burgerConstructor.bun._id) {
      counters[burgerConstructor.bun._id] = 2;
    }

    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
