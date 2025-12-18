# Migration Guide: vehiclelab.in from Render to Netlify

## Current Setup
- `vehiclelab.in` → Currently points to Render app (root domain)
- Render app is at: `https://vehicle-lab-web-deploy.onrender.com`

## Target Setup
- `vehiclelab.in/` → Brochure site (Netlify)
- `vehiclelab.in/diagnostics/*` → Render app (proxied)

---

## Step-by-Step Migration

### Step 1: Deploy Brochure to Netlify

1. **Add netlify.toml to GitHub:**
   - Go to: https://github.com/25Bonged/vehicle_lab-web
   - Add `netlify.toml` file in repo root
   - Content is already in your local `brochure-live/netlify.toml`

2. **Deploy to Netlify:**
   - Go to: https://app.netlify.com
   - Import repo: `25Bonged/vehicle_lab-web`
   - Publish directory: `brochure-live`
   - Build command: (empty)
   - Deploy

3. **Get your Netlify site URL:**
   - Note your Netlify site name (e.g., `brochure-live-abc123.netlify.app`)

---

### Step 2: Update GoDaddy DNS

**Current DNS:**
- A record: `@` → `216.24.57.1` (points to Render)

**Update to:**

1. **Edit existing A record:**
   - Change `216.24.57.1` → `75.2.60.5`

2. **Add two more A records:**
   - A record: `@` → `99.83.190.102`
   - A record: `@` → `13.107.42.14`

3. **Update www CNAME:**
   - Change from: `vehicle-lab-web-deploy.onrender.com`
   - Change to: `your-netlify-site-name.netlify.app`

4. **Keep all other records** (NS, MX, TXT, etc.)

---

### Step 3: Add Domain to Netlify

1. **In Netlify dashboard:**
   - Go to your site → Domain settings
   - Click "Add custom domain"
   - Enter: `vehiclelab.in`
   - Choose: **"Verify DNS configuration"** (not "Use Netlify DNS")
   - Netlify will verify your A records

2. **Wait for DNS propagation:**
   - Check: https://dnschecker.org
   - Usually takes 1-24 hours (often faster)

---

### Step 4: Configure Render App

Your Render app needs to handle requests coming from `/diagnostics` path.

**Option A: If Render app can handle /diagnostics prefix**

1. **Update Render environment variables:**
   ```
   APP_URL_PREFIX=/diagnostics
   ALLOWED_ORIGINS=https://vehiclelab.in,https://www.vehiclelab.in
   ```

2. **The netlify.toml redirect will:**
   - `vehiclelab.in/diagnostics` → `https://vehicle-lab-web-deploy.onrender.com/`
   - `vehiclelab.in/diagnostics/*` → `https://vehicle-lab-web-deploy.onrender.com/:splat`
   - Render app handles `/diagnostics` prefix internally

**Option B: If Render app is at root (current setup)**

The current netlify.toml redirects to Render root, which should work if your Render app doesn't need the `/diagnostics` prefix.

---

### Step 5: Test the Migration

**Before DNS changes propagate:**
- Test Netlify site: `https://your-site-name.netlify.app`
- Test Render app: `https://vehicle-lab-web-deploy.onrender.com`

**After DNS changes:**
- `https://vehiclelab.in/` → Should show brochure
- `https://vehiclelab.in/diagnostics` → Should show Render app
- `https://vehiclelab.in/diagnostics/*` → Should route to Render app

---

## Important Notes

### DNS Propagation
- DNS changes can take 1-48 hours
- During this time, some users may see old site (Render), others new site (Netlify)
- This is normal and temporary

### Rollback Plan
If something goes wrong:
1. In GoDaddy, change A records back to: `216.24.57.1`
2. Remove other A records
3. Wait for DNS propagation
4. Site will be back on Render

### Testing Strategy
1. **Test Netlify first:**
   - Visit `your-site-name.netlify.app`
   - Verify brochure loads correctly

2. **Test routing:**
   - After DNS propagates, test `vehiclelab.in/diagnostics`
   - Verify it routes to Render app

3. **Monitor both:**
   - Keep Render app running during migration
   - Monitor Netlify logs for errors

---

## Expected Behavior After Migration

✅ **Working:**
- `vehiclelab.in/` → Brochure homepage
- `vehiclelab.in/features.html` → Brochure page
- `vehiclelab.in/diagnostics` → Render app
- `vehiclelab.in/diagnostics/*` → Render app (any path)

❌ **Not working (by design):**
- `vehiclelab.in/` directly showing Render app (moved to /diagnostics)

---

## Troubleshooting

### Brochure not loading?
- Check Netlify deployment status
- Verify DNS A records point to Netlify IPs
- Check Netlify build logs

### /diagnostics not routing to Render?
- Verify netlify.toml redirect rules
- Check Render app is running
- Verify Render ALLOWED_ORIGINS includes vehiclelab.in
- Check browser console for CORS errors

### Both sites showing?
- DNS propagation in progress (wait 24-48 hours)
- Clear browser cache
- Try incognito mode

---

## Timeline Estimate

- **DNS Update:** 5 minutes
- **Netlify Setup:** 10 minutes
- **DNS Propagation:** 1-24 hours (usually 1-4 hours)
- **SSL Certificate:** 1-2 hours after DNS detected
- **Total:** ~2-26 hours (most likely 2-6 hours)




