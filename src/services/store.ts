import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

import {
  TypedUseSelectorHook,
  useDispatch as rawUseDispatch,
  useSelector as rawUseSelector,
} from 'react-redux';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = rawUseDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
