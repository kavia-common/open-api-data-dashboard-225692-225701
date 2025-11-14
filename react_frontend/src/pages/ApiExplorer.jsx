import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import { getWeatherByCity } from '../services/apis/public/weatherApi';
import { getTopMarkets } from '../services/apis/public/cryptoApi';
import { getNews } from '../services/apis/public/newsApi';
import { encode } from '../services/apis/util/sanitization';

const apis = [
  { id: 'weather', name: 'Weather (Open-Meteo)', exec: async (p) => getWeatherByCity(p.city) },
  { id: 'crypto', name: 'Crypto (CoinGecko)', exec: async () => getTopMarkets() },
  { id: 'news', name: 'News (Spaceflight)', exec: async () => getNews() },
];

export default function ApiExplorer() {
  const [selected, setSelected] = useState(apis[0].id);
  const [params, setParams] = useState({ city: 'San Francisco' });
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState(null);
  const [result, setResult] = useState(null);

  const current = apis.find((a) => a.id === selected);

  const run = async () => {
    setLoading(true); setErr(null); setResult(null);
    try {
      const res = await current.exec(params);
      setResult(res);
    } catch (e) {
      setErr(e.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container grid cols-2">
      <Card title="API Explorer" subtitle="Run requests to public APIs">
        <label htmlFor="api">API</label>
        <select id="api" className="input" value={selected} onChange={(e) => setSelected(e.target.value)}>
          {apis.map((a) => <option value={a.id} key={a.id}>{a.name}</option>)}
        </select>

        {selected === 'weather' && (
          <>
            <label htmlFor="city" style={{ marginTop: 12 }}>City</label>
            <input
              id="city"
              className="input"
              value={params.city}
              onChange={(e) => setParams({ ...params, city: encode(e.target.value) })}
              placeholder="City name"
            />
          </>
        )}

        <div style={{ marginTop: 12 }}>
          <Button onClick={run}>Execute</Button>
        </div>
      </Card>

      <Card title="Response">
        {loading && <Loader label="Calling API..." />}
        {error && <ErrorState message={error} onRetry={run} />}
        {!loading && !error && result && (
          <pre className="surface" style={{ padding: 12, overflow: 'auto' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </Card>
    </div>
  );
}
