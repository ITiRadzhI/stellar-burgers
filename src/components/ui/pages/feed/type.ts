import { TOrder } from '@utils-types';

export type FeedDisplayProps = {
  orders: TOrder[];
  handleGetFeeds: () => void;
  onRefresh: () => void;
};
