import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';

import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';

import {
  fetchUserOrdersThunk,
  selectUserOrderHistory
} from '../../services/slices/user';
import { getFeeds } from '../../services/slices/feed';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrdersThunk());
    dispatch(getFeeds());
  }, [dispatch]);

  const orders: TOrder[] = useSelector((state) =>
    selectUserOrderHistory(state.user)
  );

  return <ProfileOrdersUI orders={orders} />;
};
