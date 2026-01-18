# Recnos Portal - Production Deployment Documentation

## Overview

This document describes the production deployment setup for the Recnos Portal application running at `https://portal.recnos.com`.

---

## Infrastructure Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Application | Next.js | 16.0.7 |
| Runtime | Node.js | - |
| Process Manager | PM2 | Latest |
| Web Server | Nginx | - |
| SSL Certificate | Let's Encrypt (Certbot) | - |
| Operating System | Linux | 6.17.0-1005-gcp |

---

## Directory Structure

```
/home/kavipuradal/recnos-portal/
├── .next/                    # Production build output
├── node_modules/             # Dependencies
├── public/                   # Static assets
├── src/                      # Source code
│   ├── app/                  # Next.js app directory
│   └── components/           # React components
├── package.json              # Project configuration
├── next.config.ts            # Next.js configuration
└── tsconfig.json             # TypeScript configuration
```

---

## Setup Procedure

### 1. Install Dependencies

```bash
cd /home/kavipuradal/recnos-portal
npm install
```

### 2. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

### 3. Install PM2 (Process Manager)

```bash
npm install -g pm2
```

### 4. Start the Application

```bash
cd /home/kavipuradal/recnos-portal
pm2 start npm --name "recnos-portal" -- start
```

### 5. Configure PM2 Auto-Start on Boot

```bash
pm2 startup
pm2 save
```

---

## Nginx Configuration

### Configuration File Location

```
/etc/nginx/sites-available/portal.recnos.com
/etc/nginx/sites-enabled/portal.recnos.com (symlink)
```

### Full Nginx Configuration

```nginx
server {
    server_name portal.recnos.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/portal.recnos.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/portal.recnos.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

# HTTP to HTTPS redirect
server {
    if ($host = portal.recnos.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    server_name portal.recnos.com;
    return 404; # managed by Certbot
}
```

### Nginx Configuration Explained

| Directive | Purpose |
|-----------|---------|
| `proxy_pass http://127.0.0.1:3000` | Forward requests to Next.js app |
| `proxy_http_version 1.1` | Use HTTP/1.1 for WebSocket support |
| `proxy_set_header Upgrade` | Enable WebSocket connections |
| `proxy_set_header Host $host` | Preserve original host header |
| `proxy_set_header X-Real-IP` | Pass client's real IP address |
| `proxy_set_header X-Forwarded-For` | Pass proxy chain information |
| `proxy_set_header X-Forwarded-Proto` | Pass original protocol (http/https) |

### Enable Site and Test Configuration

```bash
# Create symlink to enable site
sudo ln -sf /etc/nginx/sites-available/portal.recnos.com /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

---

## SSL/TLS Certificate (Certbot)

### Certificate Details

| Property | Value |
|----------|-------|
| Domain | portal.recnos.com |
| Certificate Path | `/etc/letsencrypt/live/portal.recnos.com/fullchain.pem` |
| Private Key Path | `/etc/letsencrypt/live/portal.recnos.com/privkey.pem` |
| Key Type | ECDSA |
| Expiry Date | 2026-04-18 |
| Auto-Renewal | Enabled |

### SSL Configuration (options-ssl-nginx.conf)

```nginx
# Located at: /etc/letsencrypt/options-ssl-nginx.conf

ssl_session_cache shared:le_nginx_SSL:10m;
ssl_session_timeout 1440m;
ssl_session_tickets off;

ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers off;

ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384";
```

### Install SSL Certificate

```bash
# Install certbot (if not installed)
sudo apt install -y certbot python3-certbot-nginx

# Obtain and install certificate
sudo certbot --nginx -d portal.recnos.com
```

### Certificate Renewal

Certbot automatically renews certificates via a systemd timer. To manually test renewal:

```bash
# Test renewal (dry run)
sudo certbot renew --dry-run

# Force renewal
sudo certbot renew --force-renewal

# Check certificate status
sudo certbot certificates
```

### Renewal Timer Status

```bash
sudo systemctl status certbot.timer
```

---

## PM2 Process Management

### Common Commands

```bash
# Check status
pm2 status

# View logs
pm2 logs recnos-portal

# View logs (last 100 lines)
pm2 logs recnos-portal --lines 100

# Restart application
pm2 restart recnos-portal

# Stop application
pm2 stop recnos-portal

# Delete from PM2
pm2 delete recnos-portal

# Monitor resources
pm2 monit
```

### PM2 Configuration Files

| File | Location |
|------|----------|
| PM2 Home | `/root/.pm2/` |
| Process List | `/root/.pm2/dump.pm2` |
| Logs | `/root/.pm2/logs/` |
| Systemd Service | `/etc/systemd/system/pm2-root.service` |

---

## Useful Commands

### Application Management

```bash
# Rebuild and restart
cd /home/kavipuradal/recnos-portal
npm run build
pm2 restart recnos-portal
```

### Nginx Management

```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Restart nginx
sudo systemctl restart nginx

# View nginx status
sudo systemctl status nginx

# View nginx error logs
sudo tail -f /var/log/nginx/error.log

# View nginx access logs
sudo tail -f /var/log/nginx/access.log
```

### Health Checks

```bash
# Check if app is responding locally
curl -I http://localhost:3000

# Check HTTPS endpoint
curl -I https://portal.recnos.com

# Check PM2 process
pm2 status

# Check nginx status
sudo systemctl status nginx
```

---

## Troubleshooting

### Application Not Responding

1. Check PM2 status: `pm2 status`
2. View application logs: `pm2 logs recnos-portal`
3. Restart application: `pm2 restart recnos-portal`

### 502 Bad Gateway

1. Verify application is running: `pm2 status`
2. Check if port 3000 is listening: `sudo netstat -tlnp | grep 3000`
3. Check nginx error logs: `sudo tail -f /var/log/nginx/error.log`

### SSL Certificate Issues

1. Check certificate status: `sudo certbot certificates`
2. Test renewal: `sudo certbot renew --dry-run`
3. Force renewal: `sudo certbot renew --force-renewal`

### Port Already in Use

```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>
```

---

## Security Considerations

- SSL/TLS is enforced with automatic HTTP to HTTPS redirect
- Modern TLS protocols (TLSv1.2 and TLSv1.3) are enabled
- Strong cipher suites are configured
- Certificate auto-renewal is enabled
- Proxy headers are properly set to prevent IP spoofing

---

## Backup Recommendations

Regularly backup the following:

1. Application code: `/home/kavipuradal/recnos-portal/`
2. Nginx configuration: `/etc/nginx/sites-available/`
3. SSL certificates: `/etc/letsencrypt/` (or rely on certbot to regenerate)
4. PM2 process list: `pm2 save`

---

## Contact

For issues or questions regarding this deployment, contact the system administrator.
