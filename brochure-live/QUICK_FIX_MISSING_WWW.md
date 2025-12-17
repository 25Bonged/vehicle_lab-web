# 🚨 QUICK FIX: Missing www CNAME Record

## Problem
- ✅ A Records: All three Netlify IPs configured (13.107.42.14, 75.2.60.5, 99.83.190.102)
- ❌ **Missing**: CNAME record for `www.vehiclelab.in`
- **Error**: "DNS verification failed"

## Solution: Add www CNAME

### In Netlify DNS Settings (https://app.netlify.com/teams/chayandaschayan/dns/vehiclelab.in):

1. **Scroll to bottom** of DNS records table
2. **Click "Add new record"**
3. **Fill in:**
   - **Type**: `CNAME`
   - **Name**: `www`
   - **Value**: `your-netlify-site-name.netlify.app`
     - Find this in: Site settings → General → Site URL
   - **TTL**: `600`
4. **Save**

### After Adding:

1. **Wait 5-10 minutes**
2. **Go to Domain management**
3. **Click "Renew certificate"**
4. **Should work!** ✅

---

## How to Find Your Netlify Site Name

**Option 1: Site Settings**
- Netlify Dashboard → Your Site → Site settings → General
- Look for "Site URL"

**Option 2: Domain Management**
- Look at the Netlify subdomain listed
- Example: `vehiclelab.netlify.app`

**Option 3: Check Any Deployment**
- Format: `https://your-site-name.netlify.app`

---

**That's it! Add the www CNAME and renew the certificate.**

