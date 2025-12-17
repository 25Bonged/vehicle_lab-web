# Netlify Deployment Guide for vehiclelab.in

## Overview
This guide will help you deploy your brochure site to Netlify and route `/diagnostics/*` to your Render app.

---

## Step 1: Add netlify.toml to GitHub Repo

1. **Go to your GitHub repo:**
   - https://github.com/25Bonged/vehicle_lab-web

2. **Add the netlify.toml file:**
   - Click **"Add file"** → **"Create new file"**
   - Name the file: `netlify.toml`
   - Copy the content from the `netlify.toml` file in your local `brochure-live` folder
   - Or use this content:

```toml
[build]
  publish = "brochure-live"
  command = ""

# Redirect rules for routing diagnostics to Render app
[[redirects]]
  from = "/diagnostics/*"
  to = "https://vehicle-lab-web-deploy.onrender.com/diagnostics/:splat"
  status = 200
  force = true

# Headers for security and performance
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

3. **Commit:**
   - Click **"Commit directly to the main branch"**
   - Add commit message: "Add Netlify configuration"

---

## Step 2: Deploy to Netlify

1. **Go to Netlify:**
   - https://app.netlify.com
   - Sign up/Login (use GitHub authentication)

2. **Import your project:**
   - Click **"Add new site"** → **"Import an existing project"**
   - Select **"GitHub"** as your Git provider
   - Authorize Netlify if prompted
   - Select repository: **`25Bonged/vehicle_lab-web`**

3. **Configure build settings:**
   - **Publish directory:** `brochure-live`
   - **Build command:** (leave empty)
   - Netlify should auto-detect settings from `netlify.toml`

4. **Deploy:**
   - Click **"Deploy site"**
   - Wait for deployment to complete
   - Your site will be available at: `your-site-name.netlify.app`

---

## Step 3: Add Custom Domain & Configure DNS

### In Netlify:

1. **Add custom domain:**
   - Go to your site → **"Domain settings"**
   - Click **"Add custom domain"**
   - Enter: `vehiclelab.in`
   - Click **"Verify"**
   - Netlify will show DNS configuration needed

2. **Get Netlify DNS records:**
   - Netlify will display the DNS records you need
   - Usually shows A records or nameservers

### In GoDaddy:

1. **Remove old Render DNS records:**
   - Delete any A records pointing to Render IPs
   - Keep email records (MX, TXT for SPF/DMARC) if needed

2. **Add Netlify DNS records:**
   
   **Option A: Use Netlify DNS (Recommended)**
   - Copy nameservers from Netlify dashboard
   - In GoDaddy → Domain Settings → Nameservers
   - Replace with Netlify nameservers
   - Example:
     ```
     dns1.p01.nsone.net
     dns2.p01.nsone.net
     dns3.p01.nsone.net
     dns4.p01.nsone.net
     ```
   
   **Option B: Keep GoDaddy DNS (Use A Records)**
   - Add A records (shown in Netlify dashboard):
     ```
     Type: A
     Name: @
     Value: 75.2.60.5
     
     Type: A
     Name: @
     Value: 99.83.190.102
     
     Type: A
     Name: @
     Value: 13.107.42.14
     ```
   - Add CNAME for www:
     ```
     Type: CNAME
     Name: www
     Value: your-site-name.netlify.app
     ```

3. **Wait for DNS propagation:**
   - Can take 24-48 hours (usually faster)
   - Check status: https://dnschecker.org
   - Netlify will show "DNS configuration detected" when ready

4. **SSL Certificate:**
   - Netlify automatically provisions SSL certificates
   - Usually takes a few minutes to hours after DNS is configured
   - You'll see "SSL certificate active" in Netlify dashboard

---

## Step 4: Update Render Environment Variables

1. **Go to Render Dashboard:**
   - https://dashboard.render.com
   - Select your service: `vehicle-lab-web-deploy`

2. **Update Environment Variables:**
   - Go to **"Environment"** tab
   - Add/Update these variables:
   
   ```
   APP_URL_PREFIX=/diagnostics
   ALLOWED_ORIGINS=https://vehiclelab.in,https://www.vehiclelab.in
   ```

3. **Redeploy (if needed):**
   - Render may auto-redeploy when env vars change
   - Or manually trigger a redeploy

---

## Step 5: Verify Everything Works

1. **Test brochure site:**
   - Visit: `https://vehiclelab.in`
   - Should show your brochure homepage

2. **Test diagnostics routing:**
   - Visit: `https://vehiclelab.in/diagnostics`
   - Should redirect to: `https://vehicle-lab-web-deploy.onrender.com/diagnostics`
   - Should show your Render app

3. **Test sub-paths:**
   - Visit: `https://vehiclelab.in/diagnostics/any-path`
   - Should route correctly to Render with the path preserved

---

## Expected Routing Behavior

After setup:
- `vehiclelab.in/` → Brochure site (served by Netlify)
- `vehiclelab.in/diagnostics` → Render app
- `vehiclelab.in/diagnostics/*` → Render app (with path preserved)
- `vehiclelab.in/features.html` → Brochure site
- `vehiclelab.in/casestudy.html` → Brochure site
- All other paths → Brochure site

---

## Troubleshooting

### DNS not working?
- Check DNS propagation: https://dnschecker.org
- Verify records in GoDaddy match Netlify requirements
- Wait up to 48 hours for full propagation

### SSL certificate not issued?
- Ensure DNS is properly configured
- Wait a few hours after DNS is detected
- Check Netlify dashboard for SSL status

### Redirects not working?
- Verify `netlify.toml` is in repo root
- Check Netlify build logs for errors
- Ensure Render app is accessible directly

### Render app not loading?
- Verify Render service is running
- Check `ALLOWED_ORIGINS` includes your domain
- Check Render logs for CORS errors

---

## Files Reference

- `netlify.toml` - Netlify configuration (should be in repo root)
- `brochure-live/` - Your brochure site files (publish directory)

---

## Need Help?

- Netlify Docs: https://docs.netlify.com
- Netlify Support: https://www.netlify.com/support/
- Render Docs: https://render.com/docs


