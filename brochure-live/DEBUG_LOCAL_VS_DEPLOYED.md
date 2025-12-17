# 🔍 Debug: Local Works, Deployed Doesn't

## Issue
- ✅ `localhost:8000` - Works fully
- ❌ `https://vehiclelab.in/` - Not working properly

## Quick Diagnostic Steps

### Step 1: Check Browser Console on Deployed Site

1. Visit `https://vehiclelab.in/`
2. Open DevTools (F12)
3. Check **Console** tab - you should see:
   ```
   🔍 Environment Diagnostics: {...}
   📊 CSS Loaded: true/false
   📊 Canvas exists: true/false
   📊 All elements present: true/false
   ```
4. Check **Network** tab:
   - Look for any **red/failed requests** (404, 403, etc.)
   - Verify these load with **200 OK**:
     - `style.css`
     - `assets/particles.js`
     - `assets/deployment.js`
     - `assets/icons/*.svg`

### Step 2: Verify Netlify Deployment

1. Go to https://app.netlify.com
2. Select your site
3. Go to **"Deploys"** tab
4. Check latest deployment:
   - Status should be **"Published"** (green)
   - Commit should match: `289e294` or later
   - If status is **"Failed"** or **"Building"**, wait for it to complete

### Step 3: Clear Netlify Cache

1. In Netlify dashboard:
   - Go to **"Deploys"** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**
   - Wait 1-2 minutes for deployment

### Step 4: Clear Browser Cache

1. **Hard Refresh:**
   - Mac: `Cmd + Shift + R`
   - Windows: `Ctrl + Shift + R`

2. **Or Test in Incognito:**
   - Open incognito/private window
   - Visit `https://vehiclelab.in/`
   - This bypasses all cache

### Step 5: Compare File Versions

Check if deployed files match local:

1. **Check deployed CSS:**
   - Visit: `https://vehiclelab.in/style.css`
   - Look for: `min-height: 100vh;` in body styles
   - Should be around line 28

2. **Check deployed JS:**
   - Visit: `https://vehiclelab.in/assets/particles.js`
   - Look for: `width = window.innerWidth || 1920;`
   - Should be around line 78

3. **Check deployed HTML:**
   - Visit: `https://vehiclelab.in/`
   - View page source (Right-click → View Page Source)
   - Look for diagnostic script at the end
   - Should see: `🔍 Environment Diagnostics`

## Common Issues & Fixes

### Issue 1: Netlify Not Deploying Latest Changes

**Symptoms:**
- Deployed site shows old content
- Latest commit not in Netlify

**Fix:**
1. Check Netlify is connected to GitHub
2. Verify branch is `main`
3. Manually trigger deploy: **"Trigger deploy"** → **"Clear cache and deploy site"**

### Issue 2: Browser/CDN Caching

**Symptoms:**
- Changes not visible after deployment
- Old version still showing

**Fix:**
1. Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
2. Test in incognito window
3. Clear browser cache completely

### Issue 3: Asset Path Issues

**Symptoms:**
- CSS/JS not loading (404 errors)
- Images/icons missing

**Fix:**
1. Check Network tab for failed requests
2. Verify asset paths are relative (not absolute)
3. Check `netlify.toml` publish directory is `brochure-live`

### Issue 4: CSS Not Applied

**Symptoms:**
- Page loads but no styling
- Elements present but unstyled

**Fix:**
1. Check Console for CSS loading errors
2. Verify `style.css` loads (Network tab)
3. Check for CORS issues
4. Verify CSS file exists in `brochure-live/` directory

## Verification Checklist

After following steps above:

- [ ] Latest commit deployed on Netlify (`289e294` or later)
- [ ] Browser console shows diagnostic output
- [ ] All assets load (200 OK in Network tab)
- [ ] CSS file contains `min-height: 100vh`
- [ ] Particles.js contains dimension validation
- [ ] Hard refresh shows updated content
- [ ] Incognito window shows correct content

## Next Steps

If issue persists after all steps:

1. **Check Netlify Build Logs:**
   - Go to **"Deploys"** tab
   - Click on latest deploy
   - Check **"Deploy log"** for errors

2. **Verify File Structure:**
   - Ensure `brochure-live/` contains all files
   - Check `netlify.toml` is in repo root
   - Verify publish directory is `brochure-live`

3. **Compare Local vs Deployed:**
   - Run diagnostic script on both
   - Compare console outputs
   - Identify differences

## Diagnostic Script Output

The diagnostic script will log:
- Environment (local vs deployed)
- URL and hostname
- Asset loading status
- Element presence
- Stylesheet and script lists

Use this to identify what's different between local and deployed.

