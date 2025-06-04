import React, { FC } from 'react';

import styles from './orders-list.module.css';

import { OrdersDisplayProps } from './type';
import { OrderCard } from '@components';

export const OrdersDisplay: FC<OrdersDisplayProps> = ({ sortedOrders }) => (
  <div className={styles.content}>
    {sortedOrders.map((order) => (
      <OrderCard key={order._id} order={order} />
    ))}
  </div>
);
