# One Tech Nations — Frontend

TanStack Start (React + Vite + Nitro) marketing site for One Tech Nations.

## Develop

```bash
cp .env.example .env
npm install
npm run dev
```

App runs at http://localhost:8080  
Proxies `/api` and `/admin` to the backend on http://localhost:5000

## Build / production

```bash
npm run build
npm start
```

Starts the Nitro Node server from `.output/server/index.mjs` (default port 3000).

See `/deploy/PRODUCTION.md` for Ubuntu + PM2 + Nginx deployment.
