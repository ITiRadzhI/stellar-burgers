import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { getingredients } from '../../services/slices/ingredients';

const MAX_INGREDIENTS_DISPLAY = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();
  const ingredients = useSelector(getingredients);

  const orderInfo = useMemo(() => {
    if (ingredients.length === 0) return null;

    const ingredientsInfo = order.ingredients.reduce<TIngredient[]>((acc, id) => {
      const found = ingredients.find(ing => ing._id === id);
      return found ? [...acc, found] : acc;
    }, []);

    const total = ingredientsInfo.reduce((sum, item) => sum + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, MAX_INGREDIENTS_DISPLAY);
    const remains = Math.max(ingredientsInfo.length - MAX_INGREDIENTS_DISPLAY, 0);

    const date = new Date(order.createdAt);

    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={MAX_INGREDIENTS_DISPLAY}
      locationState={{ background: location }}
    />
  );
});
