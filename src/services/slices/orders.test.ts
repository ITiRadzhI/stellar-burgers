import { TOrder } from '../../utils/types';
import { orderSlice, getOrderNumber, userOrder } from './orders';
import { initialState } from './orders';

describe('orderSlice reducer', () => {
  const mockOrder: TOrder = {
    _id: '1',
    status: 'done',
    name: 'Test Order',
    createdAt: '2022-01-01T00:00:00.000Z',
    updatedAt: '2022-01-01T00:00:00.000Z',
    number: 123,
    ingredients: ['1', '2', '3']
  };

  const mockUserOrder: TOrder = {
    _id: '1',
    status: 'done',
    name: 'Test User Order',
    createdAt: '2022-01-01T00:00:00.000Z',
    updatedAt: '2022-01-01T00:00:00.000Z',
    number: 456,
    ingredients: ['1', '2', '3']
  };

  it('should handle getOrderNumber.pending', () => {
    const action = { type: getOrderNumber.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('should handle getOrderNumber.fulfilled', () => {
    const action = { type: getOrderNumber.fulfilled.type, payload: mockOrder };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      order: mockOrder,
      loading: false
    });
  });

  it('should handle getOrderNumber.rejected', () => {
    const action = {
      type: getOrderNumber.rejected.type,
      error: { message: 'Failed to fetch order' }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Failed to fetch order'
    });
  });

  it('should handle userOrder.pending', () => {
    const action = { type: userOrder.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderLoading: true,
      orderError: null
    });
  });

  it('should handle userOrder.fulfilled', () => {
    const action = {
      type: userOrder.fulfilled.type,
      payload: { order: mockUserOrder }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userOrder: mockUserOrder,
      orderLoading: false
    });
  });

  it('should handle userOrder.rejected', () => {
    const action = {
      type: userOrder.rejected.type,
      error: { message: 'Failed to fetch order' }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderLoading: false,
      orderError: 'Failed to fetch order'
    });
  });

  it('should handle clearOrder', () => {
    const action = { type: orderSlice.actions.clearOrder.type };
    const state = orderSlice.reducer(
      { ...initialState, order: mockOrder },
      action
    );
    expect(state).toEqual({
      ...initialState,
      order: null
    });
  });

  it('should handle clearUserOrder', () => {
    const action = { type: orderSlice.actions.clearUserOrder.type };
    const state = orderSlice.reducer(
      { ...initialState, userOrder: mockUserOrder },
      action
    );
    expect(state).toEqual({
      ...initialState,
      userOrder: null
    });
  });
});
