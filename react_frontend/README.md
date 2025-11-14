# Open API Data Dashboard (React Frontend)

A lightweight React app styled with the Ocean Professional theme. It integrates multiple public APIs (Open‑Meteo, CoinGecko, Spaceflight News) and demonstrates routing, state management with Redux Toolkit, feature flags, retry and circuit breaker utilities, and accessible UI components.

## Getting started

### Prerequisites
- Node.js 18+ and npm
- No API keys required (all integrated APIs support keyless access)

### Quick start
- npm install
- npm start
- npm test

### Scripts
- npm start — start the development server on the configured port (default 3000)
- npm run build — create a production build
- npm test — run unit/integration tests in watch mode
- CI=true npm test -- --watchAll=false — run tests once in CI

## Environment variables (REACT_APP_*)

These are read in src/config/env.js and must be prefixed with REACT_APP_ to be available to the client bundle.

- REACT_APP_API_BASE: Optional base URL for your own backend. If unset, service clients use absolute public endpoints.
- REACT_APP_BACKEND_URL: Optional backend URL (informational; currently not auto‑used by clients).
- REACT_APP_FRONTEND_URL: Optional; defaults to window.location.origin.
- REACT_APP_WS_URL: Optional WebSocket URL.
- REACT_APP_NODE_ENV: development|production (falls back to NODE_ENV or development).
- REACT_APP_ENABLE_SOURCE_MAPS: true|false (default true).
- REACT_APP_PORT: Dev server port (default 3000).
- REACT_APP_TRUST_PROXY: true|false (default false).
- REACT_APP_LOG_LEVEL: trace|debug|info|warn|error|silent (default info).
- REACT_APP_HEALTHCHECK_PATH: Health endpoint or static path (default /healthcheck.txt).
- REACT_APP_FEATURE_FLAGS: CSV or JSON (e.g., "weather,crypto,news" or {"news":true}).
- REACT_APP_EXPERIMENTS_ENABLED: true|false (default false).

No secrets should be added; this is a browser app. Do not include tokens or credentials in any REACT_APP_* variable.

## Application architecture

The application follows a modular, layered structure:

- UI components: src/components/ contain presentational and layout components (Button, Card, Loader, ErrorState, Header, Footer, Sidebar, SimpleChart).
- Pages and routing: src/pages/ and src/router/AppRouter.jsx provide routeable screens: Dashboard, API Explorer, About, NotFound. Routes are lazy‑loaded via React.Suspense.
- State management: src/state/ uses Redux Toolkit. The store (src/state/store.js) composes uiSlice and dataSlice. Async thunks in dataSlice orchestrate data fetching.
- Services and APIs: src/services/ holds HTTP client utilities and API clients for weather, crypto, and news. Resilience utilities (retry, circuit breaker, sanitization) live under src/services/apis/util/.
- Configuration: src/config/ provides env variable parsing (env.js) and feature flag evaluation (featureFlags.js).
- Hooks and utils: src/hooks/ contains useAsync and useFeatureFlag; src/utils/logger.js provides leveled logging with URL redaction.
- Styling: src/styles/ implements the Ocean Professional theme and core utilities.

### High‑level component/data flow

- Pages dispatch async thunks (dataSlice) to fetch data from public APIs.
- Thunks call service clients (weatherApi, cryptoApi, newsApi) which:
  - Use httpFetch for requests, with timeouts and JSON handling.
  - Apply withRetry for transient failures and makeCircuitBreaker to avoid cascading failures.
  - Sanitize dynamic data using sanitization utilities.
- The Redux store tracks status (loading/succeeded/failed), data, and errors per domain.
- UI components render based on slice state and respond to feature flags.

## Project structure

