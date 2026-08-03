# Recnos Portal - Production Deployment Documentation

## Overview

This document describes the production deployment setup for the Recnos Portal application running at `https://recnos.com` (and `https://www.recnos.com`).

---

## Infrastructure Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Application | Next.js | 16.0.7 |
| Runtime | Node.js | v20.19.4 |
| Process Manager | PM2 | Latest |
| Web Server | Nginx | 1.28.0 (Ubuntu) |
| SSL Certificate | Let's Encrypt (Certbot) | - |
| Server | `root@187.127.138.111` (hostname `srv1536546`) | - |

The server also hosts other unrelated apps (`mrads` on port 3000, plus other `*.recnos.com` sites) — always confirm which PM2 process / port you're touching before restarting anything.

---

## Server Access

```bash
ssh root@187.127.138.111
```

---

## Directory Structure

```
/root/recnos-portal/
├── .next/                    # Production build output
├── node_modules/             # Dependencies
├── public/                   # Static assets (incl. logo.svg)
├── src/
│   ├── app/                  # Next.js app directory (incl. favicon.ico, icon.svg, apple-icon.png)
│   └── components/           # React components
├── package.json
├── next.config.ts
└── tsconfig.json
```

The server directory is a plain `git clone` of `https://github.com/Kavishankarks/recnos-portal.git`, checked out to `main`.

---

## App Port

The app runs on **port 3001** (not the Next.js default 3000 — that port is already used by another app, `mrads`, on this box).

---

## Deploying a Change (standard flow)

From your local machine, after committing and pushing to `main`:

```bash
ssh root@187.127.138.111 "cd /root/recnos-portal && git pull origin main && npm install && npm run build && pm2 restart recnos-portal"
```

Step by step:

```bash
ssh root@187.127.138.111
cd /root/recnos-portal
git pull origin main
npm install          # only needed if package.json changed
npm run build
pm2 restart recnos-portal
```

If you don't have git push access from your current machine/environment, you can `scp` changed files directly into `/root/recnos-portal/...` as a stopgap, but prefer keeping the server as a clean `git pull` checkout — reconcile by committing/pushing from wherever you have credentials, then `git pull` on the server.

---

## Nginx Configuration

### Configuration File Location

```
/etc/nginx/sites-available/recnos.com
/etc/nginx/sites-enabled/recnos.com (symlink)
```

### Full Nginx Configuration

```nginx
# Redirect HTTP → HTTPS
server {
    listen 80;
    server_name recnos.com www.recnos.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name recnos.com www.recnos.com;

    ssl_certificate     /etc/letsencrypt/live/recnos.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/recnos.com/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options    nosniff                                always;
    add_header X-Frame-Options           SAMEORIGIN                             always;
    add_header Referrer-Policy           strict-origin-when-cross-origin        always;

    location / {
        proxy_pass         http://127.0.0.1:3001;
        proxy_http_version 1.1;

        proxy_set_header   Upgrade           $http_upgrade;
        proxy_set_header   Connection        "upgrade";

        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;

        proxy_cache_bypass  $http_upgrade;
    }
}
```

### Enable Site and Test Configuration

```bash
sudo ln -sf /etc/nginx/sites-available/recnos.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## DNS

| Record | Type | Value |
|--------|------|-------|
| `recnos.com` (`@`) | A | `187.127.138.111` (TTL 600) |
| `www.recnos.com` | CNAME/A | resolves to `recnos.com` |

---

## SSL/TLS Certificate (Certbot)

### Certificate Details

| Property | Value |
|----------|-------|
| Domains | `recnos.com`, `www.recnos.com` |
| Certificate Path | `/etc/letsencrypt/live/recnos.com/fullchain.pem` |
| Private Key Path | `/etc/letsencrypt/live/recnos.com/privkey.pem` |
| Expiry Date | 2026-11-01 |
| Auto-Renewal | Enabled via `certbot.timer` |

### Issuing / Reissuing the Certificate

Requires an HTTP (port 80) vhost for the domain to already be live in nginx (certbot's nginx plugin validates over HTTP first):

```bash
sudo certbot certonly --nginx -d recnos.com -d www.recnos.com --non-interactive --agree-tos -m dev@recnos.com
```

### Renewal

```bash
# Test renewal (dry run)
sudo certbot renew --dry-run

# Force renewal
sudo certbot renew --force-renewal

# Check certificate status
sudo certbot certificates

