# Complete SSL Fix - Step by Step

## ✅ Current Status (Verified)

**DNS is correctly configured:**
- ✅ `vehiclelab.in` → Points to Netlify IPs (75.2.60.5, 99.83.190.102, 13.107.42.14)
- ✅ `www.vehiclelab.in` → Points to Netlify subdomain
- ✅ All three A records are set correctly

**Netlify Configuration:**
- ✅ Domain `vehiclelab.in` added
- ✅ Domain `www.vehiclelab.in` added
- ✅ SSL certificate exists (but from Dec 3 - needs renewal)

---

## Action Items (Do These Now)

### Step 1: Renew SSL Certificate in Netlify ⚠️ REQUIRED

**You need to do this in Netlify dashboard:**

1. Go to: https://app.netlify.com/projects/vehiclelab/configuration/domains
2. Scroll to **"HTTPS"** section
3. Click the **"Renew certificate"** button
4. Wait 5-15 minutes for renewal to complete
5. Check that certificate status shows "Active"

**Why:** The certificate from Dec 3 is old and may not match current DNS setup.

---

### Step 2: Verify Nameservers (If Using Netlify DNS)

**If your domain shows "Netlify DNS" in Netlify:**

1. **In Netlify:**
   - Domain management → `vehiclelab.in` → Options
   - Note the nameservers shown (e.g., `dns1.p01.nsone.net`)

2. **In GoDaddy:**
   - Go to: Domain Settings → Nameservers
   - Check if nameservers match Netlify's
   - If different, update to Netlify nameservers
   - Save

**If nameservers are already correct, skip this step.**

---

### Step 3: Clear Browser Cache

**After certificate renewal:**

1. **Clear Chrome cache:**
   - Press `Cmd+Shift+Delete` (Mac) or `Ctrl+Shift+Delete` (Windows)
   - Select "Cached images and files"
   - Time range: "All time"
   - Click "Clear data"

2. **Clear HSTS cache:**
   - Visit: `chrome://net-internals/#hsts`
   - Scroll to "Delete domain security policies"
   - Enter: `vehiclelab.in`
   - Click "Delete"
   - Enter: `www.vehiclelab.in`
   - Click "Delete"

3. **Test in incognito:**
   - Press `Cmd+Shift+N` (Mac) or `Ctrl+Shift+N` (Windows)
   - Visit: `https://vehiclelab.in`
   - Visit: `https://www.vehiclelab.in`

---

## Automated Verification Script

Run this to check DNS after renewal:

```bash
# Check root domain
dig vehiclelab.in +short

# Check www subdomain
dig www.vehiclelab.in +short

# Check SSL certificate
openssl s_client -connect vehiclelab.in:443 -servername vehiclelab.in < /dev/null 2>/dev/null | openssl x509 -noout -dates
```

---

## Expected Results After Fix

✅ **Working URLs:**
- `https://vehiclelab.in` → Brochure site (no SSL error)
- `https://www.vehiclelab.in` → Brochure site (no SSL error)
- `https://vehiclelab.in/diagnostics` → Render app
- `https://www.vehiclelab.in/diagnostics` → Render app

---

## Timeline

1. **Certificate renewal:** 5-15 minutes
2. **DNS propagation (if nameservers changed):** 1-4 hours
3. **Browser cache clear:** Immediate
4. **Total time:** 15 minutes to 4 hours

---

## If Still Not Working After Renewal

1. **Wait 30 minutes** - Certificate renewal can take time
2. **Check certificate in Netlify:**
   - Should show "Active" status
   - Should show both domains: `vehiclelab.in, www.vehiclelab.in`
   - Should show recent "Updated" date

3. **Verify DNS again:**
   ```bash
   dig vehiclelab.in +short
   # Should show: 75.2.60.5, 99.83.190.102, 13.107.42.14
   ```

4. **Contact Netlify support if still failing:**
   - https://www.netlify.com/support/
   - Explain: SSL certificate renewed but still getting ERR_SSL_VERSION_OR_CIPHER_MISMATCH

---

## Quick Checklist

- [ ] Renew SSL certificate in Netlify (click "Renew certificate")
- [ ] Wait 15 minutes for renewal
- [ ] Verify nameservers match (if using Netlify DNS)
- [ ] Clear browser cache and HSTS
- [ ] Test in incognito mode
- [ ] Verify both domains work: `https://vehiclelab.in` and `https://www.vehiclelab.in`

---

## Most Important Step

**Click "Renew certificate" in Netlify dashboard NOW!**

This is the #1 fix for your SSL error. Everything else is secondary.


