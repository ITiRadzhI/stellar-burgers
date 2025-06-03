import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

export interface OrderState {
  order: TOrder | null;
  userOrder: TOrder | null;
  orders: TOrder[];
  loading: boolean;
  error: string | null;
  orderLoading: boolean;
  orderError: string | null;
}

const initialState: OrderState = {
  order: null,
  userOrder: null,
  orders: [],
  loading: false,
  error: null,
  orderLoading: false,
  orderError: null,
};

// Получение заказа по номеру
export const getOrderNumber = createAsyncThunk<TOrder, number>(
  'orders/getOrderNumber',
  async (orderNumber) => {
    const response = await getOrderByNumberApi(orderNumber);
    return response.orders[0]; // Берём первый заказ
  }
);

// Создание пользовательского заказа
export const userOrder = createAsyncThunk<TOrder, string[]>(
  'user/order',
  async (ingredients) => {
    const response = await orderBurgerApi(ingredients);
    return response;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrder(state) {
      state.order = null;
    },
    clearUserOrder(state) {
      state.userOrder = null;
    },
    setOrderLoading(state, action: PayloadAction<boolean>) {
      state.orderLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderNumber.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
      })
      .addCase(getOrderNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch order';
      })
      .addCase(userOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(userOrder.fulfilled, (state, action) => {
        state.userOrder = action.payload.order ?? action.payload; // В зависимости от API
        state.orderLoading = false;
      })
      .addCase(userOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.error.message ?? 'Failed to fetch order';
      });
  }
});

export const { clearOrder, clearUserOrder, setOrderLoading } = orderSlice.actions;

// Селекторы
export const orderLoadingSelector = (state: RootState) => state.orders.loading;
export const orderSelector = (state: RootState) => state.orders.order;

export const userOrderSelector = (state: RootState) => state.orders.userOrder;
export const userOrderLoadingSelector = (state: RootState) => state.orders.orderLoading;

export default orderSlice.reducer;
