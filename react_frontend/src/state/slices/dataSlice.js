import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWeatherByCity, getWeatherByCoords } from '../../services/apis/public/weatherApi';
import { getTopMarkets } from '../../services/apis/public/cryptoApi';
import { getNews } from '../../services/apis/public/newsApi';

export const fetchWeatherByCity = createAsyncThunk('data/weatherCity', async (city) => {
  return getWeatherByCity(city);
});

export const fetchWeatherByCoords = createAsyncThunk('data/weatherCoords', async ({ lat, lon }) => {
  return getWeatherByCoords({ lat, lon });
});

export const fetchCrypto = createAsyncThunk('data/crypto', async () => {
  return getTopMarkets();
});

export const fetchNews = createAsyncThunk('data/news', async () => {
  return getNews();
});

const initialState = {
  weather: null,
  crypto: [],
  news: [],
  status: {
    weather: 'idle',
    crypto: 'idle',
    news: 'idle',
  },
  errors: {
    weather: null,
    crypto: null,
    news: null,
  },
  timestamps: {},
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // weather city
    builder.addCase(fetchWeatherByCity.pending, (s) => { s.status.weather = 'loading'; s.errors.weather = null; });
    builder.addCase(fetchWeatherByCity.fulfilled, (s, a) => { s.status.weather = 'succeeded'; s.weather = a.payload; s.timestamps.weather = Date.now(); });
    builder.addCase(fetchWeatherByCity.rejected, (s, a) => { s.status.weather = 'failed'; s.errors.weather = a.error.message; });

    // weather coords
    builder.addCase(fetchWeatherByCoords.pending, (s) => { s.status.weather = 'loading'; s.errors.weather = null; });
    builder.addCase(fetchWeatherByCoords.fulfilled, (s, a) => { s.status.weather = 'succeeded'; s.weather = a.payload; s.timestamps.weather = Date.now(); });
    builder.addCase(fetchWeatherByCoords.rejected, (s, a) => { s.status.weather = 'failed'; s.errors.weather = a.error.message; });

    // crypto
    builder.addCase(fetchCrypto.pending, (s) => { s.status.crypto = 'loading'; s.errors.crypto = null; });
    builder.addCase(fetchCrypto.fulfilled, (s, a) => { s.status.crypto = 'succeeded'; s.crypto = a.payload; s.timestamps.crypto = Date.now(); });
    builder.addCase(fetchCrypto.rejected, (s, a) => { s.status.crypto = 'failed'; s.errors.crypto = a.error.message; });

    // news
    builder.addCase(fetchNews.pending, (s) => { s.status.news = 'loading'; s.errors.news = null; });
    builder.addCase(fetchNews.fulfilled, (s, a) => { s.status.news = 'succeeded'; s.news = a.payload; s.timestamps.news = Date.now(); });
    builder.addCase(fetchNews.rejected, (s, a) => { s.status.news = 'failed'; s.errors.news = a.error.message; });
  },
});

export default dataSlice.reducer;
