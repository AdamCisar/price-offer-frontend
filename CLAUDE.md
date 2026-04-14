# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Dev server at http://localhost:3000 (proxies to https://ponuka.cisarvkp.sk)
npm run build    # Production build
npm test         # Run tests in watch mode
npm test -- --watchAll=false  # Run tests once (CI mode)
```

The dev proxy is configured in `package.json` (`"proxy": "https://ponuka.cisarvkp.sk"`). The active backend target is set via `REACT_APP_BASE_URL` in `.env`.

### JSON Server (mock backend)
There is a fake server at `src/fakers/json_server/server.js` that serves `db.json` on port 5000:
```bash
node src/fakers/json_server/server.js
```

## Environment Variables (`.env`)

| Variable | Purpose |
|---|---|
| `REACT_APP_BASE_URL` | Backend base URL (e.g. `http://priceoffer.local`) |
| `REACT_APP_REVERB_APP_KEY` | Laravel Reverb WebSocket key |
| `REACT_APP_REVERB_HOST` / `_PORT` / `_SCHEME` | Reverb connection config |
| `REACT_APP_BEAMS_INSTANCE_ID` | Pusher Beams instance for push notifications |

## Architecture

### Routes & Pages
Three main pages, all requiring authentication (`PrivateRoutes`):
- `/cenove-ponuky` — price offer list (`PriceOfferList`)
- `/cenove-ponuky/:id` — price offer detail (`PriceOfferDetails`)
- `/produkty` — product/item catalog (`Items`)
- `/prihlasenie` — login (public)

### Authentication
JWT token stored in `localStorage` under key `token`. The app also supports receiving a token via `window.postMessage` from a parent iframe (origin `cisarvkp.sk`). `PrivateRoutes` checks token expiry on every navigation and redirects to `/prihlasenie` if expired. Token refresh logic is in `src/components/auth/RefreshToken.jsx`.

### Provider Hierarchy
Each route is wrapped in page-specific providers. The general stack (applied to all authenticated routes):

```
ErrorBoundary
  QueryClientProvider (TanStack Query)
    SnackBarWrapper (notistack)
      UserInfoProvider
        [page-specific providers]
```

Page-specific providers:
- `PriceOfferListProviders` → wraps `PencilEditProvider` for bulk-edit mode
- `PriceOfferProviders` → wraps `PriceOfferProvider` (holds fetched price offer state + auto-save)
- `ItemsProviders` → wraps `PencilEditProvider`

### State Management
- **Server state**: TanStack Query via `useUniversalGet` / `useUniversalPost` / `useUniversalDelete` in `src/api/`
- **Price offer detail state**: `PriceOfferContext` — holds the full price offer object locally, recalculates totals/VAT on every `setPriceOfferDetails` call, and auto-saves to the backend immediately
- **Edit mode**: `PencilEditContext` — boolean `isEditing` flag and `selectedCards` array for bulk operations

### API Layer (`src/api/`)
All API calls use the endpoint key names from `src/configuration/api_routes/ApiRoutes.jsx`:
- `useUniversalGet(endpoint, id?, refetchOnMount?, params?)` → `[data, isLoading, isFetching, error]`
- `useUniversalPost(endpoint)` → `[sendData, isLoading, error]`
- `useUniversalDelete` — similar pattern

All requests attach `Authorization: Bearer <token>` from localStorage.

### Real-time Features
- **WebSockets**: Laravel Echo + Laravel Reverb (Pusher protocol) configured in `src/lib/echo.js`
- **Push notifications**: Pusher Beams, subscribes to `item-price-update` interest on load
- **Service worker messages**: `useBroadcast(eventName)` listens for SW push events by type

### PDF Generation
`src/components/price_offer_pdf/` uses `@react-pdf/renderer` for generating price offer PDFs with preview (`PdfPreviewer`) and download link (`PdfDownloadLink`).

### UI Stack
- MUI v6 (`@mui/material`, `@mui/icons-material`, `@mui/x-data-grid`)
- styled-components v6 + `@emotion/styled`
- notistack for snackbar notifications (via `SnackBarContext`)
- react-beautiful-dnd for drag-and-drop item reordering
- react-joyride for in-app tutorial (`src/tutorial/tutorial.js`)
