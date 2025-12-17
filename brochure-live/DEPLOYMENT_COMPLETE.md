# ✅ Deployment Complete - Next Steps

## What Was Done

1. ✅ **netlify.toml created and configured**
   - Publish directory: `brochure-live`
   - Routing: `/diagnostics/*` → Render app
   - Security headers configured

2. ✅ **Pushed to GitHub**
   - File: `netlify.toml` (in repo root)
   - Commit: "Add Netlify configuration for brochure deployment with diagnostics routing"
   - Repository: `25Bonged/vehicle_lab-web`

---

## Next Steps in Netlify Dashboard

### 1. Verify Build Settings

Go to: https://app.netlify.com/projects/vehiclelab/configuration/general

**Check:**
- ✅ **Publish directory:** Should be `brochure-live`
- ✅ **Build command:** Should be empty (or blank)
- ✅ **Base directory:** Can be empty

If these are wrong, update them to match `netlify.toml`.

### 2. Trigger Deployment

**Option A: Automatic (if connected to GitHub):**
- Netlify should auto-deploy when it detects the new `netlify.toml`
- Check "Deploys" tab for new deployment

**Option B: Manual:**
- Go to "Deploys" tab
- Click "Trigger deploy" → "Deploy site"
- Or push any commit to trigger deployment

### 3. Verify Deployment

After deployment:
- ✅ Check "Deploys" tab - should show "Published"
- ✅ Visit your Netlify site URL: `https://your-site-name.netlify.app`
- ✅ Should see your brochure homepage

### 4. Test Routing

- ✅ `your-site.netlify.app/` → Brochure
- ✅ `your-site.netlify.app/diagnostics` → Should proxy to Render
- ✅ `your-site.netlify.app/features.html` → Brochure page

### 5. Add Custom Domain (if not already)

- Go to "Domain management"
- Add: `vehiclelab.in`
- Choose "Verify DNS configuration" (not "Use Netlify DNS")
- Netlify will verify your GoDaddy DNS records

---

## Configuration Summary

### netlify.toml Configuration:

```toml
[build]
  publish = "brochure-live"
  command = ""

# Route /diagnostics to Render
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

## Expected Behavior

### ✅ Working:
- `vehiclelab.in/` → Brochure site (Netlify)
- `vehiclelab.in/features.html` → Brochure page
- `vehiclelab.in/diagnostics` → Render app (proxied)
- `vehiclelab.in/diagnostics/*` → Render app (any path)

---

## Troubleshooting

### Deployment not starting?
- Check Netlify is connected to GitHub repo
- Verify `netlify.toml` is in repo root
- Check "Deploys" tab for errors

### Build failing?
- Check build logs in Netlify
- Verify `brochure-live` folder exists in repo
- Check for any build errors

### Routing not working?
- Verify `netlify.toml` is deployed (check in Netlify dashboard)
- Check redirect rules are correct
- Test with Netlify site URL first, then custom domain

---

## Files Reference

- **netlify.toml** - In repo root ✅ (pushed to GitHub)
- **brochure-live/** - Your brochure files ✅ (in repo)
- **GitHub Repo:** https://github.com/25Bonged/vehicle_lab-web ✅

---

## Status

✅ **Ready for deployment!**

Go to Netlify dashboard and verify the settings, then trigger a deployment if needed.