# Check the renewal timer
sudo systemctl status certbot.timer
```

---

## PM2 Process Management

The app is registered as PM2 process **`recnos-portal`**.

### Common Commands

```bash
pm2 status                          # check status of all processes on the box
pm2 logs recnos-portal              # tail logs
pm2 logs recnos-portal --lines 100  # last 100 lines
pm2 restart recnos-portal           # restart after a rebuild
pm2 stop recnos-portal
pm2 start recnos-portal
pm2 delete recnos-portal            # remove from pm2 entirely
pm2 monit                           # live resource monitor
pm2 save                            # persist current process list (survives reboot)
```

### First-time Setup (already done, reference only)

```bash
cd /root/recnos-portal
npm install
npm run build
pm2 start npm --name "recnos-portal" -- start -- -p 3001
pm2 save
pm2 startup   # already enabled (systemd service pm2-root)
```

### PM2 Configuration Files

| File | Location |
|------|----------|
| PM2 Home | `/root/.pm2/` |
| Process List | `/root/.pm2/dump.pm2` |
| Logs | `/root/.pm2/logs/` |
| Systemd Service | `pm2-root.service` (enabled) |

---

## Brand Assets (Logo / Favicon)

| Asset | Path | Purpose |
|-------|------|---------|
| Favicon (legacy, multi-size ICO) | `src/app/favicon.ico` | 16/32/48px, browser tab / bookmarks |
| Favicon (modern, scalable) | `src/app/icon.svg` | Next.js `icon` route, used by modern browsers |
| Apple touch icon | `src/app/apple-icon.png` | 180×180, iOS home screen |
| Wordmark logo | `public/logo.svg` | Used in `Navbar` and `Footer` components |

Design: a geometric "R" node-mark (saffron gradient `#fbb040` → `#e8721f`) on the site's dark hero gradient background (`#050505` → `#0a192f`), matching the `--color-saffron` accent already used throughout `globals.css`.

To regenerate the raster favicon/apple-icon from the SVG source after editing `src/app/icon.svg`:

```bash
node -e "
const sharp = require('sharp');
const fs = require('fs');
async function main() {
  const sizes = [16, 32, 48];
  const pngBuffers = [];
  for (const s of sizes) pngBuffers.push({ size: s, buf: await sharp('src/app/icon.svg').resize(s, s).png().toBuffer() });
  const headerSize = 6, dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * pngBuffers.length;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0,0); header.writeUInt16LE(1,2); header.writeUInt16LE(pngBuffers.length,4);
  const dirEntries = [], imageBuffers = [];
  for (const { size, buf } of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size,0); entry.writeUInt8(size,1); entry.writeUInt16LE(1,4); entry.writeUInt16LE(32,6);
    entry.writeUInt32LE(buf.length,8); entry.writeUInt32LE(offset,12);
    offset += buf.length;
    dirEntries.push(entry); imageBuffers.push(buf);
  }
  fs.writeFileSync('src/app/favicon.ico', Buffer.concat([header, ...dirEntries, ...imageBuffers]));
  await sharp('src/app/icon.svg').resize(180,180).png().toFile('src/app/apple-icon.png');
}
main();
"
```

---

## Health Checks

```bash
# App responding locally on the server
curl -I http://127.0.0.1:3001

# HTTPS endpoint from anywhere
curl -I https://recnos.com
curl -I https://www.recnos.com

# PM2 / nginx status
pm2 status
sudo systemctl status nginx
```

---

## Useful Commands Cheat Sheet

```bash
# --- Deploy ---
ssh root@187.127.138.111 "cd /root/recnos-portal && git pull origin main && npm run build && pm2 restart recnos-portal"

# --- Logs ---
ssh root@187.127.138.111 "pm2 logs recnos-portal --lines 100 --nostream"
ssh root@187.127.138.111 "sudo tail -f /var/log/nginx/error.log"
ssh root@187.127.138.111 "sudo tail -f /var/log/nginx/access.log"

# --- Restart everything ---
ssh root@187.127.138.111 "pm2 restart recnos-portal && sudo systemctl reload nginx"

# --- Nginx edit/reload loop ---
ssh root@187.127.138.111 "sudo nginx -t && sudo systemctl reload nginx"

# --- Certificates ---
ssh root@187.127.138.111 "sudo certbot certificates"
ssh root@187.127.138.111 "sudo certbot renew --dry-run"
```

---

## Troubleshooting

### Application Not Responding

1. Check PM2 status: `pm2 status`
2. View application logs: `pm2 logs recnos-portal`
3. Restart application: `pm2 restart recnos-portal`

### 502 Bad Gateway

1. Verify application is running: `pm2 status`
2. Check if port 3001 is listening: `ss -tlnp | grep 3001`
3. Check nginx error logs: `sudo tail -f /var/log/nginx/error.log`

### SSL Certificate Issues

1. Check certificate status: `sudo certbot certificates`
2. Test renewal: `sudo certbot renew --dry-run`
3. Force renewal: `sudo certbot renew --force-renewal`

### Port Already in Use

```bash
sudo lsof -i :3001
sudo kill -9 <PID>
```

Remember: port 3000 on this box belongs to a different app (`mrads`), not recnos-portal.

---

## Security Considerations

- SSL/TLS is enforced with automatic HTTP → HTTPS redirect
- HSTS, X-Content-Type-Options, X-Frame-Options, and Referrer-Policy headers are set in nginx
- Certificate auto-renewal is enabled via `certbot.timer`
- Proxy headers (`X-Real-IP`, `X-Forwarded-For`, `X-Forwarded-Proto`) are set to preserve client info

---

## Backup Recommendations

Regularly back up:

1. Application code: tracked in git (`https://github.com/Kavishankarks/recnos-portal`)
2. Nginx configuration: `/etc/nginx/sites-available/`
3. SSL certificates: `/etc/letsencrypt/` (or rely on certbot to regenerate)
4. PM2 process list: `pm2 save` (dumped to `/root/.pm2/dump.pm2`)

---

## Contact

For issues or questions regarding this deployment, contact the system administrator (dev@recnos.com).
