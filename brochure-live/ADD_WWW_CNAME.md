# 🔧 Fix: Add Missing www CNAME Record

## Problem
- ✅ A Records: All three Netlify IPs are configured correctly
- ❌ **Missing**: CNAME record for `www.vehiclelab.in`
- **Error**: "DNS verification failed - vehiclelab.in doesn't appear to be served by Netlify"

## Root Cause
Netlify requires **both** the root domain (`vehiclelab.in`) AND the www subdomain (`www.vehiclelab.in`) to be properly configured. The www CNAME is missing.

---

## ✅ Solution: Add www CNAME Record

### Step 1: Find Your Netlify Site Name

**In Netlify Dashboard:**
1. Go to: **Site settings** → **General**
2. Look for: **Site information** → **Site URL**
3. Copy the site name (e.g., `vehiclelab.netlify.app` or `brochure-live-xyz123.netlify.app`)

**OR check your Netlify site:**
- The URL format is: `your-site-name.netlify.app`
- This is what you need for the CNAME value

---

### Step 2: Add CNAME Record in Netlify DNS

**In the DNS settings page you're viewing** (https://app.netlify.com/teams/chayandaschayan/dns/vehiclelab.in):

1. **Scroll to the bottom** of the DNS records table
2. **Click "Add new record"** button
3. **Fill in the form:**
   - **Type**: Select `CNAME`
   - **Name**: Enter `www`
   - **Value**: Enter your Netlify site name (e.g., `vehiclelab.netlify.app`)
     - **Important**: Use your actual Netlify site name, NOT `vehiclelab.in`
   - **TTL**: `600` (or keep default)
4. **Click "Save"** or "Add"

---

### Step 3: Verify the Record

**After adding, you should see:**
- **Name**: `www.vehiclelab.in`
- **Type**: `CNAME`
- **Value**: `your-site-name.netlify.app`

---

### Step 4: Wait and Renew Certificate

1. **Wait 5-10 minutes** for DNS to propagate
2. **Go back to Domain management**
3. **Click "Renew certificate"** again
4. **Should verify successfully now!** ✅

---

## 📋 Example CNAME Record

```
Type: CNAME
Name: www
Value: vehiclelab.netlify.app
TTL: 600
```

**Note**: Replace `vehiclelab.netlify.app` with your actual Netlify site name!

---

## 🔍 How to Find Your Netlify Site Name

**Option 1: From Site Settings**
- Netlify Dashboard → Your Site → Site settings → General
- Look for "Site URL" or "Site name"

**Option 2: From Domain Management**
- Domain management → Look at the Netlify subdomain listed
- Example: `vehiclelab.netlify.app`

**Option 3: Check Your Deployments**
- Any deployment URL shows your site name
- Format: `https://your-site-name.netlify.app`

---

## ✅ After Adding www CNAME

**Your DNS records should have:**
- ✅ 3 A records for `vehiclelab.in` (already done)
- ✅ 1 CNAME for `www.vehiclelab.in` → `your-site-name.netlify.app` (add this)
- ✅ Email records (MX, TXT, SRV) - keep these

**Then:**
- Wait 5-10 minutes
- Renew certificate in Netlify
- Should work! ✅

---

## 🚨 Important Notes

1. **CNAME value must be your Netlify site name** (ending in `.netlify.app`)
2. **NOT** `vehiclelab.in` (that's the root domain)
3. **NOT** `www.vehiclelab.in` (that's what you're creating)
4. **Must be** `your-site-name.netlify.app` (your actual Netlify subdomain)

---

**Next Step**: Add the www CNAME record with your Netlify site name as the value!

