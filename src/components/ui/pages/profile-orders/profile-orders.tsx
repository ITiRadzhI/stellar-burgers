import React, { FC } from 'react';

import styles from './profile-orders.module.css';

import { UserOrdersProps } from './type';
import { ProfileMenu, OrdersDisplay } from '@components';

export const UserOrdersPage: FC<UserOrdersProps> = ({ orders }) => (
  <main className={styles.main}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    <div className={`mt-10 ${styles.orders}`}>
      <OrdersDisplay orders={orders} />
    </div>
  </main>
);
