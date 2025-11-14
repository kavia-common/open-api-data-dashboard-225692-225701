import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  isLoading: false,
  toasts: [],
  filter: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme(state, action) {
      state.theme = action.payload === 'dark' ? 'dark' : 'light';
    },
    setLoading(state, action) {
      state.isLoading = !!action.payload;
    },
    addToast(state, action) {
      state.toasts.push({ id: Date.now(), ...action.payload });
    },
    removeToast(state, action) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    setFilter(state, action) {
      state.filter = String(action.payload || '');
    },
  },
});

export const { toggleTheme, setTheme, setLoading, addToast, removeToast, setFilter } = uiSlice.actions;

// PUBLIC_INTERFACE
export const selectTheme = (state) => state.ui.theme;
// PUBLIC_INTERFACE
export const selectFilter = (state) => state.ui.filter;

export default uiSlice.reducer;
