# Fix: www.vehiclelab.in SSL Error

## Problem
`www.vehiclelab.in` shows: `ERR_SSL_VERSION_OR_CIPHER_MISMATCH`

This means:
- `www` subdomain is not configured in Netlify
- Or `www` CNAME is pointing to wrong server
- Or SSL certificate doesn't cover `www` subdomain

---

## Solution

### Step 1: Add www Subdomain in Netlify

1. **Go to Netlify Dashboard:**
   - https://app.netlify.com/projects/vehiclelab/configuration/domains

2. **Add www subdomain:**
   - Click "Add custom domain"
   - Enter: `www.vehiclelab.in`
   - Netlify will automatically link it to your main domain
   - SSL certificate will be issued for both `vehiclelab.in` and `www.vehiclelab.in`

3. **Verify both domains are listed:**
   - Should see: `vehiclelab.in`
   - Should see: `www.vehiclelab.in`
   - Both should show SSL status

---

### Step 2: Check www CNAME in GoDaddy

**Your www CNAME should point to Netlify:**

1. **In GoDaddy DNS:**
   - Check `www` CNAME record
   - Should point to: `your-site-name.netlify.app`
   - **NOT** `vehicle-lab-web-deploy.onrender.com`

2. **If it's pointing to Render:**
   - Edit the `www` CNAME record
   - Change to: `your-netlify-site-name.netlify.app`
   - Save

3. **Verify CNAME:**
   - Current (wrong): `www` → `vehicle-lab-web-deploy.onrender.com`
   - Should be: `www` → `your-site-name.netlify.app`

---

### Step 3: Wait for SSL Certificate

**After adding www in Netlify:**

1. **Netlify will provision SSL for both:**
   - `vehiclelab.in` (root domain)
   - `www.vehiclelab.in` (www subdomain)

2. **Timeline:**
   - Usually 1-2 hours after adding domain
   - Can take up to 24 hours

3. **Check SSL status:**
   - In Netlify domain settings
   - Both domains should show "Active" SSL status

---

### Step 4: Test Both Domains

**After SSL is active:**

- ✅ `https://vehiclelab.in` → Should work
- ✅ `https://www.vehiclelab.in` → Should work
- Both should redirect properly

---

## Quick Fix Checklist

- [ ] Add `www.vehiclelab.in` in Netlify domain settings
- [ ] Verify `www` CNAME in GoDaddy points to Netlify site
- [ ] Wait 1-2 hours for SSL certificate
- [ ] Test both `vehiclelab.in` and `www.vehiclelab.in`

---

## Current vs Correct Configuration

### Current (Wrong):
```
www CNAME → vehicle-lab-web-deploy.onrender.com
```
This points www to Render, which doesn't have SSL for your domain.

### Correct:
```
www CNAME → your-site-name.netlify.app
```
This points www to Netlify, which will provide SSL.

---

## Why This Happens

- `www` subdomain is separate from root domain
- Needs to be added separately in Netlify
- CNAME must point to Netlify, not Render
- Netlify will issue SSL for both automatically

---

## After Fixing

Once configured correctly:
- `vehiclelab.in` → Brochure (Netlify)
- `www.vehiclelab.in` → Brochure (Netlify)
- `vehiclelab.in/diagnostics` → Render app (proxied)
- `www.vehiclelab.in/diagnostics` → Render app (proxied)

Both root and www will work with SSL! ✅

