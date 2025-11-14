import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import dataReducer from './slices/dataSlice';

// PUBLIC_INTERFACE
export function makeStore(preloadedState) {
  /** Creates the Redux store */
  return configureStore({
    reducer: {
      ui: uiReducer,
      data: dataReducer,
    },
    preloadedState,
    middleware: (getDefault) => getDefault({ serializableCheck: false }),
    devTools: process.env.NODE_ENV !== 'production',
  });
}

const store = makeStore();
export default store;
