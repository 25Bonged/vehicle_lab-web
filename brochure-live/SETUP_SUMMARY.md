# Setup Summary: Netlify + Render Configuration

## Your Setup ✅

### 1. Brochure Site (Netlify)
- **Hosted on:** Netlify
- **Location:** `brochure-live` folder
- **URL:** `https://vehiclelab.in/`
- **Pages:** index.html, features.html, casestudy.html, diagai.html, specs.html, contact.html

### 2. Diagnostics App (Render)
- **Hosted on:** Render
- **URL:** `https://vehicle-lab-web-deploy.onrender.com`
- **Routed via Netlify:** `https://vehiclelab.in/diagnostics/*`

---

## How It Works

### Routing Flow:

```
User visits vehiclelab.in/ → Netlify serves brochure ✅
User visits vehiclelab.in/diagnostics → Netlify proxies to Render ✅
User visits vehiclelab.in/diagnostics/* → Netlify proxies to Render ✅
```

### netlify.toml Configuration:

```toml
[build]
  publish = "brochure-live"  # Brochure files location
  command = ""

# Route /diagnostics to Render app
[[redirects]]
  from = "/diagnostics/*"
  to = "https://vehicle-lab-web-deploy.onrender.com/:splat"
  status = 200
  force = true

[[redirects]]
  from = "/diagnostics"
  to = "https://vehicle-lab-web-deploy.onrender.com/"
  status = 200
  force = true
```

---

## What You Need to Do

### ✅ Already Done:
- [x] netlify.toml configured
- [x] DNS A records set (all three: 75.2.60.5, 99.83.190.102, 13.107.42.14)
- [x] www CNAME set to Netlify site

### ⚠️ Still Need:

1. **Add missing A records in Netlify DNS:**
   - Add: `vehiclelab.in` → `99.83.190.102`
   - Add: `vehiclelab.in` → `13.107.42.14`
   - (You already have `75.2.60.5`)

2. **Add netlify.toml to GitHub:**
   - Go to: https://github.com/25Bonged/vehicle_lab-web
   - Add `netlify.toml` file in repo root
   - Copy content from your local `netlify.toml`

3. **Deploy to Netlify:**
   - Import repo: `25Bonged/vehicle_lab-web`
   - Publish directory: `brochure-live`
   - Build command: (empty)

4. **Configure Render (if needed):**
   - Set environment variable: `APP_URL_PREFIX=/diagnostics`
   - Set: `ALLOWED_ORIGINS=https://vehiclelab.in,https://www.vehiclelab.in`

---

## Expected Behavior After Setup

### ✅ Working URLs:

- `https://vehiclelab.in/` → Brochure homepage
- `https://vehiclelab.in/features.html` → Brochure page
- `https://vehiclelab.in/casestudy.html` → Brochure page
- `https://vehiclelab.in/diagnostics` → Render app (your diagnostics tool)
- `https://vehiclelab.in/diagnostics/*` → Render app (any path)

### ❌ Not Working (by design):

- `https://vehiclelab.in/` showing Render app (moved to /diagnostics)

---

## DNS Configuration

### Netlify DNS (if using):
- 3 A records: `vehiclelab.in` → Netlify IPs
- www CNAME: `www` → `your-site.netlify.app`

### GoDaddy DNS (if using):
- 3 A records: `@` → Netlify IPs (already set ✅)
- www CNAME: `www` → `your-site.netlify.app` (already set ✅)

---

## Troubleshooting

### Brochure not loading?
- Check Netlify deployment status
- Verify DNS A records point to Netlify
- Check `netlify.toml` is in repo root

### /diagnostics not routing to Render?
- Verify `netlify.toml` redirect rules
- Check Render app is running
- Verify Render `ALLOWED_ORIGINS` includes `vehiclelab.in`
- Check browser console for CORS errors

### SSL errors?
- Wait for Netlify SSL certificate (1-2 hours after DNS)
- Ensure domain is properly added in Netlify dashboard

---

## Quick Checklist

- [ ] Add missing A records in Netlify DNS (99.83.190.102, 13.107.42.14)
- [ ] Add netlify.toml to GitHub repo
- [ ] Deploy to Netlify
- [ ] Add domain `vehiclelab.in` in Netlify (if not already)
- [ ] Configure Render env vars (APP_URL_PREFIX, ALLOWED_ORIGINS)
- [ ] Test: `vehiclelab.in/` → Brochure
- [ ] Test: `vehiclelab.in/diagnostics` → Render app

---

## Files Reference

- `netlify.toml` - Netlify configuration (needs to be in GitHub repo root)
- `brochure-live/` - Your brochure site files
- Render app - Separate deployment on Render




