import React from 'react';
import config from '../config/env';
import Card from '../components/common/Card';

export default function About() {
  return (
    <div className="container">
      <Card title="About" subtitle="Open API Data Dashboard">
        <p>This app demonstrates integration with several public APIs using a lightweight React stack.</p>
        <ul>
          <li>Theme: Ocean Professional</li>
          <li>Env: {config.nodeEnv}</li>
          <li>Features: {String(config.featureFlagsRaw || '') || 'none'}</li>
          <li>Experiments Enabled: {String(config.experimentsEnabled)}</li>
        </ul>
        <p>APIs:</p>
        <ul>
          <li><a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a></li>
          <li><a href="https://www.coingecko.com/en/api" target="_blank" rel="noreferrer">CoinGecko</a></li>
          <li><a href="https://api.spaceflightnewsapi.net/v4/documentation" target="_blank" rel="noreferrer">Spaceflight News</a></li>
        </ul>
      </Card>
    </div>
  );
}
