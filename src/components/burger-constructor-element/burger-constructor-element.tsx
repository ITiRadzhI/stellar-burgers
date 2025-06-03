import { FC, memo } from 'react';
import { useDispatch } from '../../services/store';

import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

import {
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient
} from '../../services/slices/burgerConstructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const onMoveDown = () => dispatch(moveIngredientDown(index));
    const onMoveUp = () => dispatch(moveIngredientUp(index));
    const onRemove = () => dispatch(removeIngredient(ingredient));

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={onMoveUp}
        handleMoveDown={onMoveDown}
        handleClose={onRemove}
      />
    );
  }
);
