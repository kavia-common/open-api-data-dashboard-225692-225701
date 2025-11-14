import { makeStore } from './store';
import { fetchCrypto } from './slices/dataSlice';

beforeEach(() => {
  global.fetch = jest.fn(async () => ({
    ok: true,
    headers: { get: () => 'application/json' },
    json: async () => ([
      { id: 'btc', name: 'Bitcoin', symbol: 'btc', current_price: 1, price_change_percentage_24h: 0.1, image: '' },
    ]),
  }));
});

afterEach(() => {
  jest.resetAllMocks();
});

test('fetchCrypto loads data into state', async () => {
  const store = makeStore();
  await store.dispatch(fetchCrypto());
  const state = store.getState();
  expect(state.data.crypto.length).toBeGreaterThan(0);
  expect(state.data.status.crypto).toBe('succeeded');
});
