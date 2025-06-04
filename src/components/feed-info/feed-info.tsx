import { FC } from 'react';
import { useSelector } from '../../services/store';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

import {
  selectFeedOrders,
  selectFeedTotalToday,
  selectFeedTotalOrders
} from '../../services/slices/feed';

const filterOrdersByStatus = (orders: TOrder[], status: string): number[] => {
  return orders
    .filter(order => order.status === status)
    .map(order => order.number)
    .slice(0, 20);
};

export const FeedInfo: FC = () => {
  const orders = useSelector(selectFeedOrders);
  const total = useSelector(selectFeedTotalOrders);
  const totalToday = useSelector(selectFeedTotalToday);

  const readyOrders = filterOrdersByStatus(orders, 'done');
  const pendingOrders = filterOrdersByStatus(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total, totalToday }}
    />
  );
};
