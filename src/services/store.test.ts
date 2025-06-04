import {store} from './store';
import { rootReducer } from './rootReducer';

describe('Store Initialization', () => {
  it('should initialize the store with rootReducer', () => {
    const currentState = store.getState();
    const expectedInitialState = rootReducer(undefined, { type: '@@INIT' });
    expect(currentState).toEqual(expectedInitialState);
  });
});

describe('Initial State Validations', () => {
  it('should have correct initial state for user slice', () => {
    const userState = store.getState().user;
    expect(userState).toMatchObject({
      errorMsg: null,
      isAuthVerified: false,
      isOrderRequesting: false,
      isUserRequesting: false,
      registrationInfo: null,
      userInfo: null,
      userOrderHistory: []
    });
  });

  it('should have correct initial state for ingredients slice', () => {
    const ingredientsState = store.getState().ingredients;
    expect(ingredientsState).toEqual(
      expect.objectContaining({
        buns: [],
        error: null,
        ingredients: [],
        isLoading: false,
        mains: [],
        sauces: []
      })
    );
  });

  it('should have correct initial state for burgerConstructor slice', () => {
    const burgerConstructorState = store.getState().burgerConstructor;
    expect(burgerConstructorState).toStrictEqual({
      bun: null,
      ingredients: []
    });
  });

  it('should have correct initial state for feed slice', () => {
    const feedState = store.getState().feed;
    expect(feedState).toEqual({
      error: null,
      loading: false,
      orders: [],
      total: 0,
      totalToday: 0
    });
  });

  it('should have correct initial state for orders slice', () => {
    const ordersState = store.getState().orders;
    expect(ordersState).toMatchObject({
      error: null,
      loading: false,
      order: null,
      orderError: null,
      orderLoading: false,
      orders: [],
      userOrder: null
    });
  });
});
