import { TOrder } from '../../utils/types';
import ordersReducer, {
  createOrder,
  clearUserOrder,
  setOrderLoading
} from './orders';

const initialState = {
  order: null,
  status: 'idle' as 'idle',
  error: null
};

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Test Order',
  createdAt: '2022-01-01T00:00:00.000Z',
  updatedAt: '2022-01-01T00:00:00.000Z',
  number: 123,
  ingredients: ['1', '2', '3']
};

describe('ordersSlice reducer', () => {
  it('should handle createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: 'loading',
      error: null
    });
  });

  it('should handle createOrder.fulfilled', () => {
    const action = { type: createOrder.fulfilled.type, payload: mockOrder };
    const state = ordersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      order: mockOrder,
      status: 'succeeded'
    });
  });

  it('should handle createOrder.rejected', () => {
    const action = {
      type: createOrder.rejected.type,
      payload: 'Failed to create order'
    };
    const state = ordersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: 'failed',
      error: 'Failed to create order'
    });
  });

  it('should handle clearUserOrder', () => {
    const action = { type: clearUserOrder.type };
    const state = ordersReducer(
      { ...initialState, order: mockOrder, status: 'succeeded', error: '123' },
      action
    );
    expect(state).toEqual({
      ...initialState
    });
  });

  it('should handle setOrderLoading', () => {
    const action = { type: setOrderLoading.type, payload: true };
    const state = ordersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: 'loading'
    });
  });
});
