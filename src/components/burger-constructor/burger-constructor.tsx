import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';

import {
  bunSelector,
  ingredientSelector
} from '../../services/slices/burgerConstructor';

import {
  userOrder,
  setOrderLoading,
  clearUserOrder,
  userOrderLoadingSelector,
  userOrderSelector
} from '../../services/slices/orders';

import { selectIsAuthVerified } from '../../services/slices/user';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => selectIsAuthVerified(state.user));
  const bun = useSelector(bunSelector);
  const ingredients = useSelector(ingredientSelector);

  const orderRequest = useSelector(userOrderLoadingSelector);
  const orderModalData = useSelector(userOrderSelector);

  // Формируем полный список ингредиентов для заказа (булка + начинка + булка)
  const fullIngredientList = bun
    ? [bun._id, ...ingredients.map(i => i._id), bun._id]
    : ingredients.map(i => i._id);

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (total: number, item: TConstructorIngredient) => total + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const onOrderClick = () => {
    if (!bun) {
      alert('Добавьте булочки');
      return;
    }

    if (orderRequest) {
      return; // Уже отправляется заказ — блокируем повторный клик
    }

    if (isAuthenticated) {
      dispatch(userOrder(fullIngredientList));
      dispatch(setOrderLoading(true));
      console.log('Отправляемые данные заказа:', fullIngredientList);
    } else {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(setOrderLoading(false));
    dispatch(clearUserOrder());
  };

  const constructorItems = { bun, ingredients };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
