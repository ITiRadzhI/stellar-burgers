import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder, TNewOrderResponse } from '../../utils/types'; 

export type OrdersState = {
  order: TOrder | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: OrdersState = {
  order: null,
  status: 'idle',
  error: null,
};

export const createOrder = createAsyncThunk<TOrder, string[], { rejectValue: string }>(
  'orders/createOrder',
  async (ingredients, thunkAPI) => {
    try {
      const response: TNewOrderResponse = await orderBurgerApi(ingredients);
      return response.order;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearUserOrder(state) {
      state.order = null;
      state.status = 'idle';
      state.error = null;
    },
    setOrderLoading(state, action) {
      state.status = action.payload ? 'loading' : 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unknown error';
      });
  }
});

export const { clearUserOrder, setOrderLoading } = ordersSlice.actions;

export const userOrderSelector = (state: any) => state.orders.order;
export const userOrderLoadingSelector = (state: any) => state.orders.status === 'loading';

export default ordersSlice.reducer;

