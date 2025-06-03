import React, { FC } from 'react';

import styles from './orders-list.module.css';

import { OrdersDisplayProps } from './type';
import { OrderItem } from '@components';

export const OrdersDisplay: FC<OrdersDisplayProps> = ({ sortedOrders }) => (
  <div className={styles.content}>
    {sortedOrders.map((order) => (
      <OrderItem key={order._id} order={order} />
    ))}
  </div>
);
