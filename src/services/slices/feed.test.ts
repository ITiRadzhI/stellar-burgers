import { feedSlice, getFeeds, initialState } from './feed';
import { TFeedsResponse } from '../../utils/burger-api';


jest.mock('../../utils/burger-api', () => ({
  getFeedsApi: jest.fn()
}));

describe('feedSlice reducer', () => {
  it('возвращает начальное состояние при неизвестном действии', () => {
    expect(feedSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('обрабатывает getFeeds.pending (устанавливает loading в true)', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('обрабатывает getFeeds.fulfilled (обновляет состояние с полученными данными)', () => {
    const mockData: TFeedsResponse = {
      success: true,
      orders: [
        {
          _id: '1',
          status: 'done',
          name: 'Burger',
          createdAt: '',
          updatedAt: '',
          number: 1,
          ingredients: []
        }
      ],
      total: 1,
      totalToday: 1
    };

    const action = { type: getFeeds.fulfilled.type, payload: mockData };
    const state = feedSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      orders: mockData.orders,
      total: mockData.total,
      totalToday: mockData.totalToday,
      loading: false,
      error: undefined
    });
  });

  it('обрабатывает getFeeds.rejected (устанавливает ошибку и сбрасывает loading)', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: { message: 'Fetch failed' }
    };
    const state = feedSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Fetch failed'
    });
  });
});
