# Fix: Custom Domain Not Showing Full Page

## Problem
- `https://vehiclelab.in/` is live but not showing the full page
- `https://ubiquitous-babka-221838.netlify.app` shows the complete page correctly

## Root Cause
This is typically caused by:
1. **Browser/CDN caching** - Old cached version being served
2. **Asset loading issues** - CSS/JS/images not loading on custom domain
3. **Deployment cache** - Netlify serving cached build

## Solution Steps

### Step 1: Clear Netlify Cache & Redeploy

1. **Go to Netlify Dashboard:**
   - https://app.netlify.com
   - Select your site

2. **Clear Build Cache:**
   - Go to **Site settings** → **Build & deploy** → **Build settings**
   - Scroll down to **Clear cache and deploy site**
   - Click **Clear cache and deploy site**

3. **Or Trigger Manual Deploy:**
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Clear cache and deploy site**

### Step 2: Verify Assets Are Loading

1. **Open Browser Developer Tools:**
   - Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
   - Go to **Network** tab
   - Reload the page (`Cmd+R` or `Ctrl+R`)

2. **Check for Failed Requests:**
   - Look for any red/failed requests (404, 403, etc.)
   - Check if these files are loading:
     - `style.css`
     - `assets/particles.js`
     - `assets/deployment.js`
     - `assets/icons/ai-powered.svg`
     - `assets/icons/universal.svg`
     - `assets/icons/secure.svg`

3. **Check Console for Errors:**
   - Go to **Console** tab
   - Look for any JavaScript errors or missing file errors

### Step 3: Verify Netlify Configuration

1. **Check Publish Directory:**
   - Go to **Site settings** → **Build & deploy** → **Build settings**
   - **Publish directory** should be: `brochure-live`
   - **Build command** should be: (empty)

2. **Verify netlify.toml is in Repository Root:**
   - The `netlify.toml` file should be in the **repository root**
   - If your repo structure is:
     ```
     repo-root/
       brochure-live/
         index.html
         assets/
         ...
       netlify.toml  ← Should be here
     ```
   - Then `publish = "brochure-live"` is correct

### Step 4: Clear Browser Cache

1. **Hard Refresh:**
   - **Mac:** `Cmd+Shift+R`
   - **Windows/Linux:** `Ctrl+Shift+R` or `Ctrl+F5`

2. **Or Clear Cache Manually:**
   - Open browser settings
   - Clear browsing data
   - Select "Cached images and files"
   - Clear data

3. **Test in Incognito/Private Mode:**
   - Open a new incognito/private window
   - Visit `https://vehiclelab.in/`
   - This bypasses browser cache

### Step 5: Verify DNS & SSL

1. **Check SSL Certificate:**
   - Visit: https://www.ssllabs.com/ssltest/analyze.html?d=vehiclelab.in
   - Ensure SSL is valid and active

2. **Verify DNS:**
   - All three A records should be set:
     - `vehiclelab.in` → `75.2.60.5`
     - `vehiclelab.in` → `99.83.190.102`
     - `vehiclelab.in` → `13.107.42.14`

### Step 6: Compare Working vs Non-Working

1. **Open Both URLs Side-by-Side:**
   - `https://ubiquitous-babka-221838.netlify.app` (working)
   - `https://vehiclelab.in/` (not working)

2. **Compare:**
   - View page source (Right-click → View Page Source)
   - Check if HTML is identical
   - Check Network tab for differences in loaded assets

## Quick Fixes Applied

I've updated your `netlify.toml` with:
- ✅ Better cache control (HTML files: no cache, assets: long cache)
- ✅ Proper MIME types for SVG and PNG files
- ✅ Added `_redirects` file for better asset routing

## After Making Changes

1. **Commit and Push:**
   ```bash
   git add netlify.toml _redirects
   git commit -m "Fix asset loading and caching for custom domain"
   git push
   ```

2. **Wait for Netlify to Deploy:**
   - Check **Deploys** tab in Netlify
   - Wait for deployment to complete (usually 1-2 minutes)

3. **Test Again:**
   - Clear browser cache
   - Visit `https://vehiclelab.in/`
   - Check if full page loads

## Still Not Working?

If the issue persists after these steps:

1. **Check Netlify Logs:**
   - Go to **Deploys** tab
   - Click on the latest deploy
   - Check **Deploy log** for any errors

2. **Verify File Structure:**
   - Ensure all files are in the `brochure-live` folder
   - Check that `assets/` folder contains all icons and images

3. **Contact Support:**
   - Netlify Support: https://www.netlify.com/support/
   - Include:
     - Your site URL
     - Screenshot of the issue
     - Browser console errors (if any)