- src/
  - App.js, App.css — root application shell
  - index.js, index.css — bootstrapping, theme attribute management
  - router/AppRouter.jsx — route definitions with lazy loading
  - components/
    - Layout/ (Header, Footer, Sidebar)
    - common/ (Button, Card, Loader, ErrorState, SearchBar)
    - charts/ (SimpleChart)
  - pages/ (Dashboard, ApiExplorer, About, NotFound)
  - state/
    - store.js
    - slices/
      - uiSlice.js
      - dataSlice.js
  - services/
    - httpClient.js
    - apis/
      - public/
        - weatherApi.js
        - cryptoApi.js
        - newsApi.js
      - util/
        - retry.js, retry.test.js
        - circuitBreaker.js
        - sanitization.js
  - hooks/ (useAsync.js, useFeatureFlag.js)
  - config/ (env.js, featureFlags.js)
  - styles/ (ocean.css, theme.css)
  - utils/ (logger.js)

## Running, building, and testing

### Run (development)
- Ensure REACT_APP_PORT is set if you need a non‑default port.
- npm start
- Open http://localhost:3000 or the configured port.

### Build (production)
- npm run build
- Output in build/ with minification. Source maps controlled by REACT_APP_ENABLE_SOURCE_MAPS.

### Test
- npm test — runs tests with Jest and React Testing Library.
  - Unit tests: hooks, utils, feature flags, UI bits
  - Integration tests: Redux slice async thunks (e.g., dataSlice.int.test.js)
- For CI: CI=true npm test -- --watchAll=false

## Feature flags

Feature flags are parsed from REACT_APP_FEATURE_FLAGS via src/config/featureFlags.js:
- CSV: weather,crypto,news
- JSON array: ["weather","news"]
- JSON object: {"news":true,"crypto":false}

Experimental variants are enabled when REACT_APP_EXPERIMENTS_ENABLED=true and the flag is prefixed with exp:. The useFeatureFlag hook returns a boolean for the given flag. The Dashboard currently defaults to showing core cards and can be further conditioned on flags.

## API endpoints used

This app calls only public, keyless endpoints:

- Weather (Open‑Meteo)
  - Geocoding: https://geocoding-api.open-meteo.com/v1/search?name={city}
  - Current weather: https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true
  - Implemented in src/services/apis/public/weatherApi.js

- Crypto (CoinGecko)
  - Markets: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false
  - Implemented in src/services/apis/public/cryptoApi.js

- News (Spaceflight News API)
  - Articles: https://api.spaceflightnewsapi.net/v4/articles/?limit=10
  - Implemented in src/services/apis/public/newsApi.js

Requests use httpFetch with:
- AbortController timeout (default 12s)
- JSON auto‑parsing
- Error surfacing with status and body
- URL redaction in logs

Retry and circuit breaker utilities:
- withRetry (exponential backoff): src/services/apis/util/retry.js
- makeCircuitBreaker: src/services/apis/util/circuitBreaker.js

## Styling and accessibility

- Theme: Ocean Professional
  - Colors, radii, shadows, gradients in src/styles/ocean.css
  - Resets, layout utilities, buttons, inputs, grid, header/footer in src/styles/theme.css
- Theme switching: data-theme attribute on <html> is toggled via Redux UI slice.
- Components are keyboard accessible and use ARIA roles/labels where appropriate.

## Logging and health

- Logging levels controlled by REACT_APP_LOG_LEVEL. No sensitive data in logs; URLs are redacted by utils/logger.js.
- Footer links to healthcheck path specified by REACT_APP_HEALTHCHECK_PATH.

## Extending the app

- Add an API client: create a new module in src/services/apis/public, returning cleaned data.
- Wire to state: add a createAsyncThunk in src/state/slices/dataSlice.js and handle states in extraReducers.
- Display in UI: render data in a new Card on a page or add an option to ApiExplorer.

## Troubleshooting

- The app is designed to work without REACT_APP_API_BASE; public API clients use absolute URLs. If you configure a backend, set REACT_APP_API_BASE for relative paths.
- If you see HTTP errors, circuit breakers may temporarily open under repeated failures; try again after cooldown.
- For port conflicts, set REACT_APP_PORT to an unused port before running npm start.

## License

For internal evaluation and demo purposes.
