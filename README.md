# HSS Mundur — Website

The official website of Higher Secondary School Mundur, Palakkad. Built with
[Next.js](https://nextjs.org) (App Router) and statically exported.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

This produces a fully static site in `out/` (via `output: 'export'` in
`next.config.mjs`) — no Node.js server is required at runtime.

## Deploying (Cloudflare Pages)

- **Framework preset:** Next.js (Static HTML Export)
- **Build command:** `npm run build`
- **Build output directory:** `out`

See the pull request / patch notes for the exact settings to change if you're
migrating an existing Pages project from the old plain-HTML deploy.

## License

MIT — see [LICENSE](./LICENSE).
