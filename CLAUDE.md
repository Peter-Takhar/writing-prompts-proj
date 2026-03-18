# Writing Prompts Project

## Structure
- `server/` — Express API, entry point `server/index.js`
- `client/` — React app, entry point `client/src/App.js`

## Dev commands
```bash
npm run dev          # start both server and client concurrently
cd server && npm start   # server only (port 5000)
cd client && npm start   # client only (port 3000)
```

## Testing
```bash
cd server && npm test
cd client && npm test -- --watchAll=false
```

## Key conventions
- Server exports `app`, `things`, `places`, `emotions` from `index.js`
- `app.listen` is guarded behind `require.main === module` so tests can import without binding a port
- Client mocks `global.fetch` in tests — no MSW or other network interceptor
