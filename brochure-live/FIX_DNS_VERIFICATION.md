# 🔧 Fix: DNS Verification Failed in Netlify

## Current Error
- **Error**: "DNS verification failed"
- **Message**: "vehiclelab.in doesn't appear to be served by Netlify"
- **Status**: Netlify can't verify DNS configuration

## Root Cause
Even though nameservers are set to Netlify, the **DNS records** in GoDaddy might not be configured correctly, OR Netlify needs to verify the domain differently.

---

## ✅ Solution: Two Options

### Option 1: Use Netlify DNS (RECOMMENDED - Easiest)

**This is the best option** since nameservers are already set to Netlify.

1. **In Netlify Dashboard:**
   - Go to: Domain management
   - Find `vehiclelab.in`
   - Click **"Options"** (three dots) → **"Use Netlify DNS"**
   - OR click **"DNS setup navigator"** (from the error modal)

2. **Netlify will automatically:**
   - Configure all DNS records
   - Verify the domain
   - Issue SSL certificate

3. **Wait 10-30 minutes** for SSL to be issued

---

### Option 2: Configure DNS Records in GoDaddy (If Option 1 doesn't work)

**If you need to keep "Verify DNS configuration" mode:**

1. **Get Netlify DNS records:**
   - In Netlify: Domain management → DNS setup navigator
   - OR: Site settings → Domain management → DNS
   - Copy the DNS records shown

2. **Add DNS records in GoDaddy:**
   - Go to: GoDaddy → DNS Management
   - **Remove** any existing A records for `vehiclelab.in`
   - **Add A record:**
     - Type: `A`
     - Name: `@` (or leave blank)
     - Value: `75.2.60.5`
     - TTL: `600` (or default)
   - **Add A record:**
     - Type: `A`
     - Name: `@` (or leave blank)
     - Value: `99.83.190.102`
     - TTL: `600`
   - **Add A record:**
     - Type: `A`
     - Name: `@` (or leave blank)
     - Value: `13.107.42.14`
     - TTL: `600`
   - **Add CNAME for www:**
     - Type: `CNAME`
     - Name: `www`
     - Value: `vehiclelab.in`
     - TTL: `600`

3. **Save and wait 10-30 minutes**

4. **In Netlify:**
   - Click "Renew certificate" again
   - Should verify successfully

---

## 🎯 Recommended Action (Do This First)

### Step 1: Use Netlify DNS Setup Navigator

1. **In the error modal you're seeing:**
   - Click **"Go to DNS setup navigator"** (green link)
   - This will guide you through the setup

2. **OR manually:**
   - In Netlify: Domain management
   - Find `vehiclelab.in`
   - Click **"Options"** → **"Use Netlify DNS"**
   - Confirm the change

### Step 2: Wait for Verification

- **DNS propagation**: 10-30 minutes
- **SSL certificate**: 10-30 minutes after DNS verified
- **Total**: Usually 20-60 minutes

### Step 3: Renew Certificate

After DNS is verified:
- Click **"Renew certificate"** in Netlify
- Should work now ✅

---

## 🔍 Verify DNS Records

**Check if DNS records are correct:**

```bash
# Check A records
dig vehiclelab.in A +short
# Should show: 75.2.60.5, 99.83.190.102, 13.107.42.14

# Check CNAME for www
dig www.vehiclelab.in CNAME +short
# Should show: vehiclelab.in
```

---

## ⚠️ Important Notes

1. **Nameservers are correct** ✅ (already set to Netlify)
2. **DNS records might be missing** in GoDaddy
3. **Best solution**: Use "Netlify DNS" mode (Option 1)
4. **Alternative**: Manually add DNS records in GoDaddy (Option 2)

---

## 📋 Quick Checklist

- [ ] Clicked "Go to DNS setup navigator" in Netlify
- [ ] OR clicked "Use Netlify DNS" in domain options
- [ ] Waited 10-30 minutes for DNS verification
- [ ] Clicked "Renew certificate" again
- [ ] SSL certificate issued successfully
- [ ] Tested https://vehiclelab.in (no errors)

---

## 🚀 Next Steps

1. **Click "Go to DNS setup navigator"** in the error modal
2. **Follow Netlify's guided setup**
3. **Wait 20-30 minutes**
4. **Renew certificate**
5. **Test the site**

---

**The DNS setup navigator will guide you through the exact steps needed!**
