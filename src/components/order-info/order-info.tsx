import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

import { getingredients } from '../../services/slices/ingredients';
import { getOrderNumber, orderSelector } from '../../services/slices/orders';

interface OrderInfoProps {
  orderNumber: string;
}

type TIngredientsWithCount = {
  [key: string]: TIngredient & { count: number };
};

export const OrderInfo: FC<OrderInfoProps> = ({ orderNumber }) => {
  const number = Number(orderNumber);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderNumber(number));
  }, [dispatch, number]);

  const orderData = useSelector(orderSelector);
  const ingredients = useSelector(getingredients);

  const orderInfo = useMemo(() => {
    if (!orderData || ingredients.length === 0) return null;

    const date = new Date(orderData.createdAt);

    const ingredientsInfo = orderData.ingredients.reduce<TIngredientsWithCount>((acc, id) => {
      if (!acc[id]) {
        const ingredient = ingredients.find(ing => ing._id === id);
        if (ingredient) {
          acc[id] = { ...ingredient, count: 1 };
        }
      } else {
        acc[id].count++;
      }
      return acc;
    }, {});

    const total = Object.values(ingredientsInfo).reduce((sum, item) => sum + item.price * item.count, 0);

    return { ...orderData, ingredientsInfo, date, total };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
