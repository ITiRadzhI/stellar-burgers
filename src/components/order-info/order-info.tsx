import React from 'react';
import { useSelector } from '../../services/store'; 
import { getingredients } from '../../services/slices/ingredients';

interface OrderInfoProps {
  orderNumber: string;
}

const OrderInfo: React.FC<OrderInfoProps> = ({ orderNumber }) => {
  const ingredients = useSelector(getingredients);

  // Здесь можно получить инфу по заказу по номеру orderNumber, если нужно

  return (
    <ul>
      {ingredients.map((item) => (
        <li key={item._id}>{item.name}</li>
      ))}
    </ul>
  );
};

export default OrderInfo;
