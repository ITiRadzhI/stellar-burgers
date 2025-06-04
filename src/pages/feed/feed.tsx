import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';

import { Preloader } from '@ui';
import { FeedDisplay } from '@ui-pages';
import { TOrder } from '@utils-types';

import { getFeeds, selectFeedOrders } from '../../services/slices/feed';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(selectFeedOrders);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedDisplay
      orders={orders}
      handleGetFeeds={() => dispatch(getFeeds())}
      onRefresh={() => dispatch(getFeeds())}
    />
  );
};
