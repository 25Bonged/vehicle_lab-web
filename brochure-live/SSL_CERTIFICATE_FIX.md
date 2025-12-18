# Fix: SSL Certificate Error (ERR_CERT_COMMON_NAME_INVALID)

## Problem
Chrome shows: "Your connection is not private" with error `NET::ERR_CERT_COMMON_NAME_INVALID`

This means:
- SSL certificate doesn't match the domain
- Or Netlify hasn't issued SSL certificate yet
- Or DNS is still pointing to old server

---

## Solutions

### Step 1: Verify Domain in Netlify

1. **Go to Netlify Dashboard:**
   - https://app.netlify.com/projects/vehiclelab/configuration/domains

2. **Check if `vehiclelab.in` is added:**
   - Should see `vehiclelab.in` in the domain list
   - Check SSL status (should show "Provisioning" or "Active")

3. **If domain is NOT added:**
   - Click "Add custom domain"
   - Enter: `vehiclelab.in`
   - Choose "Verify DNS configuration" (not "Use Netlify DNS")
   - Netlify will verify your GoDaddy DNS records

---

### Step 2: Check DNS is Pointing to Netlify

**Verify your DNS records:**

1. **In GoDaddy, check A records:**
   - Should have: `@` → `75.2.60.5`
   - Should have: `@` → `99.83.190.102`
   - Should have: `@` → `13.107.42.14`

2. **Test DNS propagation:**
   - Visit: https://dnschecker.org
   - Enter: `vehiclelab.in`
   - Check A records show Netlify IPs globally

3. **If DNS shows old IP:**
   - Wait 1-24 hours for DNS propagation
   - Or clear DNS cache on your computer

---

### Step 3: Wait for SSL Certificate

**Netlify automatically issues SSL certificates, but it takes time:**

1. **After DNS is verified:**
   - Netlify starts provisioning SSL certificate
   - Usually takes 1-2 hours (can be up to 24 hours)

2. **Check SSL status in Netlify:**
   - Go to: Domain settings
   - Look for SSL certificate status
   - Should show "Provisioning" → "Active"

3. **If stuck on "Provisioning":**
   - Wait a few more hours
   - Check DNS is fully propagated
   - Contact Netlify support if stuck > 24 hours

---

### Step 4: Clear Browser Cache

**The HSTS error might be cached:**

1. **Clear Chrome cache:**
   - Press `Cmd+Shift+Delete` (Mac) or `Ctrl+Shift+Delete` (Windows)
   - Select "Cached images and files"
   - Clear data

2. **Or try incognito mode:**
   - `Cmd+Shift+N` (Mac) or `Ctrl+Shift+N` (Windows)
   - Visit `https://vehiclelab.in`

3. **Or clear HSTS cache:**
   - Visit: `chrome://net-internals/#hsts`
   - Scroll to "Delete domain security policies"
   - Enter: `vehiclelab.in`
   - Click "Delete"

---

### Step 5: Temporary Workaround

**While waiting for SSL certificate:**

1. **Use Netlify subdomain:**
   - Visit: `https://your-site-name.netlify.app`
   - This should work immediately with SSL

2. **Or use HTTP (not recommended):**
   - Visit: `http://vehiclelab.in` (without https)
   - Chrome will warn, but you can proceed
   - **Only for testing!**

---

## Common Causes

### 1. Domain Still on Old Server
- **Symptom:** Certificate shows old server name
- **Fix:** Verify DNS points to Netlify IPs

### 2. DNS Not Fully Propagated
- **Symptom:** Some locations work, others don't
- **Fix:** Wait 24-48 hours for global propagation

### 3. Netlify SSL Not Issued Yet
- **Symptom:** Domain added but SSL still "Provisioning"
- **Fix:** Wait 1-2 hours, check DNS is correct

### 4. Certificate Conflict
- **Symptom:** Multiple certificates for same domain
- **Fix:** Remove domain from old Netlify account/team

---

## Quick Checklist

- [ ] Domain `vehiclelab.in` added in Netlify dashboard
- [ ] DNS A records point to Netlify IPs (all three)
- [ ] DNS propagated globally (check dnschecker.org)
- [ ] SSL certificate status shows "Active" in Netlify
- [ ] Cleared browser cache/HSTS
- [ ] Waited 1-2 hours after DNS verification

---

## Expected Timeline

1. **DNS Update:** 1-24 hours (usually 1-4 hours)
2. **Netlify DNS Verification:** Immediate to 1 hour
3. **SSL Certificate Provisioning:** 1-2 hours after DNS verified
4. **Total:** 2-26 hours (usually 2-6 hours)

---

## If Still Not Working After 24 Hours

1. **Check Netlify logs:**
   - Go to: Site settings → Domain management
   - Check for any error messages

2. **Verify DNS:**
   - Use: https://dnschecker.org
   - All locations should show Netlify IPs

3. **Contact Netlify Support:**
   - https://www.netlify.com/support/
   - Explain: SSL certificate not issuing for vehiclelab.in

---

## Test Your Site

**While waiting, test with Netlify subdomain:**
- `https://your-site-name.netlify.app` → Should work with SSL ✅
- This confirms your site is deployed correctly

**Once SSL is active:**
- `https://vehiclelab.in` → Should work ✅
- `https://www.vehiclelab.in` → Should work ✅




