# Fix: SSL Error with Netlify DNS

## Current Status (from Netlify Dashboard)

✅ **Domains configured:**
- `vehiclelab.in` - Primary domain (Netlify DNS)
- `www.vehiclelab.in` - Redirects to primary (Netlify DNS)

✅ **SSL Certificate:**
- Active Let's Encrypt certificate
- Covers both domains
- Created: Dec 3 (might be outdated)
- Auto-renews: Mar 3, 2026

---

## The Problem

Even though SSL certificate exists, you're getting SSL errors. This usually means:

1. **Nameservers not pointing to Netlify** - GoDaddy nameservers might still be active
2. **Old certificate** - Certificate from Dec 3 might be for old setup
3. **DNS conflict** - Both Netlify DNS and GoDaddy DNS active

---

## Solution

### Step 1: Renew SSL Certificate

Since the certificate is from Dec 3 (old), renew it:

1. **In Netlify Dashboard:**
   - Go to: Domain management → HTTPS section
   - Click **"Renew certificate"** button
   - Netlify will provision a new certificate matching current settings
   - Wait 5-15 minutes for renewal

### Step 2: Verify Nameservers in GoDaddy

**Since you're using "Netlify DNS", nameservers must point to Netlify:**

1. **Get Netlify nameservers:**
   - In Netlify: Domain management → `vehiclelab.in` → Options
   - Should show nameservers like:
     ```
     dns1.p01.nsone.net
     dns2.p01.nsone.net
     dns3.p01.nsone.net
     dns4.p01.nsone.net
     ```
   - (Exact nameservers may vary - check in Netlify)

2. **Update nameservers in GoDaddy:**
   - Go to GoDaddy → Domain Settings → Nameservers
   - Change from GoDaddy nameservers to Netlify nameservers
   - Replace with the nameservers shown in Netlify
   - Save

3. **Wait for propagation:**
   - DNS propagation: 1-24 hours (usually 1-4 hours)
   - Check: https://dnschecker.org

---

### Step 3: Alternative - Switch to GoDaddy DNS

**If you prefer to keep GoDaddy DNS instead of Netlify DNS:**

1. **In Netlify:**
   - Domain management → `vehiclelab.in` → Options
   - Change from "Netlify DNS" to "Verify DNS configuration"
   - This will use your GoDaddy DNS records

2. **Keep GoDaddy DNS records:**
   - Keep your A records (75.2.60.5, 99.83.190.102, 13.107.42.14)
   - Keep www CNAME pointing to Netlify site
   - Netlify will verify these records

3. **Renew certificate:**
   - After switching, renew SSL certificate
   - Netlify will issue new certificate based on GoDaddy DNS

---

## Recommended Action

### Option A: Use Netlify DNS (Current Setup)

**If you want to keep Netlify DNS:**
1. ✅ Renew SSL certificate (click "Renew certificate")
2. ✅ Update GoDaddy nameservers to Netlify nameservers
3. ✅ Wait for DNS propagation
4. ✅ Test `https://vehiclelab.in` and `https://www.vehiclelab.in`

### Option B: Switch to GoDaddy DNS

**If you want to use GoDaddy DNS:**
1. ✅ Change domain to "Verify DNS configuration" in Netlify
2. ✅ Keep GoDaddy A records (already set correctly)
3. ✅ Renew SSL certificate
4. ✅ Test both domains

---

## Quick Fix Steps

1. **Renew SSL certificate** (most important!)
   - Click "Renew certificate" in Netlify
   - Wait 5-15 minutes

2. **Check nameservers:**
   - If using Netlify DNS → Update GoDaddy nameservers
   - If using GoDaddy DNS → Verify A records are correct

3. **Test after renewal:**
   - Clear browser cache
   - Visit: `https://vehiclelab.in`
   - Visit: `https://www.vehiclelab.in`

---

## Why This Happens

- Certificate from Dec 3 is old (created before current setup)
- Nameservers might not match (GoDaddy vs Netlify)
- DNS conflict between two DNS providers
- Certificate needs renewal to match current configuration

---

## After Fixing

✅ Both domains will work:
- `https://vehiclelab.in` → Brochure
- `https://www.vehiclelab.in` → Brochure (redirects to vehiclelab.in)
- `https://vehiclelab.in/diagnostics` → Render app
- `https://www.vehiclelab.in/diagnostics` → Render app

---

## Next Steps

1. **Click "Renew certificate" in Netlify** (do this first!)
2. **Check if nameservers are correct** (if using Netlify DNS)
3. **Wait 15-30 minutes** for certificate renewal
4. **Test the site** in incognito mode


