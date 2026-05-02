# getwideeye.com

Marketing site for **WideEye** — a hyper-minimal, ultrawide-optimized
native macOS image viewer. The app source repo is private (paid App
Store distribution); this repo is the public face.

Plain static site, served via GitHub Pages with the custom domain `getwideeye.com`.

## Files

- `index.html` — landing page
- `privacy.html` — privacy policy (required for App Store submission)
- `support.html` — support / contact page
- `shortcuts.html` — full keyboard reference
- `styles.css` — single shared stylesheet
- `icon.png` — 1024×1024 app icon (mirror of `Sources/Assets.xcassets/AppIcon.appiconset/icon_512x512@2x.png` in the app repo)
- `CNAME` — custom domain for GitHub Pages

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Pushing to `main` triggers GitHub Pages. Pages settings → Source: `Deploy from
branch` → `main` / `/ (root)`. The `CNAME` file pins the custom domain.

## DNS

For `getwideeye.com`:

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   jaikumarm.github.io
```

For email at `support@getwideeye.com`, set up email forwarding (Cloudflare Email
Routing is free if DNS is on Cloudflare).
