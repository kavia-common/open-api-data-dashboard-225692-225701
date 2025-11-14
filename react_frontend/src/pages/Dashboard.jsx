import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import SimpleChart from '../components/charts/SimpleChart';
import { fetchCrypto, fetchNews, fetchWeatherByCity } from '../state/slices/dataSlice';
import { selectFilter } from '../state/slices/uiSlice';
import SearchBar from '../components/common/SearchBar';
import useFeatureFlag from '../hooks/useFeatureFlag';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { weather, crypto, news, status, errors } = useSelector((s) => s.data);
  const filter = useSelector(selectFilter);

  const showWeather = useFeatureFlag('weather') || true;
  const showCrypto = useFeatureFlag('crypto') || true;
  const showNews = useFeatureFlag('news') || true;

  useEffect(() => {
    if (showWeather) dispatch(fetchWeatherByCity('San Francisco'));
    if (showCrypto) dispatch(fetchCrypto());
    if (showNews) dispatch(fetchNews());
  }, [dispatch, showWeather, showCrypto, showNews]);

  const filteredNews = useMemo(() => {
    if (!filter) return news;
    const f = filter.toLowerCase();
    return (news || []).filter((n) => n.title?.toLowerCase().includes(f) || n.source?.toLowerCase().includes(f));
  }, [news, filter]);

  return (
    <div className="container grid cols-3" role="main">
      {showWeather && (
        <Card title="Weather" subtitle="Open-Meteo current">
          {status.weather === 'loading' && <Loader label="Loading weather" />}
          {status.weather === 'failed' && <ErrorState message={errors.weather} onRetry={() => dispatch(fetchWeatherByCity('San Francisco'))} />}
          {status.weather === 'succeeded' && weather && (
            <div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>{weather.temperature} {weather.unit}</div>
              <div>Wind: {weather.windSpeed} m/s</div>
              <small style={{ opacity: 0.7 }}>Updated: {new Date(weather.time).toLocaleString()}</small>
            </div>
          )}
        </Card>
      )}

      {showCrypto && (
        <Card
          title="Crypto Markets"
          subtitle="CoinGecko top 10"
          actions={<SearchBar placeholder="Filter…" onChange={() => {}} ariaLabel="Crypto local filter" />}
        >
          {status.crypto === 'loading' && <Loader label="Loading crypto" />}
          {status.crypto === 'failed' && <ErrorState message={errors.crypto} onRetry={() => dispatch(fetchCrypto())} />}
          {status.crypto === 'succeeded' && (
            <>
              <SimpleChart data={(crypto || []).map((c) => Number(c.price || 0))} labels={(crypto || []).map((c) => c.symbol)} />
              <div style={{ overflowX: 'auto', marginTop: 8 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th align="left">Name</th>
                      <th align="right">Price (USD)</th>
                      <th align="right">24h %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(crypto || []).map((c) => (
                      <tr key={c.id} style={{ borderTop: '1px solid rgba(17,24,39,0.08)' }}>
                        <td>{c.name} ({c.symbol})</td>
                        <td align="right">${Number(c.price).toLocaleString()}</td>
                        <td align="right" style={{ color: (c.change24h || 0) >= 0 ? 'green' : 'var(--color-error)' }}>
                          {Number(c.change24h || 0).toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </Card>
      )}

      {showNews && (
        <Card title="News" subtitle="Spaceflight News">
          {status.news === 'loading' && <Loader label="Loading news" />}
          {status.news === 'failed' && <ErrorState message={errors.news} onRetry={() => dispatch(fetchNews())} />}
          {status.news === 'succeeded' && (
            <ul>
              {filteredNews.map((n) => (
                <li key={n.id} style={{ marginBottom: 6 }}>
                  <a href={n.url} target="_blank" rel="noopener noreferrer">{n.title}</a> <small>({n.source})</small>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </div>
  );
}
