# Caddy Modular Configuration Setup

## Overview
This setup allows each website to manage its own Caddy configuration file, similar to nginx's `sites-available`/`sites-enabled` pattern.

## Directory Structure

```
/etc/caddy/
├── Caddyfile              # Main config with imports
├── sites/                 # Site-specific configs
│   ├── eley.com.pl
│   ├── greyhunter.com.pl
│   └── sarsilmaz.pl
```

## Main Caddyfile Setup

Create `/etc/caddy/Caddyfile`:

```caddy
{
    # Global options
    admin localhost:2019
    persist_config off
}

# Import all site configurations
import /etc/caddy/sites/*
```

## Per-Site Configuration

Each repository carries its own `Caddyfile` which gets deployed to `/etc/caddy/sites/{sitename}`.

## Deployment Process

1. Build the site
2. Deploy static files to webroot
3. Deploy Caddyfile to `/etc/caddy/sites/`
4. Reload Caddy: `sudo systemctl reload caddy`

## Benefits

- **Isolated configs**: Each site manages its own settings
- **Version control**: Caddy config is versioned with the site code
- **Easy updates**: Deploy config changes automatically
- **No conflicts**: Sites don't interfere with each other
- **Easy removal**: Delete the site config file to remove a site

## Manual Setup

1. Create the sites directory:
   ```bash
   sudo mkdir -p /etc/caddy/sites
   sudo chown caddy:caddy /etc/caddy/sites
   ```

2. Update main Caddyfile:
   ```bash
   sudo nano /etc/caddy/Caddyfile
   # Add: import /etc/caddy/sites/*
   ```

3. Test configuration:
   ```bash
   sudo caddy validate --config /etc/caddy/Caddyfile
   ```

4. Reload Caddy:
   ```bash
   sudo systemctl reload caddy
   ```
