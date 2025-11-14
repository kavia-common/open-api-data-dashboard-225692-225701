# Open API Data Dashboard (React Frontend)

A lightweight React app with Ocean Professional theme integrating public APIs (Open-Meteo, CoinGecko, Spaceflight News). Uses React Router and Redux Toolkit.

## Quick start
- npm install
- npm start
- npm test

## Environment variables (REACT_APP_*)
- REACT_APP_API_BASE: optional base for your own backend
- REACT_APP_BACKEND_URL: optional
- REACT_APP_FRONTEND_URL: optional (defaults to window.location.origin)
- REACT_APP_WS_URL: optional
- REACT_APP_NODE_ENV: development|production
- REACT_APP_ENABLE_SOURCE_MAPS: true|false
- REACT_APP_PORT: dev server port (default 3000)
- REACT_APP_TRUST_PROXY: true|false
- REACT_APP_LOG_LEVEL: trace|debug|info|warn|error|silent (default info)
- REACT_APP_HEALTHCHECK_PATH: default /healthcheck.txt
- REACT_APP_FEATURE_FLAGS: CSV or JSON (e.g. "weather,crypto,news" or {"news":true})
- REACT_APP_EXPERIMENTS_ENABLED: true|false

No secrets should be added; all APIs used here support keyless access.

## Feature flags
Flags can be enabled via REACT_APP_FEATURE_FLAGS. Use exp: prefix for experimental variants combined with REACT_APP_EXPERIMENTS_ENABLED=true.

## Extend APIs
Add a new client under src/services/apis/public, create a thunk in dataSlice, and display it on a page or in the Explorer form.

## Styling
- src/styles/ocean.css: color tokens and gradients
- src/styles/theme.css: resets, utilities, layout
